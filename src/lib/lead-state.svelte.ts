// Estado compartido: la familia y el equipo elegidos en cualquier CTA viajan al formulario de la página.
import { track } from './analytics';
import { scrollToEl, reducedMotion } from './motion';

export const leadState = $state({ family: '', model: '', intent: '' });

/** Lleva al formulario conservando el contexto del CTA (familia / modelo / intención). */
export function goToForm(opts: { family?: string; model?: string; intent?: string; position: string }) {
	if (opts.family !== undefined) leadState.family = opts.family;
	if (opts.model !== undefined) leadState.model = opts.model;
	if (opts.intent !== undefined) leadState.intent = opts.intent;
	track('commercial_cta_click', {
		cta_position: opts.position,
		family: leadState.family || undefined,
		model: opts.model || undefined
	});

	const form = document.getElementById('cotizar');
	if (!form) return;
	scrollToEl(form);
	// Enfoca el primer campo al terminar el desplazamiento
	window.setTimeout(
		() => document.getElementById('lead-name')?.focus({ preventScroll: true }),
		reducedMotion() ? 0 : 1100
	);
}
