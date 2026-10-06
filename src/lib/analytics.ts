// Instrumentación del embudo comercial (auditoría §11).
// Nunca se envían valores capturados (nombre, correo, teléfono, mensaje): solo códigos y contexto.

type Params = Record<string, string | number | boolean | undefined>;

declare global {
	interface Window {
		dataLayer?: Record<string, unknown>[];
	}
}

const seen = new Set<string>();

export function track(event: string, params: Params = {}) {
	if (typeof window === 'undefined') return;
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event, ...params });
	if (import.meta.env.DEV) console.debug('[track]', event, params);
}

/** Igual que track, pero una sola vez por clave y sesión de página (p. ej. exposición de un CTA). */
export function trackOnce(key: string, event: string, params: Params = {}) {
	if (seen.has(key)) return;
	seen.add(key);
	track(event, params);
}

const ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid'];
const STORE = 'canon_arizona_attribution';

/** Conserva el origen de campaña de la primera llegada en la sesión (auditoría T04). */
export function captureAttribution() {
	if (typeof window === 'undefined') return;
	try {
		if (sessionStorage.getItem(STORE)) return;
		const url = new URL(window.location.href);
		const data: Record<string, string> = {
			landing_url: url.origin + url.pathname,
			referrer: document.referrer || ''
		};
		for (const k of ATTR_KEYS) {
			const v = url.searchParams.get(k);
			if (v) data[k] = v;
		}
		sessionStorage.setItem(STORE, JSON.stringify(data));
	} catch {
		/* almacenamiento no disponible: se omite la atribución */
	}
}

export function getAttribution(): Record<string, string> {
	try {
		return JSON.parse(sessionStorage.getItem(STORE) || '{}');
	} catch {
		return {};
	}
}
