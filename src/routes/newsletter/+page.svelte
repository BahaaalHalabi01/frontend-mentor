<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';
	import * as z from 'zod';

	let error = $state('');

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		const d = new FormData(e.currentTarget);

		const email = d.get('email');

		const result = z.string().email('Valid email required').safeParse(email);

		if (!result.success) {
			error = result.error.format()._errors[0];
			return;
		}
	};
</script>

<main>
	<div class="bg-white lg:p-6 md:rounded-3xl flex mx-auto gap-y-8 justify-center max-w-fit">
		<section class="col-span-1 flex flex-col items-start justify-center pl-10 pr-16 gap-y-4">
			<h1>Stay updated!</h1>
			<h2 class="w-[376px]">Join 60,000+ product managers receiving monthly updates on:</h2>
			<ol>
				<li><span>Product discovery and building what matters</span></li>
				<li><span>Measuring to ensure updates are a success</span></li>
				<li><span>And much more!</span></li>
			</ol>
			<form class="min-w-full gap-y-6 flex flex-col" on:submit|preventDefault={handleSubmit}>
				<label class="min-w-full">
					<div class="flex justify-between text-xs pb-2 font-bold">
						<span class="block">Email address</span>
						{#if error.length > 0}
							<span class="error">{error}</span>
						{/if}
					</div>
					<input
						aria-errormessage={error ?? undefined}
						aria-invalid={!!error}
						autocomplete="email"
						name="email"
						type="text"
						class:error
						placeholder={'email@company.com'}
					/>
				</label>
				<button class="h-14 flex items-center w-full rounded-md justify-center">
					Subscribe to monthly newsletter
				</button>
			</form>
		</section>
		<picture class="max-h-fit">
			<img alt="newsletter" src="/newsletter/illustration-sign-up-desktop.svg" />
		</picture>
	</div>
</main>

<style>
	* {
		--dark-slate-grey: hsl(234, 29%, 20%);
		--charcoal-grey: hsl(235, 18%, 26%);
		--grey: hsl(231, 7%, 60%);
		--tomato: hsl(4, 100%, 67%);
		--white: hsl(0, 0%, 100%);

		font-family: 'Roboto', sans-serif;
	}

	main {
		background-color: var(--dark-slate-grey);
		color: var(--dark-slate-grey);
		@apply min-h-screen flex flex-col items-center justify-center p-20;
	}
	h1 {
		font-size: 50px;
		@apply font-bold;
	}
	button {
		color: var(--white);
		@apply font-bold;
	}

	.error {
		color: var(--tomato);
	}

	input {
		@apply border flex rounded-md w-full h-14 pl-6 cursor-pointer;
	}

	input:focus-visible {
		outline: solid 2px var(--dark-slate-grey);
	}

	button {
		background-color: var(--dark-slate-grey);
	}
	button:focus-visible {
		box-shadow: 0 16px 40px -8px var(--tomato);
		@apply bg-[var(--tomato)] outline-none;
	}

	input.error {
		background-color: hsl(4, 100%, 95%);
		@apply placeholder:text-[var(--tomato)] ring-2 ring-[var(--tomato)] border-0 active:border-[var(--tomato)] active:ring-0 shadow-inner;
	}

	ol {
		@apply list-image-[url(newsletter/icon-list.svg)] list-inside min-w-full space-y-1;
	}

	ol li {
		@apply relative;
	}
	ol li span {
		@apply absolute pl-3;
	}
</style>
