import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../database';
import { Drive, drives, InsertDrive, NewDrive } from '../database/schemas';
import { and, eq, isNotNull } from 'drizzle-orm';

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

  async getDrivesByParentId(
    parentId: number,
    userId: number,
  ): Promise<Drive[]> {
    const listDrives = await this.drizzleService.db.query.drives.findMany({
      where: and(eq(drives.parent_id, parentId), eq(drives.user_id, userId)),
    });

    return listDrives;
  }

  getDefaultDrives(userId: number): Promise<Drive[]> {
    return this.drizzleService.db.query.drives.findMany({
      where: and(isNotNull(drives.parent_id), eq(drives.user_id, userId)),
    });
  }

  createDefaultDrivesForNewUser(userId: number): Promise<NewDrive> {
    const insertDrive: InsertDrive = {
      name: 'My Drive',
      type: 'folder',
      user_id: userId,
    };

    return this.createDrive(insertDrive);
  }

  getDriveById(id: number, userId: number): Promise<Drive | undefined> {
    return this.drizzleService.db.query.drives.findFirst({
      where: and(eq(drives.user_id, userId), eq(drives.id, id)),
    });
  }
}
