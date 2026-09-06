import { describe, expect, it } from 'vitest';
import { generateShareText } from './shareResults';
import type { Score } from './rules';

describe('generateShareText', () => {
	it('renders a won result with the correct emoji grid', () => {
		const scores: Score[] = [
			{ exists: 2, correctPosition: 1 },
			{ exists: 4, correctPosition: 4 }
		];
		const text = generateShareText(scores, 42, true, 10);

		expect(text).toContain('KrackTheKode Daily #42 2/10');
		expect(text).toContain('🎯🔵⚪⚪'); // 1 correct, 1 exists-wrong-spot, 2 empty
		expect(text).toContain('🎯🎯🎯🎯'); // fully solved row
		expect(text).toContain('https://krackthekode.vercel.app');
	});

	it('renders a loss as X/max', () => {
		const text = generateShareText([{ exists: 1, correctPosition: 0 }], 42, false, 10);
		expect(text).toContain('KrackTheKode Daily #42 X/10');
	});
});
