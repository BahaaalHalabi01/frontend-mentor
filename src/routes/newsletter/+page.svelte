<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();

	function reset() {
		window.location.reload();
	}
</script>

<svelte:head>
  <title>Newsletter in Svelte</title>
</svelte:head>
<main>
	<div
		class="mx-auto flex max-w-full grow flex-col justify-center gap-y-8 bg-white pb-8 md:min-h-fit md:max-w-fit md:grow-0 md:flex-row md:rounded-[32px] md:p-6"
	>
		{#if !form?.success}
			<section
				class=" order-last flex flex-col items-start justify-center gap-y-4 px-6 md:order-first md:pl-10 md:pr-16"
			>
				<h1>Stay updated!</h1>
				<h2 class="max-w-[376px]">Join 60,000+ product managers receiving monthly updates on:</h2>
				<ol class="px-6 md:pr-0">
					<li><span>Product discovery and building what matters</span></li>
					<li><span>Measuring to ensure updates are a success</span></li>
					<li><span>And much more!</span></li>
				</ol>
				<form class="flex min-w-full flex-col gap-y-6" use:enhance target="_self" method="POST">
					<label class="min-w-full">
						<div class="flex justify-between pb-2 text-xs font-bold">
							<span class="block">Email address</span>
							{#if form?.error && form?.error?.length > 0}
								<span class="error">{form.error}</span>
							{/if}
						</div>
						<input
							aria-errormessage={!form?.success ? form?.error : undefined}
							aria-invalid={form?.success}
							autocomplete="email"
							name="email"
							type="text"
							class:error={form?.success === false}
							placeholder={'email@company.com'}
						/>
					</label>
					<button class="mt-auto flex h-14 w-full items-center justify-center rounded-md">
						Subscribe to monthly newsletter
					</button>
				</form>
			</section>
			<picture>
				<source
					srcset="/newsletter/illustration-sign-up-desktop.svg"
					media="(min-width: 768px)"
					class="max-h-96"
				/>
				<img
					alt="newsletter"
					src="/newsletter/illustration-sign-up-mobile.svg"
					class="size-full object-fill"
				/>
			</picture>
		{:else}
			<section
				class="flex max-w-[400px] grow flex-col items-start justify-center gap-y-4 px-8 py-12 pt-4 md:grow-0"
			>
				<div class="mt-auto flex flex-col gap-y-4 pb-16 md:pb-0">
					<img src="/newsletter/icon-success.svg" alt="success" class="w-fit" />
					<h1 class="pt-4">Thanks for subscribing!</h1>
					<p class="pb-5 pt-2">
						A confirmation email has been sent to <span class="font-bold">{form?.email}</span>.
						Please open it and click the button inside to confirm your subscription.
					</p>
				</div>
				<button class="btn-success" onclick={reset}> Dismiss message </button>
			</section>
		{/if}
	</div>
</main>

<style>
	* {
		--dark-slate-grey: hsl(234, 29%, 20%);
		--charcoal-grey: hsl(235, 18%, 26%);
		--grey: hsl(231, 7%, 60%);
		--tomato: hsl(4, 100%, 67%);
		--tomato-light: hsl(4, 100%, 95%);
		--white: hsl(0, 0%, 100%);

		font-family: 'Roboto', sans-serif;
	}

	main {
		color: var(--dark-slate-grey);
		@apply flex min-h-full flex-col items-center justify-start md:justify-center md:bg-[var(--dark-slate-grey)] md:p-8 lg:p-20;
	}
	p {
		line-height: 1.4;
		font-size: 14px;
	}
	h1 {
		@apply text-4xl font-bold leading-none md:text-[50px];
	}
	button {
		color: var(--white);
		@apply font-bold;
	}

	.error {
		color: var(--tomato);
	}

	input {
		@apply flex h-14 w-full cursor-pointer rounded-md border pl-6;
	}

	input:focus-visible {
		outline: solid 2px var(--dark-slate-grey);
	}

	button {
		background-color: var(--dark-slate-grey);
	}

	.btn-success {
		@apply mt-auto flex h-12 w-full items-center justify-center rounded-md from-[#ff527b] to-[var(--tomato)] text-sm outline-none hover:bg-gradient-to-r hover:md:bg-[var(--tomato)] hover:md:shadow-[0_16px_40px_-8px_var(--tomato)];
	}

	button:focus-visible {
		box-shadow: 0 16px 40px -8px var(--tomato);

		@apply bg-gradient-to-r from-[#ff527b] to-[var(--tomato)] outline-none;
	}

	input.error {
		background-color: var(--tomato-light);
		@apply border-0 shadow-inner ring-2 ring-[var(--tomato)] placeholder:text-[var(--tomato)] active:border-[var(--tomato)] active:ring-0;
	}

	ol {
		@apply min-w-full list-outside list-image-[url(/newsletter/icon-list.svg)] space-y-3 md:space-y-1;
	}

	ol li {
		@apply relative min-h-12 md:min-h-8;
	}
	ol li span {
		@apply absolute top-0 pl-3 text-base;
	}
</style>
