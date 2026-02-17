import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { Role } from 'src/lib/types';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull().default(''),
  salt: text('salt').notNull().default(''),
  role: text('role').$type<Role>().notNull().default('user'),
  isBlocked: boolean('is_blocked').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const databaseSchema = {
  users,
};
