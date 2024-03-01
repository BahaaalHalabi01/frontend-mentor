<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type TComment, createUser, type TReply } from './user.svelte';
	import type { TReplying } from './replying.svelte';
	import { enhance } from '$app/forms';

	let { comment, replies, textInput } = $props<{
		comment: TComment;
		replies: TReply[];
		textInput: Snippet<{ replyingTo?: string; id?: string; commentId?: string }>;
	}>();

	let replying = $state<TReplying>({
		open: false,
		replyingTo: '',
		id: ''
	});


	const { user } = createUser();
	const commentId = comment.id;

	function handleReply(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) {
		const replyingTo = event.currentTarget.dataset.replyingto;
		const id = event.currentTarget.dataset.id;

		if (replyingTo) {
			const open = replyingTo === replying.replyingTo ? !replying.open : true;
			replying = {
				open,
				replyingTo: open ? replyingTo : '',
				id: open ? id : ''
			};
		} else {
			replying.open = replying.open && id !== replying.id ? true : !replying.open;
			replying.id = id;
			replying.replyingTo = '';
		}
	}

	type TActions = {
		username: string;
		replyingTo: string;
		id: number;
	};
	function handleEdit(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) {
		console.log(event.currentTarget.value);
		// editting = ;
	}
</script>

{#snippet actions({ username, replyingTo ,id}:TActions)}
	{#if user?.username === username}
		<div class="ml-auto flex gap-x-6">
			<form method="POST" action="?/delete" use:enhance>
				<button class="btn text-[var(--soft-red)]">
					<img
						src="/interactive_comments/icon-delete.svg"
						alt="delete"
						class="inline-flex pr-1.5"
					/>
					Delete
				</button>
				<input class="hidden" name="id" value={id ?? ''} />
				<input class="hidden" name="replyingTo" value={replyingTo ?? ''} />
			</form>
			<button class=" btn text-[var(--moderate-blue)]" onclick={handleEdit} value={id}>
				<img src="/interactive_comments/icon-edit.svg" alt="edit" class="inline-flex pr-1.5" />
				Edit
			</button>
			<input class="hidden" name="id" value={id ?? ''} />
			<input class="hidden" name="replyingTo" value={replyingTo ?? ''} />
		</div>
	{:else}
		<button
			type="button"
			class=" btn text-[var(--moderate-blue)]"
			onclick={handleReply}
			data-replyingto={replyingTo}
			data-id={id}
		>
			<img src="/interactive_comments/icon-reply.svg" alt="goback" class="" />
			Reply
		</button>
	{/if}
{/snippet}

{#snippet entry(params:TReply | TComment)}
	<div class="flex min-w-full flex-col gap-x-6 rounded-lg bg-white p-4 shadow md:flex-row md:p-6">
		<div class=" order-1 flex items-center justify-between pt-4 md:order-none md:pt-0">
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
				{@render actions({username:params.user.username,replyingTo:(params as TReply).replyingTo,id:params.id})}
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
					{@render actions({username:params.user.username,replyingTo:(params as TReply).replyingTo,id:params.id})}
				</div>
			</div>
			<p
				aria-label="comment"
				class="pr-3 text-base font-normal leading-snug text-[var(--grayish-blue)] md:leading-loose"
			>
				{#if (params as TReply).replyingTo}
					<span class="font-bold text-[var(--moderate-blue)]">
						@{(params as TReply).replyingTo}</span
					>
				{/if}
				{params.content}
			</p>
		</div>
	</div>
	{#if replying.open && replying.id === params.id + ''}
		{@render textInput({
			replyingTo: replying.id ?? '',
			id: params.id + '',
			commentId: commentId + ''
		})}
	{/if}
{/snippet}

<div class="flex flex-col gap-y-2">
	{@render entry(comment)}
	{#if replies.length > 0}
		<div class="flex gap-x-4 pt-4 md:gap-x-8">
			<div class="border-r-2 border-gray-300 md:pl-8"></div>
			<div class="flex w-full flex-col gap-y-4">
				{#each replies as reply}
					{@render entry(reply)}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.btn {
		@apply ml-auto flex items-center rounded-md font-semibold hover:opacity-30;
	}

	.btn > img {
		@apply inline-flex pr-1.5;
	}

	.increment {
		@apply flex size-8 items-center justify-center rounded-lg hover:fill-[var(--moderate-blue)] md:h-7 md:w-8;
		fill: var(--light-grayish-blue);
	}
</style>
