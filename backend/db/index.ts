import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export function connectDB(dbUrl: string) {
  const sql = neon(dbUrl); // Neon से इंटरनेट के ज़रिए जुड़ता है
  return drizzle(sql, { schema });
}
