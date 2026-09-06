import { describe, expect, it } from 'vitest';
import { CODE_LENGTH, InvalidCodeError, isWinningScore, scoreGuess } from './rules';

describe('scoreGuess', () => {
	it('scores a perfect guess', () => {
		expect(scoreGuess([7, 2, 4, 9], [7, 2, 4, 9])).toEqual({ exists: 4, correctPosition: 4 });
	});

	it('scores no overlap at all', () => {
		expect(scoreGuess([7, 2, 4, 9], [1, 3, 5, 6])).toEqual({ exists: 0, correctPosition: 0 });
	});

	it('matches the worked example from the rules page: secret 7249, guess 1234', () => {
		// 2 and 4 exist in the secret; only 2 is in the guess's correct spot.
		expect(scoreGuess([7, 2, 4, 9], [1, 2, 3, 4])).toEqual({ exists: 2, correctPosition: 1 });
	});

	it('counts digits that exist but are all in the wrong position', () => {
		// Every guessed digit exists in the secret, but none share a position.
		expect(scoreGuess([7, 2, 4, 9], [2, 4, 9, 7])).toEqual({ exists: 4, correctPosition: 0 });
	});

	it('is order-independent for "exists" — reversing the guess changes correctPosition, not exists', () => {
		const forward = scoreGuess([1, 2, 3, 4], [1, 2, 3, 4]);
		const reversed = scoreGuess([1, 2, 3, 4], [4, 3, 2, 1]);
		expect(forward.exists).toBe(reversed.exists);
		expect(reversed.correctPosition).toBe(0);
	});

	it.each([
		['wrong length secret', [1, 2, 3], [1, 2, 3, 4]],
		['wrong length guess', [1, 2, 3, 4], [1, 2, 3]],
		['zero in secret', [0, 2, 3, 4], [1, 2, 3, 4]],
		['digit above range', [1, 2, 3, 10], [1, 2, 3, 4]],
		['repeated digit in guess', [1, 2, 3, 4], [1, 1, 2, 3]]
	])('rejects invalid input: %s', (_label, secret, guess) => {
		expect(() => scoreGuess(secret, guess)).toThrow(InvalidCodeError);
	});
});

describe('isWinningScore', () => {
	it('is true only when correctPosition equals the code length', () => {
		expect(isWinningScore({ exists: CODE_LENGTH, correctPosition: CODE_LENGTH })).toBe(true);
		expect(isWinningScore({ exists: CODE_LENGTH, correctPosition: CODE_LENGTH - 1 })).toBe(false);
	});
});
