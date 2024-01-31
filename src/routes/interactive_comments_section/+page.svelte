<script>
  import CommentCard from './CommentCard.svelte'
</script>

<svelte:head>
	<title>Interactive Comments Section</title>
</svelte:head>

<main> 
<div class='max-w-3xl w-full'>
  <CommentCard/>
</div>

</main>

<style>
	* {
		--dark-blue: hsl(212, 24%, 26%);
		--grayish-blue: hsl(211, 10%, 45%);
		--light-gray: hsl(223, 19%, 93%);
		--very-light-gray: hsl(228, 33%, 97%);
		--white: hsl(0, 0%, 100%);

		--moderate-blue: hsl(238, 40%, 52%);
		--soft-red: hsl(358, 79%, 66%);
		--light-grayish-blue: hsl(239, 57%, 85%);
		--pale-red: hsl(357, 100%, 86%);
	}

	main {
		font-family: 'Rubik', sans-serif;
    background-color:var(--light-gray);
		@apply min-h-full pt-12 md:pt-20 flex flex-col items-center ;
	}

	@font-face {
		font-family: Rubik;
		font-weight: 400 500 700;
		font-style: normal;
		src: local('Rubik'),
			urlurl('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');
	}
</style>
