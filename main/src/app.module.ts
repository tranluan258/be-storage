import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@modules/database';
import { DatabseConfig } from './modules/app-config';
import configuration from './modules/app-config/configuration';
import { UsersModule } from '@modules/users';

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
    UsersModule,
  ],
})
export class AppModule {}