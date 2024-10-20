import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../database';
import { drives, InsertDrive, NewDrive } from '../database/schemas';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class DrivesRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async driveExisted(name: string, userId: number): Promise<boolean> {
    const existedDrive = await this.drizzleService.db.query.drives.findFirst({
      where: and(eq(drives.name, name), eq(drives.user_id, userId)),
    });

    if (existedDrive) return true;

    return false;
  }

  async createDrive(drive: InsertDrive): Promise<NewDrive> {
    const newDrive: NewDrive[] = await this.drizzleService.db
      .insert(drives)
      .values(drive)
      .returning();

    return newDrive[0];
  }
}
