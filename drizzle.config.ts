import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({path:'./.env.local'});

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'libsql',
	dbCredentials: {
		url: process.env.DB_URL!,
		// authToken: process.env.DB_AUTH_TOKEN
	}
} satisfies Config;
