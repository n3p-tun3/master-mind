<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { page } from '$app/stores';

	$: pathname = $page.url.pathname;
</script>

<nav class="navbar sticky top-0 z-50 w-full">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<div class="flex items-center gap-4 sm:gap-6">
				<h1 class="navbar-title text-lg sm:text-2xl whitespace-nowrap">KrackTheKode</h1>
				<div class="tabs">
					<a href="/" class="tab" class:active={pathname === '/'}>Practice</a>
					<a href="/daily" class="tab" class:active={pathname === '/daily'}>Daily</a>
				</div>
			</div>

			<div class="flex items-center space-x-3">
				<a
					href="/rules"
					class="navbar-button w-10 h-10 flex items-center justify-center rounded-lg"
					class:active={pathname === '/rules'}
					aria-label="View game rules"
				>
					<svg
						class="w-5 h-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="9" />
						<path stroke-linecap="round" d="M12 11v5M12 8v.01" />
					</svg>
				</a>
				<ThemeToggle />
			</div>
		</div>
	</div>
</nav>

<style>
	.tabs {
		display: flex;
		gap: 0.25rem;
		background-color: var(--bg-tertiary);
		border-radius: 100px;
		padding: 0.2rem;
	}

	.tab {
		font-size: 0.85rem;
		font-weight: 700;
		padding: 0.4rem 0.9rem;
		border-radius: 100px;
		color: var(--text-secondary);
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.tab:hover {
		color: var(--text-primary);
	}

	.tab.active {
		background-color: var(--bg-card);
		color: var(--text-primary);
		box-shadow: var(--shadow-sm);
	}

	.navbar-button.active {
		background-color: var(--bg-tertiary);
		color: var(--text-primary);
	}
</style>
