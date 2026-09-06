import { CODE_LENGTH, MAX_DIGIT, MIN_DIGIT } from './rules';

export type ParseResult = { ok: true; digits: number[] } | { ok: false; error: string };

/**
 * Validate raw keyboard input into a scoreGuess()-ready digit array. Kept
 * separate from rules.ts so the rules module never has to deal with strings —
 * it only ever sees already-valid number arrays.
 */
export function parseGuess(raw: string): ParseResult {
	if (raw.length !== CODE_LENGTH) {
		return { ok: false, error: `Enter ${CODE_LENGTH} digits` };
	}
	if (!/^[0-9]+$/.test(raw)) {
		return { ok: false, error: 'Digits only' };
	}

	const digits = raw.split('').map(Number);

	if (digits.some((d) => d < MIN_DIGIT || d > MAX_DIGIT)) {
		return { ok: false, error: 'Zero is not allowed' };
	}
	if (new Set(digits).size !== digits.length) {
		return { ok: false, error: 'Each digit must be unique' };
	}

	return { ok: true, digits };
}
