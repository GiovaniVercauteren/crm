import { Injectable } from '@nestjs/common';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAllUsers() {
    return this.drizzleService.db.select().from(databaseSchema.users);
  }

  async createUser(name: string, email: string) {
    const [newUser] = await this.drizzleService.db
      .insert(databaseSchema.users)
      .values({ name, email })
      .returning();
    return newUser;
  }
}
