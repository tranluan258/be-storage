import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../database';
import { NewUser, User, users } from '../database/schemas';
import { eq } from 'drizzle-orm';
import { RegisterDto } from '../auth/dtos';

@Injectable()
export class UserRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getUserInfo(): Promise<User> {
    const user = await this.drizzleService.db.query.users.findFirst();
    if (!user) {
      throw new NotFoundException('Not found users');
    }

    return user;
  }

  async userExisted(email: string): Promise<boolean> {
    const existedUser = await this.drizzleService.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existedUser) return true;

    return false;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.drizzleService.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async createUser(user: RegisterDto): Promise<NewUser> {
    const newUsers: NewUser[] = await this.drizzleService.db
      .insert(users)
      .values(user)
      .returning();

    return newUsers[0];
  }
}
