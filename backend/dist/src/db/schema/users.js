"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.regionEnum = exports.userRoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userRoleEnum = (0, pg_core_1.pgEnum)('user_role', [
    'ADMIN',
    'MANAGER',
]);
exports.regionEnum = (0, pg_core_1.pgEnum)('region', [
    'NORTH',
    'SOUTH',
    'EAST',
    'WEST'
]);
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    passwordHash: (0, pg_core_1.varchar)('password_hash', { length: 255 }).notNull(),
    role: (0, exports.userRoleEnum)('role').notNull(),
    region: (0, exports.regionEnum)('region'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
//# sourceMappingURL=users.js.map