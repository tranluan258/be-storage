import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseConfig } from '../../modules/app-config';

@Injectable()
export class StorageSerice implements OnModuleInit {
  private suppabaseClient: SupabaseClient;
  constructor(private configService: ConfigService) {}

  onModuleInit(): void {
    const supabaseConfig = this.configService.get<SupabaseConfig>('supabase')!;
    this.suppabaseClient = createClient(supabaseConfig.url, supabaseConfig.key);
  }
}
