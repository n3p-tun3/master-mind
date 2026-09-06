import { describe, expect, it } from 'vitest';
import { CODE_LENGTH, MAX_DIGIT, MIN_DIGIT } from './rules';
import { generateSecret } from './generateSecret';

describe('generateSecret', () => {
	it('produces CODE_LENGTH unique digits within range using the real RNG', () => {
		for (let i = 0; i < 200; i++) {
			const secret = generateSecret();
			expect(secret).toHaveLength(CODE_LENGTH);
			expect(new Set(secret).size).toBe(CODE_LENGTH);
			for (const digit of secret) {
				expect(digit).toBeGreaterThanOrEqual(MIN_DIGIT);
				expect(digit).toBeLessThanOrEqual(MAX_DIGIT);
			}
		}
	});

	it('is deterministic given a deterministic rng', () => {
		const values = [0.1, 0.5, 0.9, 0.05, 0.99];
		const makeRng = () => {
			let i = 0;
			return () => values[i++ % values.length];
		};
		expect(generateSecret(makeRng())).toEqual(generateSecret(makeRng()));
	});

	it('never repeats a digit even when the rng returns the same value repeatedly', () => {
		const secret = generateSecret(() => 0);
		expect(new Set(secret).size).toBe(CODE_LENGTH);
	});
});
