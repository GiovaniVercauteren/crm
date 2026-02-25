import { HttpException, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { databaseSchema, users } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { generateSalt, hashPassword } from 'src/lib/password.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = typeof databaseSchema.users.$inferSelect;

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAllUsers(): Promise<User[]> {
    return this.drizzleService.db.select().from(databaseSchema.users);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(data.email);
    if (existingUser) {
      throw new HttpException('Email already in use', 400);
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const [newUser] = await this.drizzleService.db
      .insert(databaseSchema.users)
      .values({ ...data, password: hashedPassword, salt })
      .returning();
    return newUser;
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    const [updatedUser] = await this.drizzleService.db
      .update(databaseSchema.users)
      .set(data)
      .where(eq(databaseSchema.users.id, id))
      .returning();
    return updatedUser;
  }

  async findOneById(id: number): Promise<User | undefined> {
    const user = await this.drizzleService.db
      .select()
      .from(databaseSchema.users)
      .where(eq(databaseSchema.users.id, id))
      .limit(1)
      .then((rows) => rows.at(0));
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.drizzleService.db
      .select()
      .from(databaseSchema.users)
      .where(eq(databaseSchema.users.email, email))
      .limit(1)
      .then((rows) => rows.at(0));
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await this.drizzleService.db
      .delete(databaseSchema.users)
      .where(eq(databaseSchema.users.id, id));
  }

  async markUserEmailAsVerified(id: number, email: string): Promise<boolean> {
    const updatedUserId: { updatedId: number }[] = await this.drizzleService.db
      .update(databaseSchema.users)
      .set({ isVerified: true })
      .where(
        and(
          eq(databaseSchema.users.id, id),
          eq(databaseSchema.users.email, email),
        ),
      )
      .returning({ updatedId: users.id });

    // If no rows were updated, it means the user was not found or email did not match
    return updatedUserId.length === 1;
  }
}
