type TUser = {
	username: string;
	image: string | null;
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

export type { TReply, TComment, TUser };

export function createUser() {
	let user = $state({
		username: 'juliusomo',
		image: './images/avatars/image-juliusomo.webp'
	});

	function setUser(u: typeof user) {
		user = u;
	}

	return {
		get user() {
			return user;
		},
		setUser
	};
}


