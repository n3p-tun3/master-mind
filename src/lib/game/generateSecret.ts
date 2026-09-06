import { CODE_LENGTH, MAX_DIGIT, MIN_DIGIT } from './rules';

/**
 * Draw CODE_LENGTH unique digits from [MIN_DIGIT, MAX_DIGIT] without replacement.
 * Takes an injectable rng so the daily challenge can drive it with a seeded
 * generator and get the exact same "unique digits" guarantee as free play,
 * instead of maintaining a second copy of this logic.
 */
export function generateSecret(rng: () => number = Math.random): number[] {
	const pool: number[] = [];
	for (let d = MIN_DIGIT; d <= MAX_DIGIT; d++) pool.push(d);

	const secret: number[] = [];
	for (let i = 0; i < CODE_LENGTH; i++) {
		const index = Math.floor(rng() * pool.length);
		secret.push(pool[index]);
		pool.splice(index, 1);
	}
	return secret;
}
