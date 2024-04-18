<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = { children: Snippet };
	let { children }:TProps = $props();
</script>

<button
	class="ml-auto inline-flex w-full max-w-24 basis-auto flex-wrap items-center justify-center rounded-md bg-[var(--moderate-blue)] py-2.5 font-medium uppercase text-white hover:opacity-30"
>
	{@render children()}
</button>
