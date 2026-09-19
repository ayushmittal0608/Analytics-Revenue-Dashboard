import { Injectable } from '@nestjs/common';

import { and, eq, sql, gte } from 'drizzle-orm';

import { db } from '../db';

import {
  courses,
  enrollments,
  students,
} from '../db/schema';

import {
  AuthenticatedUser,
} from '../common/types/authenticated-user';

type RevenuePeriod = '3M' | '6M' | '1Y';

@Injectable()
export class AnalyticsService {
  async getRevenueByCategory(
    user: AuthenticatedUser,
    requestedRegion?: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST',
  ) {

    const effectiveRegion = user.role === 'ADMIN' ? requestedRegion : user.region;

    const conditions = [];

    if (effectiveRegion) {
      conditions.push(
        eq(students.region, effectiveRegion),
      );
    }

    const result = await db
      .select({
        category: courses.category,
        totalRevenue: sql<string>`
          COALESCE(
            SUM(${enrollments.fee_paid}),
            0
          )
        `,
      })
      .from(enrollments)
      .innerJoin(
        courses,
        eq(enrollments.course_id, courses.id),
      )
      .innerJoin(
        students,
        eq(enrollments.student_id, students.id),
      )
      .where(
        conditions.length > 0
          ? and(...conditions)
          : undefined,
      )
      .groupBy(courses.category)
      .orderBy(courses.category);

    return result.map((row) => ({
      category: row.category,
      totalRevenue: Number(row.totalRevenue),
    }));
  }
  async getRevenueOverTime(
    user: AuthenticatedUser,
    period: RevenuePeriod = '3M',
    requestedRegion: | 'ALL' | 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' = 'ALL',
  ) {
    const effectiveRegion =
      user.role === 'ADMIN'
        ? requestedRegion
        : user.region;

    const conditions = [];

    if (effectiveRegion && effectiveRegion !== 'ALL') {
      conditions.push(
        eq(students.region, effectiveRegion),
      );
    }

    const monthsMap: Record<RevenuePeriod, number> = {
      '3M': 3,
      '6M': 6,
      '1Y': 12,
    };

    const months = monthsMap[period];

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const startDateString =
      startDate.toISOString().split('T')[0];

    conditions.push(
      gte(
        enrollments.enrolled_on,
        startDateString,
      ),
    );

    const result = await db
      .select({
        period: sql<string>`
          TO_CHAR(
            DATE_TRUNC(
              'month',
              ${enrollments.enrolled_on}
            ),
            'YYYY-MM'
          )
        `,
        totalRevenue: sql<string>`
          COALESCE(
            SUM(${enrollments.fee_paid}),
            0
          )
        `,
      })
      .from(enrollments)
      .innerJoin(
        students,
        eq(enrollments.student_id, students.id),
      )
      .where(and(...conditions))
      .groupBy(
        sql`
          DATE_TRUNC(
            'month',
            ${enrollments.enrolled_on}
          )
        `,
      )
      .orderBy(
        sql`
          DATE_TRUNC(
            'month',
            ${enrollments.enrolled_on}
          )
        `,
      );

    return result.map((row) => ({
      period: row.period,
      totalRevenue: Number(row.totalRevenue),
    }));
  }
}