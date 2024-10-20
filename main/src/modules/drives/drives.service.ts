import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDriveDto } from './dto/create-drive.dto';
import { DrivesRepository } from './drives.repository';
import { NewDrive } from '../database/schemas';
import { JwtPayload } from '../auth/types';

@Injectable()
export class DrivesService {
  constructor(private readonly drivesRepository: DrivesRepository) {}

  async create(
    createDriveDto: CreateDriveDto,
    user: JwtPayload,
  ): Promise<NewDrive> {
    const isExixsted = await this.drivesRepository.driveExisted(
      createDriveDto.name,
      user.id,
    );

    if (isExixsted) throw new BadRequestException('Name already existed');

    const drive = await this.drivesRepository.createDrive({
      ...createDriveDto,
      user_id: user.id,
    });

    return drive;
  }
}
