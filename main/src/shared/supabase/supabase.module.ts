import { Global, Module } from '@nestjs/common';
import { StorageSerice } from './storage.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [StorageSerice],
  exports: [StorageSerice],
})
export class SupabaseModule {}
