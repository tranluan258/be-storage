import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './modules/database';
import { DatabseConfig } from './modules/app-config';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './modules/app-config/configuration';
import { UsersModule } from './modules/users/users.module';
import { SupabaseModule } from './shared/supabase/supabase.module';
import { DrivesModule } from './modules/drives/drives.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabseConfig>('database')!;
        return {
          host: dbConfig.host,
          port: dbConfig.port,
          user: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.name,
        };
      },
    }),
    AuthModule,
    UsersModule,
    SupabaseModule,
    DrivesModule,
  ],
})
export class AppModule {}
