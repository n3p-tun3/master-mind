<script lang="ts">
	import { CODE_LENGTH, MAX_ATTEMPTS, MIN_DIGIT, MAX_DIGIT } from '$lib/game/rules';
</script>

<svelte:head>
	<title>KrackTheKode · Rules</title>
</svelte:head>

<div class="w-full max-w-4xl">
	<div class="card p-6 sm:p-8">
		<h2 class="text-2xl sm:text-3xl font-bold mb-8 text-center text-heading">
			How To Play KrackTheKode
		</h2>

		<div class="mb-8">
			<h2
				class="text-lg sm:text-2xl font-semibold text-yellow-600 dark:text-yellow-400 mb-3 text-heading"
			>
				Objective
			</h2>
			<p class="text-base sm:text-lg text-body">
				Guess the secret {CODE_LENGTH}-digit code in as few attempts as possible. You have a maximum
				of {MAX_ATTEMPTS} attempts to crack the code!
			</p>
		</div>

		<ol class="flex flex-col gap-6">
			<li
				class="rules-item bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 w-full border border-gray-200 dark:border-gray-700"
			>
				<h3
					class="text-base sm:text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 text-heading"
				>
					1. Make A Guess
				</h3>
				<p class="text-body">
					Enter any {CODE_LENGTH}-digit number using digits {MIN_DIGIT}–{MAX_DIGIT}. Each digit must
					be unique (no repeats, and no zero).
				</p>
			</li>

			<li
				class="rules-item bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 w-full border border-gray-200 dark:border-gray-700"
			>
				<h3
					class="text-base sm:text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 text-heading"
				>
					2. Understand The Feedback
				</h3>
				<p class="mb-4 text-body">
					After submitting, you'll receive two pieces of information to help you narrow down the
					correct code:
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
					<div
						class="explanation-card bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-4 rounded-lg flex-1"
					>
						<h4 class="font-bold text-base mb-2 text-blue-700 dark:text-blue-400 text-heading">
							Exists (E)
						</h4>
						<p class="text-sm text-body">
							How many digits from your guess exist somewhere in the secret code, regardless of
							position.
						</p>
						<div class="example-box mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm text-body">
							<strong class="text-gray-900 dark:text-gray-100">Example:</strong> Your guess: 1234,
							code: 7249<br />
							<strong class="text-blue-600 dark:text-blue-400">E: 2</strong> — digits 2 and 4 exist in
							the code.
						</div>
					</div>
					<div
						class="explanation-card bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-4 rounded-lg flex-1"
					>
						<h4 class="font-bold text-base mb-2 text-green-700 dark:text-green-400 text-heading">
							Correct (C)
						</h4>
						<p class="text-sm text-body">
							Of the digits counted in E, how many are also in the exact right position. Always ≤ E.
						</p>
						<div class="example-box mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm text-body">
							<strong class="text-gray-900 dark:text-gray-100">Example:</strong> Your guess: 1234,
							code: 7249<br />
							<strong class="text-green-600 dark:text-green-400">C: 1</strong> — only digit "2" is in
							the correct spot.
						</div>
					</div>
				</div>
			</li>

			<li
				class="rules-item bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 w-full border border-gray-200 dark:border-gray-700"
			>
				<h3
					class="text-base sm:text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 text-heading"
				>
					3. Winning Condition
				</h3>
				<p class="text-body">
					Getting <span class="font-bold text-green-700 dark:text-green-400">C: {CODE_LENGTH}</span>
					means you've correctly guessed the code and won.
				</p>
			</li>

			<li
				class="rules-item bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 w-full border border-gray-200 dark:border-gray-700"
			>
				<h3
					class="text-base sm:text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 text-heading"
				>
					4. Game Over
				</h3>
				<p class="text-body">
					If you don't guess the code within {MAX_ATTEMPTS} attempts, the game ends and reveals the secret
					code.
				</p>
			</li>
		</ol>

		<div
			class="strategy-tips bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 sm:p-8 mt-8"
		>
			<h3
				class="text-base sm:text-xl font-semibold text-green-700 dark:text-green-400 mb-3 text-heading"
			>
				💡 Strategy Tips
			</h3>
			<ul class="text-left space-y-2 text-sm text-body">
				<li>• Start with a systematic approach (e.g., 1234, then 5678)</li>
				<li>• Use the Exists and Correct values to eliminate possibilities</li>
				<li>• Remember: no digit repeats in the secret code</li>
				<li>• Pay attention to which digits you've already tried</li>
			</ul>
		</div>

		<div class="mt-8 text-center">
			<a href="/" class="btn-primary" style="display: inline-block; text-decoration: none;">
				Back to Practice
			</a>
		</div>
	</div>
</div>
