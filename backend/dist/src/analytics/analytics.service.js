"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
let AnalyticsService = class AnalyticsService {
    async getRevenueByCategory(user, requestedRegion) {
        const effectiveRegion = user.role === 'ADMIN' ? requestedRegion : user.region;
        const conditions = [];
        if (effectiveRegion) {
            conditions.push((0, drizzle_orm_1.eq)(schema_1.students.region, effectiveRegion));
        }
        const result = await db_1.db
            .select({
            category: schema_1.courses.category,
            totalRevenue: (0, drizzle_orm_1.sql) `
          COALESCE(
            SUM(${schema_1.enrollments.fee_paid}),
            0
          )
        `,
        })
            .from(schema_1.enrollments)
            .innerJoin(schema_1.courses, (0, drizzle_orm_1.eq)(schema_1.enrollments.course_id, schema_1.courses.id))
            .innerJoin(schema_1.students, (0, drizzle_orm_1.eq)(schema_1.enrollments.student_id, schema_1.students.id))
            .where(conditions.length > 0
            ? (0, drizzle_orm_1.and)(...conditions)
            : undefined)
            .groupBy(schema_1.courses.category)
            .orderBy(schema_1.courses.category);
        return result.map((row) => ({
            category: row.category,
            totalRevenue: Number(row.totalRevenue),
        }));
    }
    async getRevenueOverTime(user, period = '3M', requestedRegion = 'ALL') {
        const effectiveRegion = user.role === 'ADMIN'
            ? requestedRegion
            : user.region;
        const conditions = [];
        if (effectiveRegion && effectiveRegion !== 'ALL') {
            conditions.push((0, drizzle_orm_1.eq)(schema_1.students.region, effectiveRegion));
        }
        const monthsMap = {
            '3M': 3,
            '6M': 6,
            '1Y': 12,
        };
        const months = monthsMap[period];
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - months);
        const startDateString = startDate.toISOString().split('T')[0];
        conditions.push((0, drizzle_orm_1.gte)(schema_1.enrollments.enrolled_on, startDateString));
        const result = await db_1.db
            .select({
            period: (0, drizzle_orm_1.sql) `
          TO_CHAR(
            DATE_TRUNC(
              'month',
              ${schema_1.enrollments.enrolled_on}
            ),
            'YYYY-MM'
          )
        `,
            totalRevenue: (0, drizzle_orm_1.sql) `
          COALESCE(
            SUM(${schema_1.enrollments.fee_paid}),
            0
          )
        `,
        })
            .from(schema_1.enrollments)
            .innerJoin(schema_1.students, (0, drizzle_orm_1.eq)(schema_1.enrollments.student_id, schema_1.students.id))
            .where((0, drizzle_orm_1.and)(...conditions))
            .groupBy((0, drizzle_orm_1.sql) `
          DATE_TRUNC(
            'month',
            ${schema_1.enrollments.enrolled_on}
          )
        `)
            .orderBy((0, drizzle_orm_1.sql) `
          DATE_TRUNC(
            'month',
            ${schema_1.enrollments.enrolled_on}
          )
        `);
        return result.map((row) => ({
            period: row.period,
            totalRevenue: Number(row.totalRevenue),
        }));
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)()
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map