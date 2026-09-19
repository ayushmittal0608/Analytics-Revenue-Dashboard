import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [
  'ADMIN',
  'MANAGER',
]);

export const regionEnum = pgEnum('region', [
  'NORTH',
  'SOUTH',
  'EAST',
  'WEST'
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull(),
  region: regionEnum('region'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});