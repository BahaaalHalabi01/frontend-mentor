<script lang="ts">
	import { createUser } from './user.svelte';

	const { user } = createUser();

	type TProps = {};

	let {} = $props<TProps>();
</script>

<div
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
			class=" inline-flex w-full grow resize-none rounded-lg border border-gray-300 px-4 py-2 placeholder:text-[var(--grayish-blue)] md:w-fit"
			placeholder={'Add a comment...'}
			aria-label={'New Comment'}
			rows="3"
			name="comment"
			maxlength="1000"
			spellcheck="true"
			title={'Add a comment'}
		/>
	</div>
	<input class="hidden" name="commentId" value={''} />
	<button
		class="ml-auto inline-flex max-w-fit basis-auto flex-wrap rounded-md bg-[var(--moderate-blue)] px-6 py-2.5 font-medium uppercase text-white hover:opacity-30"
	>
		{'Send'}
	</button>
</div>
