<svelte:head>
	<title>Calculator App in Svelte</title>
</svelte:head>
<main>
	<div class=" roundedBr bg-[var(--white)] px-6 py-12">
		<div class="grid grid-cols-3 gap-x-4 tracking-[0.2em] text-xs font-semibold uppercase text-[var(--smokey-grey)]">
			<label>
				Day
				<input type="number" class='mt-1' value="24" autocomplete="bday-day"/>
			</label>
			<label>
				Month
				<input type="number" class='mt-1' value="09" autocomplete="bday-month"/>
			</label>
			<label>
				Year
				<input type="number" class='mt-1' value="1984" autocomplete="bday-year"/>
			</label>
		</div>
	</div>
</main>

<style>
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
		font-family: 'Poppins', sans-serif;
		@apply min-h-full px-4 pt-24;
	}

	input {
		-moz-appearance: textfield; 
    color:var(--off-black);
    font-size:18px;
		@apply h-[50px] max-w-full border rounded-md border-[var(--light-grey)] text-start px-3 shadow-inner;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0; 
	}

	.roundedBr {
		border-top-right-radius: 24px;
		border-top-left-radius: 24px;
		border-bottom-right-radius: 72px;
		border-bottom-left-radius: 24px;
	}

@include fontPoppins('Poppins-Regular', normal, normal);
@include fontPoppins('Poppins-Italic', normal, italic);
@include fontPoppins('Poppins-Bold', bold, normal);
@include fontPoppins('Poppins-ExtraBold', 800, normal);
@include fontPoppins('Poppins-ExtraBoldItalic', 800, italic);

@mixin fontPoppins($name, $weight, $style) {
  @font-face {
    font-family: Poppins;
    src: url('/fonts/poppins/#{$name}.ttf') format("truetype");
    font-weight: $weight;
    font-style: $style;
  }
}
</style>
