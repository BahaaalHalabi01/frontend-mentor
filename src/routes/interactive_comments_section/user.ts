import { writable } from 'svelte/store';

type TUser = {
	username: string;
	image: {
		png: string;
		webp: string;
	};
};

type TBase = {
	content: string;
	createdAt: string;
	id: number;
	user: TUser;
	score: number;
};

type TComment = TBase;

type TReply = TBase & {
	replyingTo: string;
};

export type { TReply, TComment };


//load a default user
const current_user = writable<TUser>({
	username: 'juliusomo',
	image: {
		png: './images/avatars/image-juliusomo.png',
		webp: './images/avatars/image-juliusomo.webp'
	}
});

export { current_user };
