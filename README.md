# KrackTheKode

A code-breaking game in the spirit of Mastermind. Guess a four-digit code in ten tries; after each guess you learn how many of your digits are in the code and how many are in the right place.

Play it at [ktk.naolad.me](https://ktk.naolad.me).

## Modes

- **Practice**: a new random code every game.
- **Daily**: everyone gets the same code each day, one game per day, and you can share your result as a grid of scores that doesn't give the code away.

## How it's built

The game rules live in `src/lib/game/`, separate from the UI, so they can be tested directly:

- `rules.ts` validates codes and scores a guess. Codes use unique digits from 1 to 9, so "in the code" is just the overlap of the two digit sets, with no double counting.
- `generateSecret.ts` picks a code from an injectable random source.
- `dailyChallenge.ts` derives the day's code from the date with a seeded generator, reusing `generateSecret`, and remembers whether you've already played today.
- `parseGuess.ts` turns typed input into a guess or a specific error message.
- `shareResults.ts` builds the shareable result.

Each module has a Vitest file next to it. This version is a rebuild of an earlier one whose scoring was quietly wrong; the tests are there so that can't happen again.

Stack: SvelteKit, TypeScript, Tailwind CSS, Vitest, deployed on Vercel.

## Run it

```bash
pnpm install
pnpm dev
pnpm test
```

On Node 25, run the tests with `NODE_OPTIONS=--no-experimental-webstorage pnpm test`, because Node's built-in `localStorage` otherwise hides the test environment's.
