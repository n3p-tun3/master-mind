<script lang="ts">
	import { onMount } from 'svelte';
	import Game from '$lib/components/Game.svelte';
	import {
		formatDate,
		getDayNumber,
		getSecretForDate,
		getTodayCompletion,
		saveTodayCompletion,
		type DailyCompletion
	} from '$lib/game/dailyChallenge';
	import { generateShareText, copyToClipboard } from '$lib/game/shareResults';
	import { MAX_ATTEMPTS, type Score } from '$lib/game/rules';

	const today = new Date();
	const secret = getSecretForDate(today);
	const dayNumber = getDayNumber(today);

	let completion: DailyCompletion | null = null;
	let copied = false;

	onMount(() => {
		completion = getTodayCompletion();
	});

	function handleComplete(
		event: CustomEvent<{ won: boolean; attempts: { guess: number[]; score: Score }[] }>
	) {
		const { won, attempts } = event.detail;
		const scores = attempts.map((a) => a.score);
		saveTodayCompletion(scores, won);
		completion = getTodayCompletion();
	}

	async function share(scores: Score[], won: boolean) {
		const text = generateShareText(scores, dayNumber, won, MAX_ATTEMPTS);
		copied = await copyToClipboard(text);
		if (copied) setTimeout(() => (copied = false), 2000);
	}

	function shareCompletion() {
		if (!completion) return;
		void share(completion.scores, completion.won);
	}
</script>

<svelte:head>
	<title>KrackTheKode · Daily Challenge</title>
</svelte:head>

<div class="w-full max-w-lg">
	<div class="card p-6 sm:p-8">
		<h2 class="text-xl sm:text-2xl font-bold mb-1 text-heading">Daily Challenge #{dayNumber}</h2>
		<p class="text-sm mb-6" style="color: var(--text-muted)">
			{formatDate(today)} · same code for everyone today
		</p>

		<Game
			{secret}
			disabled={!!completion}
			disabledMessage={completion
				? `You already played today — ${completion.won ? 'you won' : 'better luck tomorrow'}.`
				: ''}
			on:complete={handleComplete}
		>
			<svelte:fragment slot="footer">
				{#if completion}
					<button class="btn-primary" on:click={shareCompletion}>
						{copied ? 'Copied!' : 'Share result'}
					</button>
				{/if}
			</svelte:fragment>
		</Game>
	</div>
</div>
