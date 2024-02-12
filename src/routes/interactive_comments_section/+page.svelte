<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import CommentCard from './CommentCard.svelte';
	import { createUser } from './user.svelte.ts';
	import { item_id } from './replying.svelte';

	const { data } = $props<{ data: PageData }>();

	const { user } = createUser();

	type TTextInput = {
		replying?: boolean;
		id?: string;
	};

  $inspect(item_id)
</script>

<svelte:head>
	<title>Interactive Comments Section</title>
</svelte:head>

{#snippet textInput(input:TTextInput)}
	<div
		class="flex min-w-full flex-wrap gap-y-4 rounded-lg bg-white p-4 shadow md:flex-row md:items-start md:gap-x-4 md:p-6"
	>
		<img
			src={`/interactive_comments/${user.image}`}
			alt={user.username}
			class="inline-flex h-fit"
			width={40}
		/>
		{#if input.id === item_id}
			<input class="hidden" name="id" value={input.id} />
			<input class="hidden" name="replyingTo" value={input.replying} />
		{/if}

		<textarea
			class=" inline-flex grow resize-none rounded-lg border border-gray-300 px-6 py-2 placeholder:text-[var(--grayish-blue)]"
			placeholder={input ? 'Add a reply...' : 'Add a comment...'}
			aria-label={input ? 'New Reply' : 'New Comment'}
			rows="3"
			name="comment"
			maxlength="1000"
			spellcheck="true"
			title={input ? 'add a reply' : 'add a comment'}
		/>

		<button
			class="ml-auto inline-flex max-w-fit rounded-md bg-[var(--moderate-blue)] px-6 py-2.5 font-medium uppercase text-white hover:opacity-30"
		>
			{input ? 'Reply' : 'Send'}
		</button>
	</div>
{/snippet}

<main>
	<form class="flex w-full max-w-[728px] flex-col gap-y-4" method="POST" use:enhance>
		{#each data.data as item}
			<CommentCard
				comment={{
					createdAt: item.comments.createdAt ?? '',
					content: item.comments.content ?? '',
					score: item.comments.score ?? 0,
					user: item.users,
					id: item.comments.id
				}}
				{textInput}
				replies={item.comments.replies ?? []}
			/>
		{/each}

		{@render textInput({ replying: false, })}
	</form>
</main>

<style>
	* {
		--dark-blue: hsl(212, 24%, 26%);
		--grayish-blue: hsl(211, 10%, 45%);
		--light-gray: hsl(223, 19%, 93%);
		--very-light-gray: hsl(228, 33%, 97%);
		--white: hsl(0, 0%, 100%);

		--moderate-blue: hsl(238, 40%, 52%);
		--soft-red: hsl(358, 79%, 66%);
		--light-grayish-blue: hsl(239, 57%, 85%);
		--pale-red: hsl(357, 100%, 86%);
	}

	main {
		font-family: 'Rubik', sans-serif;
		background-color: var(--light-gray);
		@apply flex min-h-full flex-col items-center px-4 py-8 md:px-8 md:py-20;
	}

	textarea {
		@apply outline-none focus:border-[var(--moderate-blue)] active:border-[var(--moderate-blue)];
	}

	@font-face {
		font-family: Rubik;
		src:
			local('Rubik'),
			url('/fonts/rubik/Rubik-VariableFont_wght.ttf') format('truetype');
		font-weight: 1 1000;
		font-style: normal;
	}
</style>
