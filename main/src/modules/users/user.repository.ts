import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../database';
import { User, users } from '../database/schemas';

@Injectable()
export class UserRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getUserInfo(): Promise<User> {
    const res: User[] = await this.drizzleService.db
      .select()
      .from(users)
      .limit(1);

    if (res.length === 0) {
      throw new NotFoundException('Not found users');
    }

    return res[0];
  }
}
