import 'dotenv/config';

import * as bcrypt from 'bcrypt';

import { db } from '../index';
import { users } from '../schema';

async function seedUsers() {
  console.log('Seeding users...');

  const adminPassword =
    await bcrypt.hash('admin123', 10);

  const northPassword =
    await bcrypt.hash('north123', 10);

  const southPassword =
    await bcrypt.hash('south123', 10);

  await db
    .insert(users)
    .values([
      {
        email: 'admin@example.com',
        passwordHash: adminPassword,
        role: 'ADMIN',
        region: null,
      },
      {
        email: 'north@example.com',
        passwordHash: northPassword,
        role: 'MANAGER',
        region: 'NORTH',
      },
      {
        email: 'south@example.com',
        passwordHash: southPassword,
        role: 'MANAGER',
        region: 'SOUTH',
      },
    ])
    .onConflictDoNothing({
      target: users.email,
    });

  console.log('Users seeded successfully.');
}

seedUsers()
  .catch((error) => {
    console.error('User seed failed:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });