import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { Bundle, Permission } from 'src/lib/permissions.enum';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull().default(''),
  salt: text('salt').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userPermissions = pgTable('user_permissions', {
  userId: serial('user_id')
    .primaryKey()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  bundles: text('bundles').array().$type<Bundle>().notNull().default([]),
  permissions: text('permissions')
    .array()
    .$type<Permission>()
    .notNull()
    .default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const databaseSchema = {
  users,
  userPermissions,
};
