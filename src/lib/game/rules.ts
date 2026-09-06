// Core rules of the game, isolated from any UI or mode concerns so they can be
// unit-tested directly. Every code (secret or guess) is a fixed-length array of
// unique digits in [MIN_DIGIT, MAX_DIGIT] — zero is intentionally excluded.

export const CODE_LENGTH = 4;
export const MIN_DIGIT = 1;
export const MAX_DIGIT = 9;
export const MAX_ATTEMPTS = 10;

export interface Score {
	/** Digits from the guess that appear anywhere in the secret. */
	exists: number;
	/** Of those, how many are also in the exact right position. Always <= exists. */
	correctPosition: number;
}

export class InvalidCodeError extends Error {}

function assertValidCode(code: number[], label: string): void {
	if (code.length !== CODE_LENGTH) {
		throw new InvalidCodeError(`${label} must have exactly ${CODE_LENGTH} digits`);
	}
	for (const digit of code) {
		if (!Number.isInteger(digit) || digit < MIN_DIGIT || digit > MAX_DIGIT) {
			throw new InvalidCodeError(
				`${label} digits must be integers between ${MIN_DIGIT} and ${MAX_DIGIT}`
			);
		}
	}
	if (new Set(code).size !== code.length) {
		throw new InvalidCodeError(`${label} digits must be unique`);
	}
}

/**
 * Score a guess against the secret. Because both are validated to have unique
 * digits, "exists" is just the size of the intersection of the two digit sets —
 * there's no double-counting edge case to handle the way classic Mastermind
 * scoring needs when repeated digits are allowed.
 */
export function scoreGuess(secret: number[], guess: number[]): Score {
	assertValidCode(secret, 'secret');
	assertValidCode(guess, 'guess');

	const secretDigits = new Set(secret);
	let exists = 0;
	let correctPosition = 0;

	for (let i = 0; i < guess.length; i++) {
		if (secretDigits.has(guess[i])) exists++;
		if (guess[i] === secret[i]) correctPosition++;
	}

	return { exists, correctPosition };
}

export function isWinningScore(score: Score): boolean {
	return score.correctPosition === CODE_LENGTH;
}
