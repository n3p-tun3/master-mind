// Daily challenge: everyone gets the same secret on the same calendar day,
// derived deterministically from the date. Reuses generateSecret() with a
// seeded rng instead of a second copy of the "pick unique digits" logic.
import { generateSecret } from './generateSecret';
import type { Score } from './rules';

const DAILY_SEED_BASE = 20250101;

function seededRng(seed: number): () => number {
	let current = seed;
	return () => {
		current = (current * 9301 + 49297) % 233280;
		return current / 233280;
	};
}

export function getDayNumber(date: Date = new Date()): number {
	const dateSeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
	return dateSeed - DAILY_SEED_BASE;
}

export function getSecretForDate(date: Date = new Date()): number[] {
	return generateSecret(seededRng(getDayNumber(date)));
}

export function isSameDay(a: Date, b: Date = new Date()): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export interface DailyCompletion {
	dayNumber: number;
	date: string;
	scores: Score[];
	won: boolean;
}

function completionKey(dayNumber: number): string {
	return `daily_challenge_${dayNumber}`;
}

/** Returns today's saved completion, or null if today hasn't been played yet. */
export function getTodayCompletion(): DailyCompletion | null {
	const dayNumber = getDayNumber();
	try {
		const stored = localStorage.getItem(completionKey(dayNumber));
		if (!stored) return null;
		const data: DailyCompletion = JSON.parse(stored);
		return isSameDay(new Date(data.date)) ? data : null;
	} catch {
		return null;
	}
}

/** Persists full per-guess scores (not just a count) so the share text can be
 *  reconstructed after a page reload, not only right after finishing. */
export function saveTodayCompletion(scores: Score[], won: boolean): void {
	const dayNumber = getDayNumber();
	const data: DailyCompletion = {
		dayNumber,
		date: new Date().toISOString(),
		scores,
		won
	};
	try {
		localStorage.setItem(completionKey(dayNumber), JSON.stringify(data));
	} catch {
		// localStorage unavailable (private browsing, quota) — completion just won't persist.
	}
}
