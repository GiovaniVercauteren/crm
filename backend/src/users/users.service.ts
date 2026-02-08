import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { CreateUserDto } from './CreateUserDto';
import { generateSalt, hashPassword } from 'src/util/password.util';

type User = typeof databaseSchema.users.$inferSelect;

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAllUsers(): Promise<User[]> {
    return this.drizzleService.db.select().from(databaseSchema.users);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const { name, email, password } = dto;

    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const [newUser] = await this.drizzleService.db
      .insert(databaseSchema.users)
      .values({ name, email, password: hashedPassword, salt })
      .returning();
    return newUser;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.drizzleService.db
      .select()
      .from(databaseSchema.users)
      .where(eq(databaseSchema.users.email, email))
      .limit(1)
      .then((rows) => rows[0]);
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await this.drizzleService.db
      .delete(databaseSchema.users)
      .where(eq(databaseSchema.users.id, id));
  }
}
