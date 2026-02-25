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
  isVerified: boolean('is_verified').notNull().default(false),
  isBlocked: boolean('is_blocked').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
  verifiedAt: timestamp('verified_at'),
});

export const userVerificationTokens = pgTable('user_verification_tokens', {
  id: serial('id').primaryKey(),
  userId: serial('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const databaseSchema = {
  users,
  userVerificationTokens,
};
