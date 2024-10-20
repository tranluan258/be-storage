import { Module } from '@nestjs/common';
import { DrivesService } from './drives.service';
import { DrivesController } from './drives.controller';
import { DrivesRepository } from './drives.repository';

@Module({
  controllers: [DrivesController],
  providers: [DrivesService, DrivesRepository],
})
export class DrivesModule {}
