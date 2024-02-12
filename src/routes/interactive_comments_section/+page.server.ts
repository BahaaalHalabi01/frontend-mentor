import db from '$src/lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { users as u, comments as c } from '$src/lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(c).innerJoin(u, eq(u.username, c.userId));

	return { data };
};

export const actions = {
	default: async ({ request }) => {
		console.log(await request.formData());
	}
} satisfies Actions;
