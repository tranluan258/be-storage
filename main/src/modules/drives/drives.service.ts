import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDriveDto } from './dto/create-drive.dto';
import { DrivesRepository } from './drives.repository';
import { Drive, NewDrive } from '../database/schemas';
import { JwtPayload } from '../auth/types';
import { GetDrivesQueryString, UploadFileDto } from './dto';
import { StorageSerice } from '../../shared/supabase/storage.service';

@Injectable()
export class DrivesService {
  constructor(
    private readonly drivesRepository: DrivesRepository,
    private readonly storageService: StorageSerice,
  ) {}

  async create(
    createDriveDto: CreateDriveDto,
    user: JwtPayload,
  ): Promise<NewDrive> {
    {
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

  async upload(
    uploadFileDto: UploadFileDto,
    user: JwtPayload,
    file: Express.Multer.File,
  ): Promise<NewDrive> {
    const isExixsted = await this.drivesRepository.driveExisted(
      file.originalname,
      user.id,
    );

    if (isExixsted) throw new BadRequestException('Name already existed');

    const path = await this.storageService.upload(file);
    const createDriveDto: CreateDriveDto = {
      ...uploadFileDto,
      url: path,
      name: file.originalname,
      type: file.mimetype,
    };

    const drive = await this.drivesRepository.createDrive({
      ...createDriveDto,
      user_id: user.id,
    });
    return drive;
  }

  async getDrives(
    query: GetDrivesQueryString,
    user: JwtPayload,
  ): Promise<Drive[]> {
    if (query.parent_id) {
      return this.drivesRepository.getDrivesByParentId(
        query.parent_id,
        user.id,
      );
    }

    return this.drivesRepository.getDefaultDrives(user.id);
  }
}
