import { createClient } from "@libsql/client/web";
import { drizzle } from 'drizzle-orm/libsql';

import { DB_URL, DB_AUTH_TOKEN } from '$env/static/private';

export const turso = createClient({
  url: DB_URL!,
  authToken: DB_AUTH_TOKEN,
});

const db = drizzle(turso);


export default db

