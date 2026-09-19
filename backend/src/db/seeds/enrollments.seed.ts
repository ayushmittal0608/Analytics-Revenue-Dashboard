import 'dotenv/config';

import fs from 'fs';
import path from 'path';

import { db } from '../index';
import { enrollments } from '../schema';

async function seedEnrollments() {
  console.log('Seeding enrollments...');

  const filePath = path.join(
    process.cwd(),
    'data',
    'data.json',
  );

  const data = JSON.parse(
    fs.readFileSync(filePath, 'utf-8'),
  );

  const enrollmentRows =
    data.students.flatMap((student: any) =>
      (student.enrollments ?? []).map(
        (enrollment: any) => ({
          student_id: student.id,
          course_id: enrollment.course_id,
          enrolled_on: enrollment.enrolled_on,
          completion_status: enrollment.completion_status,
          grade: enrollment.grade,
          rating: enrollment.rating,
          fee_paid: String(enrollment.fee_paid),
        }),
      ),
    );

  if (enrollmentRows.length) {
    await db
      .insert(enrollments)
      .values(enrollmentRows);
  }

  console.log(
    'Enrollments seeded successfully.',
  );
}

seedEnrollments()
  .catch((error) => {
    console.error(
      'Enrollment seed failed:',
      error,
    );

    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });