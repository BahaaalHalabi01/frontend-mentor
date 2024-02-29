import db from '$src/lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { users as u, comments as c } from '$src/lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { TReply } from './user.svelte';
import { randomInt } from 'crypto';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(c).innerJoin(u, eq(u.username, c.userId));

	return { data };
};

export const actions = {
	default: async ({ request }) => {
		const form_data = await request.formData();

		const comment = form_data.get('comment')?.toString();
		const id = form_data.get('id')?.toString();
		const replyingTo = form_data.get('replyingTo')?.toString();

		if (!comment || !id) return fail(400, { comment, id, replyingTo });

    console.log({comment,id,replyingTo})

		const old_comment = await db.query.comments.findFirst({
			where: eq(c.id, Number(id))
		});

		const replies: TReply[] = [
			{
				id: randomInt(9999),
				replyingTo: replyingTo ?? '',
				score: 0,
				content: comment,
				createdAt: 'now',
				/** hard code for now*/
				user: {
					username: 'juliusomo',
					image: './images/avatars/image-juliusomo.webp'
				}
			}
		];

		if (replyingTo) {
			if (!old_comment) fail(404, { comment, id, replyingTo });

			const old_replies = old_comment?.replies;
			if (old_replies) {
				replies.unshift(...old_replies);
			}
		}

		await db
			.update(c)
			.set({
				replies
			})
			.where(eq(c.id, Number(id)));

		return { success: true };
	}
} satisfies Actions;
