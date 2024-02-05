import { createClient } from "@libsql/client/web";
import { drizzle } from 'drizzle-orm/libsql';

export const turso = createClient({
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_AUTH_TOKEN,
});

const db = drizzle(turso);


export default db

