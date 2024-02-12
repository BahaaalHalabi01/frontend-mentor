<script lang="ts">
	import { type TComment, createUser, type TReply } from './user.svelte';

	let { comment, replies } = $props<{
		comment: TComment;
		replies: TReply[];
	}>();

	const { user } = createUser();
</script>

{#snippet actions(username:string)}
	{#if user?.username === username}
		<div class="ml-auto flex gap-x-6">
			<button class="btn text-[var(--soft-red)] hover:bg-red-300">
				<img src="/interactive_comments/icon-delete.svg" alt="delete" class="inline-flex pr-1.5" />
				Delete
			</button>
			<button class=" btn text-[var(--moderate-blue)] hover:bg-red-300">
				<img src="/interactive_comments/icon-edit.svg" alt="edit" class="inline-flex pr-1.5" />
				Edit
			</button>
		</div>
	{:else}
		<button class=" btn text-[var(--moderate-blue)] hover:bg-red-300">
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
				<button class="increment">
					<img src="/interactive_comments/icon-plus.svg" alt="+" />
				</button>
				<span class="px-1.5 font-semibold text-[var(--moderate-blue)] md:px-0">
					{params.score}
				</span>
				<button class="increment">
					<img src="/interactive_comments/icon-minus.svg" alt="-" />
				</button>
			</div>
			<div class="md:hidden">
				{@render actions(params.user.username)}
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
				<div class="ml-auto hidden md:block">{@render actions(params.user.username)}</div>
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
{/snippet}

<div>
	{@render entry(comment)}
	{#if replies.length > 0}
		<div class="flex gap-x-4 pt-4 md:gap-x-8">
			<div class="border-r-2 border-gray-300 md:pl-8"></div>
			<div class="flex flex-col gap-y-4">
				{#each replies as reply}
					{@render entry(reply)}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.btn {
		@apply ml-auto flex items-center rounded-md font-semibold;
	}

	.btn > img {
		@apply inline-flex pr-1.5;
	}

	.increment {
		@apply flex size-8 items-center justify-center rounded-lg hover:bg-red-300 md:h-7 md:w-8;
	}
</style>
