import 'dotenv/config';

import fs from 'fs';
import path from 'path';

import { db } from '../index';
import { courses } from '../schema';

async function seedCourses() {
  console.log('Seeding courses...');

  const filePath = path.join(
    process.cwd(),
    'data',
    'data.json',
  );

  const data = JSON.parse(
    fs.readFileSync(filePath, 'utf-8'),
  );

  if (data.courses?.length) {
    await db
      .insert(courses)
      .values(
        data.courses.map((course: any) => ({
          id: course.id,
          title: course.title,
          category: course.category,
          level: course.level,
          instructor: course.instructor,
          duration_weeks: course.duration_weeks
        })),
      )
      .onConflictDoNothing({
        target: courses.id,
      });
  }
  console.log('Courses seeded successfully.');
}

seedCourses()
  .catch((error) => {
    console.error('Course seed failed:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });