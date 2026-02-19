import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

export default defineConfig({
  out: './drizzle',
  schema: './src/database/database-schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL || `NO URL PROVIDED IN ${envFile}`,
  },
});
