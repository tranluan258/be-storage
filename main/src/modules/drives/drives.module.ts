import { Module } from '@nestjs/common';
import { DrivesService } from './drives.service';
import { DrivesController } from './drives.controller';
import { DrivesRepository } from './drives.repository';
import { SupabaseModule } from '../../shared/supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SupabaseModule, ConfigModule],
  controllers: [DrivesController],
  providers: [DrivesService, DrivesRepository],
  exports: [DrivesService, DrivesRepository],
})
export class DrivesModule {}
