# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [Running the project](#running-the-project)
  - [The challenge](#the-challenge)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Running the project

I am using pnpm for running the commands, use whatever you want, change the commands accordingly.

- Install the project <strong>pnpm install</strong>
- Install turso locally in order to use the database follow [steps](https://docs.turso.tech/cli/installation) here to install on your specific device.
- For local dev purposes, create a database locally using command <strong>pnpm db:dev</strong>
- Setup the database url accordingly ( if you ran locally the ip by default is <strong>http://127.0.0.1:8080</strong>)
- Apply the database schema by running <strong>pnpm db:push</strong>
- Run the script <strong>/src/lib/server/db/seed.ts</strong> to seed the initial data into the database ( you might need to adjust the env variabeles as well)

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
  \*\*Note that the above dynamic behavior is only available if you run the application locally with your database, for demonstration purposes, this will be deployed with commenting out
  the functionality of deleting/editing behavior.

### Links

- Solution URL: [Add solution URL here](https://github.com/BahaaalHalabi01/frontend-mentor/tree/main/src/routes/interactive_comments_section)
- Live Site URL: [Add live site URL here](https://frontend-mentor-eta-three.vercel.app/interactive_comments_section)

## My process

### Built with

- Svelte5 - JS library
- Basic CSS inside of Svelte's style tag
- [TailwindCSS](https://tailwindcss.com/)
- [SvelteKit](https://kit.svelte.dev/) - Official router and framework built on Svelte
- [Turso](https://turso.tech/) - hosting my libsql database
- [Libsql](https://github.com/tursodatabase/libsql) - database of choice
  \*\*turso and libsql are only needed if you are going to persist the data, you can create this project without them

### What I learned

Using Svelte5's new <snippet> functionality was nice, at first i tried to over use it instead of simply making a component for the nested comments, but i found that to be messy (specially with types).I ended up creating <TextForm/> as its own component.

I truly didn't think it would be complicated to create such a thing, but the nesting( having a comment inside of a comment) with a form in each section, made it annoying the least.

This is what i used to nest the comment inside of itself, i do not believe this is the most optimal approach, but after some iterations, this is what ended up the best.

```svelte
<div class="flex flex-col gap-y-2">
	{@render entry(comment as TReply)}
	{#if replies.length > 0}
		<div class="flex gap-x-4 pt-4 md:gap-x-8">
			<div class="border-r-2 border-gray-300 md:pl-8"></div>
			<div class="flex w-full flex-col gap-y-4">
				{#each replies as reply ('reply' + reply.id)}
					{@render entry({ ...reply, isNested: true })}
				{/each}
			</div>
		</div>
	{/if}
</div>
```

### Continued development

- [] Add Login capabilities
- [] Add different comment pages, having a step before this page shows ( ex: create a topic first then this shows)

### Useful resources

If you want to use the technologies i used,refer to docs of [tailwindCSS](https://tailwindcss.com/) and [svelteKit](https://kit.svelte.dev/) (specially the learn.svelte.dev website)

## Author

- Website - [Bahaa al Halabi](https://portfolio-bahaaalhalabi.vercel.app/)
- Frontend Mentor - [@BahaaalHalabi01](https://www.frontendmentor.io/profile/BahaaalHalabi01)
