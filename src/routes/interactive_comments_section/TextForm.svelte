<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './Button.svelte';
	import { createUser } from './user.svelte';

	const { user } = createUser();

	type TProps = {
		id: string;
		open: boolean;
		replyingTo: string;
		editing?: boolean;
	};

	let { replyingTo, open, id, editing }:TProps = $props();

	let input = $state<null | HTMLTextAreaElement>(null);

	$effect(() => {
		if (open) input?.focus();
	});
</script>

<form
	method="POST"
	use:enhance
	action="?/add"
	class="flex min-w-full flex-wrap gap-y-4 rounded-lg bg-white px-2 py-4 shadow md:flex-row md:items-start md:gap-x-4 md:p-6"
>
	<div class="inline-flex grow gap-x-1 md:gap-x-4">
		<img
			src={`/interactive_comments/${user.image}`}
			alt={user.username}
			class="inline-flex h-fit"
			width={40}
		/>

		<textarea
			bind:this={input}
			spellcheck={false}
			class="inline-flex w-full grow resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none placeholder:text-[var(--grayish-blue)] focus:ring-1 md:w-fit"
			placeholder={'Add a comment...'}
			aria-label={'New Comment'}
			rows="3"
			value={`@${replyingTo} `}
			name="comment"
			maxlength="1000"
			title={'Add a comment'}
		/>
	</div>
	<input class="hidden" name="commentId" value={id} />
	<input class="hidden" name="replyingTo" value={replyingTo} />
  <Button>
		{editing ? 'Update' : 'Send'}
	</Button>
</form>
