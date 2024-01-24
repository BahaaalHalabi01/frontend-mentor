<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();

  function reset(){
    window.location.reload()
  }
</script>

<main>
	<div class="bg-white md:p-6 md:rounded-[32px] flex mx-auto gap-y-8 justify-center md:max-w-fit md:flex-row flex-col max-w-full min-h-full md:min-h-fit pb-8 md:pb-0">
		{#if !form?.success}
			<section class=" flex flex-col items-start justify-center md:pl-10 md:pr-16 px-6 gap-y-4 order-last md:order-first">
				<h1>Stay updated!</h1>
				<h2 class="max-w-[376px]">Join 60,000+ product managers receiving monthly updates on:</h2>
				<ol class='px-6'>
					<li><span>Product discovery and building what matters</span></li>
					<li><span>Measuring to ensure updates are a success</span></li>
					<li><span>And much more!</span></li>
				</ol>
				<form class="min-w-full gap-y-6 flex flex-col" use:enhance target="_self" method="POST">
					<label class="min-w-full">
						<div class="flex justify-between text-xs pb-2 font-bold">
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
					<button class="h-14 flex items-center w-full rounded-md justify-center mt-auto">
						Subscribe to monthly newsletter
					</button>
				</form>
			</section>
			<picture >
        <source srcset='/newsletter/illustration-sign-up-desktop.svg' media='(min-width: 768px)' class='max-h-96'/>
				<img alt="newsletter" src="/newsletter/illustration-sign-up-mobile.svg" class='object-fill size-full'/>
			</picture>
		{:else}
			<section
				class="col-span-1 flex flex-col items-start justify-center px-8 pb-8 pt-4 max-w-[400px] gap-y-4 order-first md:order-last"
			>
				<img src="/newsletter/icon-success.svg" alt="success" />
				<h1 class='pt-4'>Thanks for subscribing!</h1>
				<p class='pt-2 pb-5'>
					A confirmation email has been sent to <span class='font-bold'>{form?.email}</span>. Please open it and click the
					button inside to confirm your subscription.
				</p>
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
		--white: hsl(0, 0%, 100%);

		font-family: 'Roboto', sans-serif;
	}

	main {
		color: var(--dark-slate-grey);
		@apply min-h-full flex flex-col items-center justify-start md:justify-center lg:p-20 md:p-8 md:bg-[var(--dark-slate-grey)];
	}
	p {
		line-height: 1.4;
		font-size: 14px;
	}
	h1 {
		line-height: 1;
		@apply font-bold md:text-[50px] text-4xl;
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

	.btn-success {
		box-shadow: 0 16px 40px -8px var(--tomato);
		@apply h-12 flex items-center w-full rounded-md justify-center bg-[var(--tomato)] outline-none text-sm;
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
		@apply list-image-[url(newsletter/icon-list.svg)] list-outside min-w-full space-y-2;
	}

	ol li {
		@apply relative min-h-12;
	}
	ol li span {
    @apply absolute text-base pl-3;
	}
</style>
