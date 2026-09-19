"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courses = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.courses = (0, pg_core_1.pgTable)('courses', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    category: (0, pg_core_1.varchar)('category', { length: 50 }),
    level: (0, pg_core_1.varchar)('level', { length: 20 }),
    instructor: (0, pg_core_1.varchar)('instructor', { length: 100 }),
    duration_weeks: (0, pg_core_1.integer)('duration_weeks'),
});
//# sourceMappingURL=courses.js.map