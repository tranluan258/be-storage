import { defineConfig } from 'drizzle-kit';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { DatabseConfig } from 'src/modules/app-config';

const configService = new ConfigService({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});
const dbConfig = configService.get<DatabseConfig>('database')!;

export default defineConfig({
  schema: './src/modules/database/schemas/',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    ssl: false,
  },
});
