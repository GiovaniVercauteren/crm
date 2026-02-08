import { ConfigService } from '@nestjs/config';
import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

const configService = new ConfigService();

export default defineConfig({
  out: './drizzle',
  schema: './src/database/database-schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: configService.getOrThrow<string>('DB_URL'),
  },
});
