<script lang="ts">
	import { type TComment, createUser, type TReply } from './user.svelte';
	import type { TReplying } from './replying.svelte';
	import type { ActionData } from './$types';
	import Actions from './Actions.svelte';
	import type { ChangeEventHandler } from 'svelte/elements';
	import TextForm from './TextForm.svelte';
	import Button from './Button.svelte';

	type Props = {
		form: ActionData;
		comment: TComment;
		replies: TReply[];
	};
	let { comment, replies, form }: Props = $props();

	let openState = $state<TReplying>({
		replyingTo: '',
		id: ''
	});

	let editing = $state(false);

	const { user } = createUser();

	const handleReply: ChangeEventHandler<HTMLButtonElement> = function (event) {
		const id = event.currentTarget.dataset.id ?? '';
		const replyingTo = event.currentTarget.dataset.replyingto ?? '';

		if (id !== openState.id) {
			openState = {
				id,
				replyingTo
			};
		} else {
			openState = {
				id: '',
				replyingTo: ''
			};
		}
	};

	const handleEdit: ChangeEventHandler<HTMLButtonElement> = function () {
		editing = !editing;
	};

	$effect(() => {
		if (form?.success) {
			openState = {
				replyingTo: '',
				id: ''
			};
		}
	});
</script>

<!-- params can be TReply and TComment, but for ease of writing types in snippets, i put it as TReply-->
{#snippet entry(params:TReply)}
	<div class="flex min-w-full flex-col gap-x-6 rounded-lg bg-white p-4 shadow md:flex-row md:p-6">
		<div class=" order-1 flex items-start justify-between pt-4 md:order-none md:pt-0">
			<div
				class="inline-flex size-fit flex-row items-center gap-y-2 rounded-lg bg-[var(--very-light-gray)] shadow md:flex-col"
			>
				<button class="increment" type="button">
					<svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" class=""
						><path
							d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
						/></svg
					>
				</button>
				<span class="px-1.5 font-semibold text-[var(--moderate-blue)] md:px-0">
					{params.score}
				</span>
				<button class="increment" type="button">
					<svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"
						><path
							d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
						/></svg
					>
				</button>
			</div>
			<div class="md:hidden">
				<Actions
					{handleEdit}
					{handleReply}
					commentId={String(comment.id)}
					username={params.user.username}
					id={String(params.id)}
					replyingTo={params.replyingTo}
					isNested={params.isNested}
				/>
			</div>
		</div>

		<div class="flex grow flex-col gap-y-3">
			<div class="flex items-center gap-x-4">
				<img
					src={`/interactive_comments/${params.user.image}`}
					alt={params.user.username}
					width={30}
				/>
				<span
					class="flex items-end gap-x-2 font-bold text-[var(--grayish-blue)]"
					aria-label="username"
					>{params.user.username}
					{#if user?.username === params.user.username}
						<span
							class="flex h-fit items-center justify-center rounded-sm bg-[var(--moderate-blue)] p-1 text-xs font-semibold leading-none text-white"
							>you</span
						>
					{/if}
				</span>

				<span class="text-[var(--grayish-blue)]" aria-label="created at">{params.createdAt}</span>
				<div class="ml-auto hidden md:block">
					<Actions
						isNested={params.isNested}
						commentId={String(comment.id)}
						{handleEdit}
						{handleReply}
						username={params.user.username}
						id={String(params.id)}
						replyingTo={params.replyingTo}
					/>
				</div>
			</div>
			<p
				aria-label="comment"
				class="pr-3 text-base font-normal leading-snug text-[var(--grayish-blue)] md:leading-loose"
				class:hidden={editing}
			>
				{#if (params as TReply).replyingTo}
					<span class="font-bold text-[var(--moderate-blue)]">
						@{(params as TReply).replyingTo}</span
					>
				{/if}
				{params.content}
			</p>
			<form
				action="?/edit"
				method="post"
				class:hidden={!editing}
				class=" flex grow flex-col items-end gap-y-4"
			>
				<textarea
					class="leading-slug w-full pr-4 text-base font-normal text-[var(--grayish-blue)] md:leading-loose"
					value={params.content}
				/>
				<Button>Update</Button>
			</form>
		</div>
	</div>

	{#if openState.id === String(params.id) && !editing}
		<TextForm
			replyingTo={openState.replyingTo}
			open={openState.id === String(params.id)}
			id={String(comment.id)}
		/>
	{/if}
{/snippet}

<div class="flex flex-col gap-y-2">
	{@render entry(comment)}
	{#if replies.length > 0}
		<div class="flex gap-x-4 pt-4 md:gap-x-8">
			<div class="border-r-2 border-gray-300 md:pl-8"></div>
			<div class="flex w-full flex-col gap-y-4">
				{#each replies as reply ('reply' + reply.id)}
					{@render entry({ ...reply, isNested: true })}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.increment {
		@apply flex size-8 items-center justify-center rounded-lg hover:fill-[var(--moderate-blue)] md:h-7 md:w-8;
		fill: var(--light-grayish-blue);
	}
</style>
