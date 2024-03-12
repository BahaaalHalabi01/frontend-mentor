import db from '$src/lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { users as u, comments as c } from '$src/lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { TReply } from './user.svelte';
import { randomInt } from 'crypto';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(c).innerJoin(u, eq(u.username, c.userId));

	return { data };
};

export const actions = {
	delete: async ({ request }) => {
		const form_data = await request.formData();
		const commentId = form_data.get('commentId');
		const replyId = form_data.get('replyId');

		if (!commentId) fail(400);

		if (!replyId) {
			await db.delete(c).where(and(eq(c.id, Number(commentId)), eq(c.userId, 'juliusomo')));
		} else {
			const old_comment = await db.query.comments.findFirst({
				where: eq(c.id, Number(commentId))
			});

			const replies = old_comment?.replies?.filter((r) => r.id !== Number(replyId)) ?? [];

			await db
				.update(c)
				.set({
					replies
				})
				.where(eq(c.id, Number(commentId)));
		}

		return { deleted: true };
	},
	add: async ({ request }) => {
		const form_data = await request.formData();

		const comment = form_data.get('comment')?.toString();
		const commentId = form_data.get('commentId')?.toString();
		const replyingTo = form_data.get('replyingTo')?.toString();

		if (!comment) return fail(400, { comment, commentId });

		if (!commentId) {
			await db.insert(c).values({
				replies: [],
				id: randomInt(9999),
				score: 0,
				userId: 'juliusomo',
				content: comment,
				createdAt: 'now'
			});

			return { success: true };
		}

		const old_comment = await db.query.comments.findFirst({
			where: eq(c.id, Number(commentId))
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

		const old_replies = old_comment?.replies ?? [];
		if (old_replies) {
			replies.unshift(...old_replies);
		}

		await db
			.update(c)
			.set({
				replies
			})
			.where(eq(c.id, Number(commentId)));

		return { success: true };
	}
} satisfies Actions;
