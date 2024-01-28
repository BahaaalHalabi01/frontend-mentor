<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();
	let age = $state<{ days?: number; months?: number; years?: number }>({
		days: undefined,
		months: undefined,
		years: undefined
	});

	$inspect(form);
	function isMany(e?: number) {
		if (e === undefined) return 's';
		if (e && e > 1) return 's';
		if (e === 0) return 's';
		return '';
	}

	$effect(() => {
		if (form?.success) {
			const startTime = performance.now();
			age = { months: 0, days: 0, years: 0 };
			const duration = 500;

			requestAnimationFrame((t: number) =>
				updateValue(t, startTime, form?.age as Required<typeof age>, duration, age)
			);
		}
	});

	const easingFunction = (t: number) => t;

	function updateValue(
		timestamp: number,
		startTime: number,
		endV: Required<typeof age>,
		duration: number,
		v: typeof age
	) {
		const elapsedTime = timestamp - startTime;
		const progress = Math.min(elapsedTime / duration, 1);
		v.years = Math.floor(easingFunction(progress) * endV?.years);
		v.days = Math.floor(easingFunction(progress) * endV?.days);
		v.months = Math.floor(easingFunction(progress) * endV?.months);
		if (progress < 1) {
			requestAnimationFrame((t: number) => updateValue(t, startTime, endV, duration, v));
		}
	}
</script>

<svelte:head>
	<title>Calculator App in Svelte</title>
</svelte:head>
<main>
	<form
		class=" roundedBr mx-auto bg-[var(--white)] px-6 py-12 md:max-w-[850px] md:px-16"
		method="POST"
		use:enhance
	>
		<div
			class="grid max-w-fit grid-cols-3 gap-x-4 text-xs font-semibold uppercase text-[var(--smokey-grey)] md:gap-x-8 md:text-base"
		>
			<label class:error={form?.errors?.day?.length}>
				Day
				<input
					value={form?.day ?? ''}
					name="day"
					id="day"
					type="number"
					autocomplete="bday-day"
					placeholder="DD"
					aria-placeholder="24"
					role="textbox"
				/>
				{#if form?.errors?.day?.length}<span>{form?.errors?.day[0]}</span>
				{/if}
			</label>
			<label class:error={form?.errors?.month?.length}>
				Month
				<input
					name="month"
					value={form?.month ?? ''}
					id="month"
					type="number"
					autocomplete="bday-month"
					aria-placeholder="09"
					role="textbox"
					placeholder="MM"
				/>
				{#if form?.errors?.month?.length}<span>{form?.errors?.month[0]}</span>
				{/if}
			</label>
			<label class:error={form?.errors?.year?.length}>
				Year
				<input
					type="number"
					name="year"
					value={form?.year ?? ''}
					id="year"
					autocomplete="bday-year"
					aria-placeholder="1984"
					role="textbox"
					placeholder="YYYY"
				/>
				{#if form?.errors?.year?.length}<span>{form?.errors?.year[0]}</span>
				{/if}
			</label>
		</div>
		<div class="flex items-center justify-center py-8 md:py-0">
			<hr />
			<button
				class="flex items-center justify-center rounded-full bg-[var(--purple)] p-4 hover:bg-[var(--off-black)] md:p-6"
			>
				<img src="/age_calculator/icon-arrow.svg" alt="below" class="min-w-7 md:min-w-12" />
			</button>
			<hr class="block md:hidden" />
		</div>
		<div class="flex flex-col gap-y-2 pt-2 text-5xl font-extrabold italic md:text-8xl">
			<p>
				<strong>{age.years ?? '- -'}</strong> year{isMany(form?.age?.years)}
			</p>
			<p><strong>{age.months ?? '- - '}</strong> month{isMany(form?.age?.months)}</p>
			<p><strong>{age.days ?? '- -'}</strong> day{isMany(form?.age?.days)}</p>
		</div>
	</form>
</main>

<style lang="scss">
	* {
		--white: hsl(0, 0%, 100%);
		--off-white: hsl(0, 0%, 94%);
		--light-grey: hsl(0, 0%, 86%);
		--smokey-grey: hsl(0, 1%, 44%);
		--off-black: hsl(0, 0%, 8%);
		--purple: hsl(259, 100%, 65%);
		--light-red: hsl(0, 100%, 67%);
	}
	main {
		background-color: var(--off-white);
		font-family: 'poppins', sans-serif;
		@apply min-h-full px-4 pt-24 md:pt-36;
	}

	input {
		-moz-appearance: textfield;
		appearance: textfield;
		color: var(--off-black);
		@apply mt-1 block h-[50px] max-w-full rounded-md border border-[var(--light-grey)] 
    px-3 text-start text-[18px] shadow-inner placeholder:text-[var(--smokey-grey)] md:mt-2 md:h-16 md:max-w-40 md:px-6 md:text-3xl md:placeholder:text-3xl;
	}

	label {
		@apply max-w-40 tracking-[0.2em];
	}

	label.error input {
		@apply border-[var(--light-red)];
	}

	label.error {
		@apply text-[var(--light-red)];
	}

	label.error span {
		@apply block pt-2 text-xs font-normal  normal-case italic tracking-normal;
	}

	input:focus-visible {
		@apply border-2 border-[var(--purple)] outline-none;
	}

	strong {
		color: var(--purple);
	}

	hr {
		border-top-width: 2px;
		@apply w-full border-[var(--light-grey)] shadow-2xl;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.roundedBr {
		border-top-right-radius: 24px;
		border-top-left-radius: 24px;
		border-bottom-right-radius: 100px;
		border-bottom-left-radius: 24px;
	}

	@mixin fontPoppins($name, $weight, $style) {
		@font-face {
			font-family: Poppins;
			src:
				local('Poppins'),
				url('/fonts/poppins/#{$name}.ttf') format('truetype');
			font-weight: $weight;
			font-style: $style;
		}
	}

	@include fontPoppins('Poppins-Regular', normal, normal);
	@include fontPoppins('Poppins-Italic', normal, italic);
	@include fontPoppins('Poppins-Bold', bold, normal);
	@include fontPoppins('Poppins-ExtraBold', 800, normal);
	@include fontPoppins('Poppins-ExtraBoldItalic', 800, italic);
</style>
