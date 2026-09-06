<script lang="ts">
	import { onMount } from 'svelte';

	let isDark = false;

	const toggleTheme = () => {
		isDark = !isDark;
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	};

	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'light';
		isDark = savedTheme === 'dark';
		document.documentElement.setAttribute('data-theme', savedTheme);
	});
</script>

<button
	on:click={toggleTheme}
	class="navbar-button w-10 h-10 flex items-center justify-center rounded-lg"
	aria-label="Toggle theme"
>
	{#if isDark}
		<svg class="w-5 h-5" viewBox="0 0 24 24" fill="#eab308" aria-hidden="true">
			<circle cx="12" cy="12" r="5" />
			<path
				stroke="#eab308"
				stroke-width="2"
				stroke-linecap="round"
				d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
			/>
		</svg>
	{:else}
		<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-4.492 0-8.131-3.639-8.131-8.131 0-1.276.294-2.484.818-3.558a.5.5 0 0 0-.62-.68A10.096 10.096 0 0 0 2 10.9C2 16.474 6.526 21 12.1 21a10.096 10.096 0 0 0 9.5-6.732.5.5 0 0 0-.858-.223z"
			/>
		</svg>
	{/if}
</button>
