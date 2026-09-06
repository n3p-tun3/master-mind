<script lang="ts">
	import '../app.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import Nav from '../components/Nav.svelte';

	injectAnalytics();
</script>

<div class="app-shell">
	<Nav />
	<main>
		<slot />
	</main>
</div>

<style>
	.app-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-primary);
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem 1.25rem;
	}
</style>
