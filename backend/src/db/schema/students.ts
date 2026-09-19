import {
  pgTable,
  date,
  varchar,
  text
} from 'drizzle-orm/pg-core';
import { regionEnum } from './users';

export const students = pgTable('students', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  region: regionEnum('region').notNull(),
  joined_on: date('joined_on', { mode: 'string' }),
});