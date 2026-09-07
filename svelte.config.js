import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Runtime pinned explicitly — adapter-vercel otherwise infers it from
		// whatever Node version happens to run the build machine and errors if
		// that version isn't in its known-good list (it doesn't yet know Node 24).
		adapter: adapter({ runtime: 'nodejs22.x' })
	},
	preprocess: vitePreprocess()
};
export default config;
