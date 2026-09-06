import { beforeEach, describe, expect, it } from 'vitest';
import {
	getDayNumber,
	getSecretForDate,
	getTodayCompletion,
	isSameDay,
	saveTodayCompletion
} from './dailyChallenge';
import { CODE_LENGTH } from './rules';

describe('getSecretForDate', () => {
	it('is deterministic — the same date always yields the same secret', () => {
		const date = new Date(2026, 5, 15);
		expect(getSecretForDate(date)).toEqual(getSecretForDate(new Date(date)));
	});

	it('produces a valid CODE_LENGTH secret with unique digits', () => {
		const secret = getSecretForDate(new Date(2026, 0, 1));
		expect(secret).toHaveLength(CODE_LENGTH);
		expect(new Set(secret).size).toBe(CODE_LENGTH);
	});

	it('differs across a sample of different days (not a hard guarantee, but should hold in practice)', () => {
		const secrets = new Set(
			Array.from({ length: 30 }, (_, i) => getSecretForDate(new Date(2026, 0, i + 1)).join(''))
		);
		expect(secrets.size).toBeGreaterThan(1);
	});
});

describe('isSameDay', () => {
	it('treats different times on the same calendar day as the same day', () => {
		const morning = new Date(2026, 5, 15, 8, 0);
		const night = new Date(2026, 5, 15, 23, 0);
		expect(isSameDay(morning, night)).toBe(true);
	});

	it('treats different calendar days as different', () => {
		expect(isSameDay(new Date(2026, 5, 15), new Date(2026, 5, 16))).toBe(false);
	});
});

describe('daily completion persistence', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('has no completion before one is saved', () => {
		expect(getTodayCompletion()).toBeNull();
	});

	it('round-trips a saved completion for today, including per-guess scores', () => {
		const scores = [
			{ exists: 2, correctPosition: 1 },
			{ exists: 4, correctPosition: 4 }
		];
		saveTodayCompletion(scores, true);
		const completion = getTodayCompletion();
		expect(completion).not.toBeNull();
		expect(completion?.won).toBe(true);
		expect(completion?.scores).toEqual(scores);
		expect(completion?.dayNumber).toBe(getDayNumber());
	});
});
