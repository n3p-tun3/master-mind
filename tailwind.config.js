/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	// Theme toggling sets data-theme="dark" on <html>, not a .dark class —
	// this must match that or every `dark:` utility silently never activates.
	darkMode: ['selector', '[data-theme="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['Space Mono', 'monospace']
			},
			animation: {
				'fade-in': 'fadeIn 0.3s ease-in-out',
				'slide-up': 'slideUp 0.2s ease-out'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(4px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			}
		}
	},
	plugins: []
};
