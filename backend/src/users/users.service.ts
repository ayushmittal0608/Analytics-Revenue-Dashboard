import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';

@Injectable()
export class UsersService {
  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] ?? null;
  }

  async findById(id: number) {
    const result = await db
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
        region: users.region,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] ?? null;
  }
}