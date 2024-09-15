import { BadRequestException, Injectable } from '@nestjs/common';
import { NewUser, User } from '../database/schemas';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';
import { LoginResponse, RegisterDto } from './dtos';
import { UserRepository } from '../users/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return undefined;
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return undefined;
    }
    user.password = null;

    return user;
  }

  async login(user: JwtPayload): Promise<LoginResponse> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<NewUser> {
    const userExisted = await this.userRepository.userExisted(
      registerDto.email,
    );

    if (userExisted) throw new BadRequestException('Email already existed');

    registerDto.password = await this.hashPassword(registerDto.password);

    const user = await this.userRepository.createUser(registerDto);

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }
}
