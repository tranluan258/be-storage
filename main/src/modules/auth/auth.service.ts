import { Injectable } from '@nestjs/common';
import { UsersService } from '../users';
import { User } from '../database/schemas';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findByEmail(email);

    if (!user || user?.password != password) {
      return undefined;
    }

    user.password = null;

    return user;
  }

  async login(user: User): Promise<{
    access_token: string;
  }> {
    const payload = {
      email: user.email,
      full_name: user.fullName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
