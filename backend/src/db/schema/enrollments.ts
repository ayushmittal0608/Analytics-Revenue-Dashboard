import {
  serial,
  varchar,
  integer,
  date,
  text,
  pgTable,
  numeric
} from 'drizzle-orm/pg-core';

import { students } from './students';
import { courses } from './courses';

export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  student_id: text('student_id')
    .notNull()
    .references(() => students.id, {
      onDelete: 'cascade',
    }),
  course_id: text('course_id')
    .notNull()
    .references(() => courses.id, {
      onDelete: 'restrict',
    }),
  enrolled_on: date('enrolled_on', { mode: 'string' }),
  completion_status: varchar('completion_status', { length: 50 }),
  grade: varchar("grade", { length: 5 }),
  rating: integer("rating"),
  fee_paid: numeric("fee_paid", { precision: 10, scale: 2 }).notNull(),
});