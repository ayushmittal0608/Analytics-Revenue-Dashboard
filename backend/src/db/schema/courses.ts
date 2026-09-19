import {
  pgTable,
  text,
  varchar,
  integer
} from 'drizzle-orm/pg-core';

export const courses = pgTable('courses', {
  id: text('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }),
  level: varchar('level', { length: 20 }),
  instructor: varchar('instructor', { length: 100 }),
  duration_weeks: integer('duration_weeks'),
});