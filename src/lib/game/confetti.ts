// Small DOM-particle confetti burst. Relies on the `confetti-fall` keyframe
// defined in app.css. Deliberately not a library — this is the entire effect.
const COLORS = ['#f87171', '#fb923c', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];

export function celebrate(particleCount = 50): void {
	// The win banner already communicates the result on its own — confetti is
	// purely decorative, so under reduced motion it's skipped rather than
	// replaced with a substitute.
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	for (let i = 0; i < particleCount; i++) {
		setTimeout(() => {
			const particle = document.createElement('div');
			particle.style.position = 'fixed';
			particle.style.left = `${Math.random() * window.innerWidth}px`;
			particle.style.top = '-10px';
			particle.style.width = '10px';
			particle.style.height = '10px';
			particle.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
			particle.style.borderRadius = '50%';
			particle.style.pointerEvents = 'none';
			particle.style.zIndex = '9999';
			particle.style.animation = 'confetti-fall 3s linear forwards';
			document.body.appendChild(particle);
			setTimeout(() => particle.remove(), 3000);
		}, i * 20);
	}
}
