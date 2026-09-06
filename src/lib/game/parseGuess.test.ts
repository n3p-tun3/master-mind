import { describe, expect, it } from 'vitest';
import { parseGuess } from './parseGuess';

describe('parseGuess', () => {
	it('accepts a valid guess', () => {
		expect(parseGuess('7249')).toEqual({ ok: true, digits: [7, 2, 4, 9] });
	});

	it.each([
		['123', 'Enter 4 digits'],
		['12345', 'Enter 4 digits'],
		['12a4', 'Digits only'],
		['0234', 'Zero is not allowed'],
		['1231', 'Each digit must be unique']
	])('rejects %s with "%s"', (raw, expectedError) => {
		const result = parseGuess(raw);
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.error).toBe(expectedError);
	});
});
