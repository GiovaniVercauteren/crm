import { Global, Module } from '@nestjs/common';
import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DATABASE_OPTIONS,
} from './database.module-definition';
import { DatabaseOptions } from './database-options';
import { Pool } from 'pg';
import { DrizzleService } from './drizzle.service';

// https://wanago.io/2024/05/20/api-nestjs-drizzle-orm-postgresql/

@Global()
@Module({
  exports: [DrizzleService],
  providers: [
    DrizzleService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          connectionString: databaseOptions.url,
        });
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
