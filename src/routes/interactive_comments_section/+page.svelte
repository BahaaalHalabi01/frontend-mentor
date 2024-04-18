<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import Button from './Button.svelte';
	import CommentCard from './CommentCard.svelte';
	import { createUser } from './user.svelte.ts';

	const { data, form }: { data: PageData; form: ActionData } = $props();

	const { user } = createUser();
</script>

<svelte:head>
	<title>Interactive Comments Section</title>
</svelte:head>

<main>
	<div class="flex w-full max-w-[728px] flex-col gap-y-4">
		{#each data.data as item ('comment' + item.comments.id)}
			<CommentCard
				{form}
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

		<form method="POST" use:enhance action="?/add">
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
						class="inline-flex w-full grow resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none placeholder:text-[var(--grayish-blue)] focus:border-[var(--moderate-blue)] focus:ring-1 active:border-[var(--moderate-blue)] md:w-fit"
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
				<Button>
					{'Send'}
				</Button>
			</div>
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
