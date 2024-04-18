<svelte:head>
  <title>Recipe in Svelte</title>
</svelte:head>
<main class="min-h-screen lg:py-24 lg:px-64 md:px-32 md:py-12">
	<div
		class="bg-white lg:p-10 md:p-5 md:rounded-2xl lg:max-w-4xl flex items-start flex-col mx-auto gap-y-8 justify-center"
	>
		<picture>
			<img alt="omlette" src="/recipe-page/image-omelette.jpeg" class="md:rounded-xl" />
		</picture>
		<section>
			<h1 class="md:text-5xl text-4xl pb-8" style="color:var(--dark-charcoal)">Simple Omelette Recipe</h1>
			<h2 class="pb-8">
				An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs
				cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats.
			</h2>
			<div class="p-6 rounded-lg" style="background-color:var(--rose-white)">
				<span class="pb-4 text-2xl block font-semibold" style="color:var(--dark-raspberry)"
					>Prepartion time</span
				>
				<ul class="bold-list">
					<li><span>Total:</span> Approximately 10 minutes</li>
					<li><span>Preparation:</span> 5 minutes</li>
					<li><span>Cooking:</span> 5 minutes</li>
				</ul>
			</div>
		</section>
		<section>
			<h1 class="text-4xl pb-4" style="color:var(--nutmeg)">Ingredients</h1>
			<ul class="list">
				<li><span>2-3 large eggs</span></li>
				<li><span>Salt, to taste</span></li>
				<li>
					<span> Pepper, to taste</span>
				</li>
				<li>
					<span> 1 tablespoon of butter or oil </span>
				</li>
				<li>
					<span>Optional fillings: cheese, diced vegetables, cooked meats, herbs </span>
				</li>
			</ul>
		</section>
		<hr class="w-full" />
		<section>
			<h1 class="text-4xl pb-4" style="color:var(--nutmeg)">Instructions</h1>
			<ul class="bold-nutmeg-list">
				<li>
					<span> Beat the eggs:</span>
					In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed. You can
					add a tablespoon of water or milk for a fluffier texture.
				</li>
				<li>
					<span> Heat the pan:</span>
					Place a non-stick frying pan over medium heat and add butter or oil.
				</li>
				<li>
					<span> Cook the omelette:</span>
					Once the butter is melted and bubbling, pour in the eggs. Tilt the pan to ensure the eggs evenly
					coat the surface.
				</li>
				<li>
					<span> Add fillings (optional): </span>
					When the eggs begin to set at the edges but are still slightly runny in the middle, sprinkle
					your chosen fillings over one half of the omelette.
				</li>
				<li>
					<span>Fold and serve: </span>
					As the omelette continues to cook, carefully lift one edge and fold it over the fillings. Let
					it cook for another minute, then slide it onto a plate.
				</li>
				<li>
					<span> Enjoy: </span>
					Serve hot, with additional salt and pepper if needed.
				</li>
			</ul>
		</section>

		<hr class="w-full" />
		<section class="min-w-full">
			<h1 class="text-4xl pb-4" style="color:var(--nutmeg)">Nutrition</h1>
			<h2 class="font-light pb-2">
				The table below shows nutritional values per serving without the additional fillings.
			</h2>
			<table class="min-w-full">
				<tbody>
					<tr>
						<td> Calories </td>
						<td> 277kcal </td>
					</tr>
					<tr>
						<td> Carbs </td>
						<td> 0g </td>
					</tr><tr>
						<td> Protein </td>
						<td> 20g </td>
					</tr>
					<tr>
						<td> Fat </td>
						<td> 22g </td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</main>

<style>
	* {
		--white: hsl(0, 0%, 100%);
		--rose-white: hsl(330, 100%, 98%);
		--eggshell: hsl(30, 54%, 90%);
		--light-grey: hsl(30, 18%, 87%);
		--wenge-brown: hsl(30, 10%, 34%);
		--dark-charcoal: hsl(24, 5%, 18%);
		--nutmeg: hsl(14, 45%, 36%);
		--dark-raspberry: hsl(332, 51%, 32%);
	}

	h1 {
		font-family: 'Young Serif', serif;
	}

	section {
		@apply px-8;
	}

	main {
		background-color: var(--eggshell);
		color: var(--wenge-brown);
		font-family: 'Outfit', sans-serif;
		@apply text-base;
	}

	ul {
		@apply list-disc pl-6;
	}

	li {
		@apply py-1 pl-4;
	}

	td {
		@apply py-4 px-8 border-b;
	}

	tr td:last-child {
		color: var(--nutmeg);
		@apply font-bold;
	}

	.bold-nutmeg-list {
		@apply list-decimal;
	}
	.bold-list li::marker,
	.bold-nutmeg-list li::marker {
		color: var(--dark-raspberry);
		@apply text-base font-bold;
	}

	.bold-list li span,
	.bold-nutmeg-list li span {
		@apply font-bold;
	}

	.list li::marker,
	.bold-nutmeg-list li::marker {
		color: var(--nutmeg);
		@apply text-base;
	}
</style>
