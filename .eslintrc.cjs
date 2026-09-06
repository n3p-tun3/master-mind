/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				// Route <script lang="ts"> contents through @typescript-eslint/parser;
				// plain <script> blocks fall back to espree automatically.
				parser: '@typescript-eslint/parser'
			}
		},
		{
			files: ['*.ts'],
			parser: '@typescript-eslint/parser'
		},
		{
			// Ambient type declarations only — base no-unused-vars doesn't
			// understand `declare global { namespace App {} }` is load-bearing.
			files: ['src/app.d.ts'],
			rules: { 'no-unused-vars': 'off' }
		}
	]
};
