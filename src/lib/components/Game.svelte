<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { MAX_ATTEMPTS, isWinningScore, scoreGuess, type Score } from '$lib/game/rules';
	import { parseGuess } from '$lib/game/parseGuess';
	import { celebrate } from '$lib/game/confetti';

	export let secret: number[];
	export let maxAttempts: number = MAX_ATTEMPTS;
	export let disabled = false;
	export let disabledMessage = '';

	interface Attempt {
		guess: number[];
		score: Score;
	}

	const dispatch = createEventDispatcher<{
		complete: { won: boolean; attempts: Attempt[] };
	}>();

	let attempts: Attempt[] = [];
	let inputValue = '';
	let inputError = '';
	let status: 'playing' | 'won' | 'lost' = 'playing';

	$: attemptsLeft = maxAttempts - attempts.length;
	$: isOver = status !== 'playing';

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value.replace(/[^0-9]/g, '').slice(0, 4);
		target.value = inputValue;
		if (inputError) inputError = '';
	}

	function submitGuess() {
		if (disabled || isOver) return;

		const parsed = parseGuess(inputValue);
		if (!parsed.ok) {
			inputError = parsed.error;
			return;
		}

		const score = scoreGuess(secret, parsed.digits);
		attempts = [...attempts, { guess: parsed.digits, score }];
		inputValue = '';
		inputError = '';

		if (isWinningScore(score)) {
			status = 'won';
			celebrate();
			dispatch('complete', { won: true, attempts });
		} else if (attempts.length >= maxAttempts) {
			status = 'lost';
			dispatch('complete', { won: false, attempts });
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') submitGuess();
	}
</script>

<div class="game">
	{#if disabled}
		<p class="banner banner-info">{disabledMessage}</p>
	{:else if status === 'won'}
		<p class="banner banner-win">
			Cracked it in {attempts.length}
			{attempts.length === 1 ? 'try' : 'tries'}!
		</p>
	{:else if status === 'lost'}
		<p class="banner banner-lose">
			Out of attempts. The code was <strong>{secret.join('')}</strong>.
		</p>
	{/if}

	<div class="input-group">
		<label for="guess-input" class="input-label">Your guess</label>
		<div class="input-row">
			<!-- svelte-ignore a11y-autofocus -->
			<!-- Deliberate: this is the page's single control and its entire
			     purpose, with no competing content a keyboard/AT user would want
			     to reach first — the case autofocus advice carves out an exception for. -->
			<input
				id="guess-input"
				type="text"
				inputmode="numeric"
				maxlength="4"
				placeholder="????"
				value={inputValue}
				on:input={handleInput}
				on:keydown={handleKeydown}
				disabled={disabled || isOver}
				autofocus
				aria-invalid={inputError ? 'true' : 'false'}
				aria-describedby={inputError ? 'guess-error' : undefined}
			/>
			<button
				class="btn-primary"
				on:click={submitGuess}
				disabled={disabled || isOver || inputValue.length !== 4}
			>
				Guess
			</button>
		</div>
	</div>

	{#if inputError}
		<p class="input-error" id="guess-error" role="alert">{inputError}</p>
	{/if}

	{#if !disabled}
		<p class="attempts-left">{attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'} left</p>
	{/if}

	{#if attempts.length > 0}
		<ol class="history" aria-label="Guess history">
			{#each attempts as attempt, i (i)}
				<li class="history-row">
					<span class="history-index">{i + 1}</span>
					<span class="history-guess">{attempt.guess.join(' ')}</span>
					<span class="history-score">
						<span class="score-pill score-exists" title="Digits that exist in the code">
							E {attempt.score.exists}
						</span>
						<span class="score-pill score-correct" title="Digits in the correct position">
							C {attempt.score.correctPosition}
						</span>
					</span>
				</li>
			{/each}
		</ol>
	{/if}

	<slot name="footer" {status} {attempts} />
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.banner {
		border-radius: 12px;
		padding: 0.75rem 1rem;
		font-weight: 700;
		text-align: center;
	}

	.banner-info {
		background-color: var(--bg-tertiary);
		color: var(--text-secondary);
	}

	.banner-win {
		background-color: var(--color-success-bg);
		color: var(--color-success-text);
	}

	.banner-lose {
		background-color: var(--color-danger-bg);
		color: var(--color-danger-text);
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.input-label {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.input-row {
		display: flex;
		gap: 0.5rem;
	}

	input {
		/* min-width: 0 overrides the browser's default intrinsic text-input width
		   (~180px), which otherwise refuses to shrink inside a flex row and pushes
		   the button past the card's edge at narrow widths. */
		min-width: 0;
		width: auto;
		flex: 1;
		height: auto;
		padding: 0.75rem 1rem;
		font-size: 1.25rem;
		letter-spacing: 0.3em;
		text-align: center;
		border-radius: 12px;
		background-color: var(--bg-input);
		border: 2px solid var(--border-primary);
		color: var(--text-primary);
	}

	input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.input-error {
		color: var(--color-danger-text);
		font-size: 0.85rem;
		margin: -0.25rem 0 0;
	}

	.attempts-left {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin: 0;
	}

	.history {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 0;
		margin: 0;
	}

	.history-row {
		display: grid;
		grid-template-columns: 1.5rem 1fr auto;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem;
		border-radius: 10px;
		background-color: var(--bg-tertiary);
	}

	.history-index {
		color: var(--text-muted);
		font-size: 0.8rem;
	}

	.history-guess {
		font-size: 1.1rem;
		letter-spacing: 0.2em;
		font-weight: 700;
	}

	.history-score {
		display: flex;
		gap: 0.4rem;
	}

	.score-pill {
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.15rem 0.5rem;
		border-radius: 100px;
	}

	.score-exists {
		background-color: var(--color-info-bg);
		color: var(--color-info-text);
	}

	.score-correct {
		background-color: var(--color-success-bg);
		color: var(--color-success-text);
	}
</style>
