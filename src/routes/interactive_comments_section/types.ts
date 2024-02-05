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
  score:number
};

type TComment = TBase 

type TReply = TBase & {
	replyingTo: string;
};

export type { TReply ,TComment};
