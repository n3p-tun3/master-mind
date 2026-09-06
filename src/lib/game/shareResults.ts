import { CODE_LENGTH, type Score } from './rules';

const GAME_URL = 'https://krackthekode.vercel.app';

function scoreToEmoji(score: Score): string {
	const wrongPosition = score.exists - score.correctPosition;
	const empty = CODE_LENGTH - score.exists;
	return '🎯'.repeat(score.correctPosition) + '🔵'.repeat(wrongPosition) + '⚪'.repeat(empty);
}

export function generateShareText(
	scores: Score[],
	dayNumber: number,
	won: boolean,
	maxAttempts: number
): string {
	const result = won ? `${scores.length}/${maxAttempts}` : `X/${maxAttempts}`;
	const grid = scores.map(scoreToEmoji).join('\n');
	return `KrackTheKode Daily #${dayNumber} ${result}\n\n${grid}\n\n${GAME_URL}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return true;
		}
		// Fallback for non-secure contexts / older browsers without the async Clipboard API.
		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.left = '-9999px';
		document.body.appendChild(textarea);
		textarea.focus();
		textarea.select();
		const ok = document.execCommand('copy');
		textarea.remove();
		return ok;
	} catch {
		return false;
	}
}
