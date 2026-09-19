"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const students_1 = require("./students");
const courses_1 = require("./courses");
exports.enrollments = (0, pg_core_1.pgTable)('enrollments', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    student_id: (0, pg_core_1.text)('student_id')
        .notNull()
        .references(() => students_1.students.id, {
        onDelete: 'cascade',
    }),
    course_id: (0, pg_core_1.text)('course_id')
        .notNull()
        .references(() => courses_1.courses.id, {
        onDelete: 'restrict',
    }),
    enrolled_on: (0, pg_core_1.date)('enrolled_on', { mode: 'string' }),
    completion_status: (0, pg_core_1.varchar)('completion_status', { length: 50 }),
    grade: (0, pg_core_1.varchar)("grade", { length: 5 }),
    rating: (0, pg_core_1.integer)("rating"),
    fee_paid: (0, pg_core_1.numeric)("fee_paid", { precision: 10, scale: 2 }).notNull(),
});
//# sourceMappingURL=enrollments.js.map