<script>
	import '../app.css';
</script>

<main class="min-h-screen flex pt-24 px-64">
	<section class="container mx-auto flex items-start justify-center">
		<div class="bg-white p-8 rounded-2xl max-w-4xl">
			<picture>
				<img alt="omlette" src="/recipe-page/image-omelette.jpeg" class="rounded-xl" />
			</picture>
			<h1 class="text-5xl py-8">Simple Omelette Recipe</h1>
		</div>
	</section>
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
		font-family: 'Young Serif',serif;
	}

	main {
		background-color: var(--eggshell);
		@apply text-lg;
	}
</style>
