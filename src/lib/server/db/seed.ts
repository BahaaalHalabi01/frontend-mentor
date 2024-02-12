import { drizzle } from 'drizzle-orm/libsql';
import { comments, users } from './schema';
import { createClient } from '@libsql/client';

const data = {
	currentUser: {
		image: './images/avatars/image-juliusomo.webp',
		username: 'juliusomo'
	},
	comments: [
		{
			id: 1,
			content:
				"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
			createdAt: '1 month ago',
			score: 12,
			user: {
				image: './images/avatars/image-amyrobson.webp',
				username: 'amyrobson'
			},
			replies: []
		},
		{
			id: 2,
			content:
				"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
			createdAt: '2 weeks ago',
			score: 5,
			user: {
				image: './images/avatars/image-maxblagun.webp',
				username: 'maxblagun'
			},
			replies: [
				{
					id: 3,
					content:
						"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
					createdAt: '1 week ago',
					score: 4,
					replyingTo: 'maxblagun',
					user: {
						image: './images/avatars/image-ramsesmiron.webp',
						username: 'ramsesmiron'
					}
				},
				{
					id: 4,
					content:
						"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
					createdAt: '2 days ago',
					score: 2,
					replyingTo: 'ramsesmiron',
					user: {
						image: './images/avatars/image-juliusomo.webp',
						username: 'juliusomo'
					}
				}
			]
		}
	]
};

async function seed() {
	const turso = createClient({
		url: 'http://127.0.0.1:8080'
	});

	const db = drizzle(turso);

	async function seedUsers() {
		const user = { image: data.currentUser.image, username: data.currentUser.username };

		const user_map: Map<string, typeof user> = new Map();

		user_map.set(user.username, user);

		data.comments.forEach((c) => {
			if (c.user) {
				user_map.set(c.user.username, {
					username: c.user.username,
					image: c.user.image
				});
			}
			c.replies.forEach(() => {});
		});

		const users_array = Array.from(user_map.values());

		return await db.insert(users).values(users_array);
	}

	async function seedComments() {
		return db.insert(comments).values(
			data.comments.map((c) => ({
				id: c.id,
				createdAt: c.createdAt,
				content: c.content,
				score: c.score,
				userId: c.user.username,
				replies: c.replies
			}))
		);
	}

	// console.log(seedUsers());
	console.log(await seedComments());
  //
  


	console.debug('success');
}

seed();
