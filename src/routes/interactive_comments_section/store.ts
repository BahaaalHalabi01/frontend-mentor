import { writable } from 'svelte/store';

const current_user = writable<{
	username: string;
} | null>({username:'juliusomo'});



export {current_user}
