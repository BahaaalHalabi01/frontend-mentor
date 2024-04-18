<svelte:head>
	<title>Frontend Mentor in svelte</title>
</svelte:head>
<main>
	<section>
		<h1>Frontend Mentor Projects</h1>
		<ul class="list-inside space-y-8 pt-12 text-4xl">
			<li><a href="/recipe">Recipe </a></li>
			<li><a href="/newsletter">Newsletter</a></li>
			<li><a href="/interactive_comments_section">Interactive Comments Section</a></li>
			<li><a href="/age_calculator">Age Calculator</a></li>
		</ul>
	</section>
</main>

<style>
	* {
		font-family: 'Roboto', sans-serif;
	}
	h1 {
		@apply text-6xl;
	}
	main {
		@apply min-h-full bg-orange-800 text-black md:justify-center md:p-8 lg:p-20;
	}

	li {
    @apply hover:text-white
	}
</style>
