<script lang="ts">
	import Game from '$lib/components/Game.svelte';
	import { generateSecret } from '$lib/game/generateSecret';

	let secret = generateSecret();
	let gameKey = 0;

	function playAgain() {
		secret = generateSecret();
		gameKey += 1;
	}
</script>

<svelte:head>
	<title>KrackTheKode · Practice</title>
</svelte:head>

<div class="w-full max-w-lg">
	<div class="card p-6 sm:p-8">
		<h2 class="text-xl sm:text-2xl font-bold mb-1 text-heading">Practice</h2>
		<p class="text-sm text-body mb-6" style="color: var(--text-muted)">
			Unlimited replays. New code every game.
		</p>

		{#key gameKey}
			<Game {secret} on:complete={() => {}}>
				<svelte:fragment slot="footer" let:status>
					{#if status !== 'playing'}
						<button class="btn-primary" on:click={playAgain}>Play again</button>
					{/if}
				</svelte:fragment>
			</Game>
		{/key}
	</div>
</div>
