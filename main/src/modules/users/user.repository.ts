import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../database';
import {
  InsertUser,
  NewUser,
  User,
  UserIgnorePassword,
  users,
} from '../database/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getUserInfo(userId: number): Promise<UserIgnorePassword | undefined> {
    return this.drizzleService.db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        password: false,
      },
    });
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

  async createUser(user: InsertUser): Promise<NewUser> {
    const newUsers: NewUser[] = await this.drizzleService.db
      .insert(users)
      .values(user)
      .returning();

    return newUsers[0];
  }
}
