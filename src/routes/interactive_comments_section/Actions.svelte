<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { createUser } from './user.svelte';

	type TProps = {
		username?: string;
		commentId?: string;
		isNested?: boolean;
		replyingTo?: string;
		id?: string;
		handleReply?: ChangeEventHandler<HTMLButtonElement>;
		handleEdit?: ChangeEventHandler<HTMLButtonElement>;
	};

	let { replyingTo, id, username, commentId, handleReply, handleEdit, isNested } = $props<TProps>();

	const { user } = createUser();

</script>

{#if user?.username === username}
	<div class="ml-auto flex gap-x-6">
		<form method="POST" action="?/delete" use:enhance>

			<input class="hidden" name="commentId" value={commentId} />
			<input class="hidden" name="replyId" value={isNested ? id : ''} />
			<input class="hidden" name="replyingTo" value={replyingTo ?? username} />

			<button class="btn text-[var(--soft-red)]" type="submit">
				<img src="/interactive_comments/icon-delete.svg" alt="delete" class="inline-flex pr-1.5" />
				Delete
			</button>
		</form>
		<button class=" btn text-[var(--moderate-blue)]" onclick={handleEdit} value={id}>
			<img src="/interactive_comments/icon-edit.svg" alt="edit" class="inline-flex pr-1.5" />
			Edit
		</button>
	</div>
{:else}
	<button
		type="button"
		class=" btn text-[var(--moderate-blue)]"
		onclick={handleReply}
		data-id={id}
		data-replyingto={replyingTo ?? username}
	>
		<img src="/interactive_comments/icon-reply.svg" alt="goback" class="" />
		Reply
	</button>
{/if}

<style>
	.btn {
		@apply ml-auto flex items-center rounded-md font-semibold hover:opacity-30;
	}

	.btn > img {
		@apply inline-flex pr-1.5;
	}
</style>
