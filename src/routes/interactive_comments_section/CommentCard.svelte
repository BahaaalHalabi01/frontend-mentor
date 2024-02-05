<script lang="ts">
	import { current_user } from './store';
	import type { TReply, TComment } from './types';

	let { comment, replies } = $props<{
		comment: TComment;
		replies: TReply[];
	}>();

	current_user.subscribe((v) => console.log(v));
</script>

{#snippet entry(params:TReply | TComment)}
	<div class="flex min-w-full gap-x-6 rounded-lg bg-white p-6 shadow flex-col md:flex-row">
		<div
			class="flex h-fit flex-col items-center gap-y-2 rounded-lg bg-[var(--very-light-gray)] shadow order-1 md:order-none"
		>
			<button class="increment">
				<img src="/interactive_comments/icon-plus.svg" alt="+" />
			</button>
			<span class="font-semibold text-[var(--moderate-blue)]">
				{params.score}
			</span>
			<button class="increment">
				<img src="/interactive_comments/icon-minus.svg" alt="-" />
			</button>
		</div>


		<div class="flex grow flex-col gap-y-3">
			<div class="flex items-center gap-x-4">
				<img
					src={`/interactive_comments/${params.user.image.webp}`}
					alt={params.user.username}
					width={30}
				/>
				<span
					class="flex items-center gap-x-2 font-bold text-[var(--grayish-blue)]"
					aria-label="username"
					>{params.user.username}
					{#if $current_user?.username === params.user.username}
						<span
							class="flex h-fit items-center justify-center rounded-sm bg-[var(--moderate-blue)] px-1 py-0.5 text-xs font-semibold leading-none text-white"
							>you</span
						>
					{/if}
				</span>

				<span class="text-[var(--grayish-blue)]" aria-label="created at">{params.createdAt}</span>
				{#if $current_user?.username === params.user.username}
					<div class="ml-auto flex gap-x-6">
						<button class="ml-auto rounded-md font-bold text-[var(--soft-red)] hover:bg-red-300">
							<img
								src="/interactive_comments/icon-delete.svg"
								alt="delete"
								class="inline-flex pr-1"
							/>
							Delete
						</button>
						<button
							class="ml-auto rounded-md font-bold text-[var(--moderate-blue)] hover:bg-red-300"
						>
							<img src="/interactive_comments/icon-edit.svg" alt="edit" class="inline-flex pr-1" />
							Edit
						</button>
					</div>
				{:else}
					<button class="ml-auto rounded-md font-bold text-[var(--moderate-blue)] hover:bg-red-300">
						<img src="/interactive_comments/icon-reply.svg" alt="goback" class="inline-flex pr-1" />
						Reply
					</button>
				{/if}
			</div>
			<p aria-label="comment" class="pr-3 text-base font-normal text-[var(--grayish-blue)]">
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

<section>
	{@render entry(comment)}
	{#if replies.length > 0}
		<div class="flex gap-x-8 pt-4">
			<div class="border-r-2 border-[var(--grayish-blue)] pl-8"></div>
			<div class="flex flex-col gap-y-4">
				{#each replies as reply}
					{@render entry(reply)}
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
	.increment {
		@apply flex h-7 w-8 items-center justify-center rounded-lg hover:bg-red-300;
	}
</style>
