import type { Config } from 'drizzle-kit';
import { loadEnv } from 'vite';

process.env = { ...process.env, ...loadEnv(process.env.NODE_ENV!, process.cwd()) };

export default {
	schema: './src/db/schema.ts',
	out: './drizzle',
	driver: 'turso',
	dbCredentials: {
		url: process.env.VITE_TURSO_DB_URL!,
    authToken:process.env.VITE_TURSO_DB_AUTH_TOKEN
	}
} satisfies Config;
