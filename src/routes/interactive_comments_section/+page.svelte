<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import CommentCard from './CommentCard.svelte';
  import {createUser} from './user.svelte.ts'


	const { data } = $props<{ data: PageData }>();

  const {user} = createUser()

</script>

<svelte:head>
	<title>Interactive Comments Section</title>
</svelte:head>

<main>
	<div class="flex w-full max-w-[728px] flex-col gap-y-4">
		{#each data.data as item}
			<CommentCard
				comment={{
					createdAt: item.comments.createdAt ?? '',
					content: item.comments.content ?? '',
					score: item.comments.score ?? 0,
					user: item.users,
					id: item.comments.id
				}}
				replies={item.comments.replies ?? []}
			/>
		{/each}
		<form
			class="flex min-w-full flex-wrap items-center gap-x-6 gap-y-4 rounded-lg bg-white p-4 shadow md:flex-row md:p-6"
			method="POST"
			use:enhance
		>
			<textarea
				class=" min-w-full resize-none rounded-lg border border-gray-300 px-6 py-2 placeholder:text-[var(--grayish-blue)]"
				placeholder="Add a comment..."
				aria-label="New Comment"
				rows="3"
				maxlength="1000"
				spellcheck="true"
				title="add a comment"
			/>
			<!-- <div class="flex w-full items-center justify-between pt-4"> -->
			<img
				src={`/interactive_comments/${user.image}`}
				alt={user.username}
				class="inline-block h-fit"
				width={30}
				height={30}
			/>
			<button
				class="ml-auto inline-flex max-w-fit rounded-md bg-[var(--moderate-blue)] px-6 py-2.5 font-medium uppercase text-white"
			>
				Send
			</button>
			<!-- </div> -->
		</form>
	</div>
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

	@font-face {
		font-family: Rubik;
		src:
			local('Rubik'),
			url('/fonts/rubik/Rubik-VariableFont_wght.ttf') format('truetype');
		font-weight: 1 1000;
		font-style: normal;
	}
</style>
