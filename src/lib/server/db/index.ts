import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';

import { DB_URL, DB_AUTH_TOKEN } from '$env/static/private';
import * as schema from './schema';

export const turso = createClient({
	url: DB_URL!,
	authToken: DB_AUTH_TOKEN
});

const db = drizzle(turso, {
	schema
});

export default db;
