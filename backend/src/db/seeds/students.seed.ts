import 'dotenv/config';

import fs from 'fs';
import path from 'path';

import { db } from '../index';
import { students } from '../schema';

async function seedStudents() {
  console.log('Seeding students...');

  const filePath = path.join(
    process.cwd(),
    'data',
    'data.json',
  );

  const data = JSON.parse(
    fs.readFileSync(filePath, 'utf-8'),
  );

  if (data.students?.length) {
    await db
      .insert(students)
      .values(
        data.students.map((student: any) => ({
          id: student.id,
          name: student.name,
          region: student.region.toUpperCase(),
          joined_on: student.joined_on
        })),
      )
      .onConflictDoNothing({
        target: students.id,
      });
  }

  console.log('Students seeded successfully.');
}

seedStudents()
  .catch((error) => {
    console.error('Student seed failed:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });