import { Module } from '@nestjs/common';
import { DrivesService } from './drives.service';
import { DrivesController } from './drives.controller';
import { DrivesRepository } from './drives.repository';
import { SupabaseModule } from '../../shared/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [DrivesController],
  providers: [DrivesService, DrivesRepository],
})
export class DrivesModule {}
