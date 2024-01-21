<script>
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
			<form class="min-w-full gap-y-6 flex flex-col">
				<label class="min-w-full">
					<span class="pb-3 block text-xs font-bold">Email address</span>
					<input
						type="text"
						class="border flex rounded-md w-full h-14 pl-6"
						placeholder="email@company.com"
					/>
				</label>
				<button
					class="h-14 flex items-center w-full rounded-md justify-center"
					style="background-color:var(--dark-slate-grey)"
				>
					Subscribe to monthly newsletter
				</button>
			</form>
		</section>
		<picture>
			<img alt="newsletter" src="/newsletter/illustration-sign-up-desktop.svg" />
		</picture>
	</div>
</main>

<style>
	* {
		--dark-slate-grey: hsl(234, 29%, 20%);
		--charcoal-grey: hsl(235, 18%, 26%);
		--grey: hsl(231, 7%, 60%);
		--white: hsl(0, 0%, 100%);
	}

	main {
		background-color: var(--dark-slate-grey);
		font-family: 'Roboto', sans-serif;
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
