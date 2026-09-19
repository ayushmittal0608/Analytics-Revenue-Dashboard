"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.students = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
exports.students = (0, pg_core_1.pgTable)('students', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    region: (0, users_1.regionEnum)('region').notNull(),
    joined_on: (0, pg_core_1.date)('joined_on', { mode: 'string' }),
});
//# sourceMappingURL=students.js.map