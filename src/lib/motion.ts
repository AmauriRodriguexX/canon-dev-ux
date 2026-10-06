import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EXPO = 'expo.out';
let lenis: Lenis | null = null;

export const reducedMotion = () =>
	typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Desplaza a un elemento usando Lenis cuando está activo (evita que choque con el scroll nativo). */
export function scrollToEl(el: Element, offset = -88) {
	if (lenis) lenis.scrollTo(el as HTMLElement, { offset, duration: 1.2 });
	else el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

export function initMotion(): () => void {
	const reduce = reducedMotion();
	const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
	const cleanups: (() => void)[] = [];

	if (!reduce) {
		lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
		lenis.on('scroll', ScrollTrigger.update);
		const tick = (t: number) => lenis?.raf(t * 1000);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);
		cleanups.push(() => {
			gsap.ticker.remove(tick);
			lenis?.destroy();
			lenis = null;
		});
	}

	const ctx = gsap.context(() => {
		if (reduce) return;

		// Títulos por líneas con máscara
		document.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
			SplitText.create(el, {
				type: 'lines',
				mask: 'lines',
				autoSplit: true,
				onSplit: (self) =>
					gsap.from(self.lines, {
						yPercent: 115,
						duration: 1.2,
						ease: EXPO,
						stagger: 0.08,
						delay: Number(el.dataset.delay || 0),
						scrollTrigger: el.dataset.now === undefined ? { trigger: el, start: 'top 88%', once: true } : undefined
					})
			});
		});

		// Aparición simple
		document.querySelectorAll<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
			gsap.from(el, {
				opacity: 0,
				y: 32,
				duration: 1.1,
				ease: EXPO,
				delay: Number(el.dataset.delay || 0),
				scrollTrigger: el.dataset.now === undefined ? { trigger: el, start: 'top 90%', once: true } : undefined
			});
		});

		// Máscara de imagen
		document.querySelectorAll<HTMLElement>('[data-reveal="mask"]').forEach((el) => {
			const media = el.querySelector('img');
			const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
			tl.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: EXPO });
			if (media) tl.fromTo(media, { scale: 1.2 }, { scale: 1, duration: 1.8, ease: EXPO }, 0);
		});

		// Grupos escalonados
		document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
			const items = Array.from(group.children);
			gsap.set(items, { opacity: 0, y: 44 });
			ScrollTrigger.batch(items, {
				start: 'top 90%',
				once: true,
				onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: EXPO, stagger: 0.09 })
			});
		});

		// Parallax
		document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
			const amount = Number(el.dataset.parallax || 12);
			gsap.fromTo(
				el,
				{ yPercent: -amount },
				{
					yPercent: amount,
					ease: 'none',
					scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true }
				}
			);
		});

		// Texto horizontal ligado al scroll
		document.querySelectorAll<HTMLElement>('[data-drift]').forEach((el) => {
			const dir = el.dataset.drift === 'right' ? 1 : -1;
			gsap.fromTo(
				el,
				{ xPercent: dir > 0 ? -14 : 0 },
				{
					xPercent: dir > 0 ? 0 : -14,
					ease: 'none',
					scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
				}
			);
		});
	});
	cleanups.push(() => ctx.revert());

	// Magnético y brillo: solo con puntero fino
	if (fine && !reduce) {
		document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
			const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.45)' });
			const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.45)' });
			const move = (e: PointerEvent) => {
				const r = el.getBoundingClientRect();
				x((e.clientX - r.left - r.width / 2) * 0.22);
				y((e.clientY - r.top - r.height / 2) * 0.32);
			};
			const leave = () => (x(0), y(0));
			el.addEventListener('pointermove', move);
			el.addEventListener('pointerleave', leave);
			cleanups.push(() => (el.removeEventListener('pointermove', move), el.removeEventListener('pointerleave', leave)));
		});
	}
	if (fine) {
		document.querySelectorAll<HTMLElement>('.spot').forEach((el) => {
			const move = (e: PointerEvent) => {
				const r = el.getBoundingClientRect();
				el.style.setProperty('--mx', `${e.clientX - r.left}px`);
				el.style.setProperty('--my', `${e.clientY - r.top}px`);
			};
			el.addEventListener('pointermove', move);
			cleanups.push(() => el.removeEventListener('pointermove', move));
		});
	}

	document.fonts?.ready.then(() => ScrollTrigger.refresh());
	return () => cleanups.forEach((fn) => fn());
}
