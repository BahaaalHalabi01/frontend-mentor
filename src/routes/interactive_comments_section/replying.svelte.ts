export type TReplying = {
	open: boolean;
	replyingTo?: string;
	id?: string;
};

function createId() {
	let id = $state('');

	function setId(s: string) {
		id = s;
	}

	return {
		get id() {
			return id;
		},
		setId
	};
}

export const { id: item_id, setId } = createId();
