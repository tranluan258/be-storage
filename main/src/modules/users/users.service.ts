import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { NewUser } from '../database/schemas';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<NewUser> {
    if (await this.userRepository.userExisted(createUserDto.email))
      throw new BadRequestException('User alreadt existed');

    const user = await this.userRepository.createUser(createUserDto);

    return user;
  }
}
