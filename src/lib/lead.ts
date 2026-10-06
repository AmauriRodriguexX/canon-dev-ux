// Envío del lead con contrato estricto (auditoría T01).
// La confirmación solo se muestra si el servidor responde JSON con `success: true` y un `id`.
// Cualquier otra respuesta (HTML, texto, 200 sin éxito, error de red) se trata como fallo.

import { PUBLIC_LEAD_ENDPOINT } from '$app/env/public';
import { getAttribution } from './analytics';

export interface LeadPayload {
	name: string;
	email: string;
	phone: string;
	state: string;
	family: string;
	model: string;
	company?: string;
	printType?: string;
	message?: string;
	consent: boolean;
	marketing: boolean;
}

export type LeadResult =
	| { status: 'accepted'; id: string }
	| { status: 'preview' }
	| { status: 'rejected'; code: string };

/** Endpoint del CRM/backend. Sin configurar, el formulario funciona en modo vista previa y lo dice. */
export const leadEndpoint = PUBLIC_LEAD_ENDPOINT;

export async function submitLead(data: LeadPayload, formId: string, idempotencyKey: string): Promise<LeadResult> {
	if (!leadEndpoint) return { status: 'preview' };

	const body = {
		...data,
		form_id: formId,
		submitted_at: new Date().toISOString(),
		...getAttribution()
	};

	let res: Response;
	try {
		res = await fetch(leadEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Idempotency-Key': idempotencyKey },
			body: JSON.stringify(body)
		});
	} catch {
		return { status: 'rejected', code: 'network' };
	}

	if (!res.ok) return { status: 'rejected', code: `http_${res.status}` };
	if (!(res.headers.get('content-type') || '').includes('application/json')) {
		return { status: 'rejected', code: 'unexpected_content_type' };
	}

	try {
		const json = await res.json();
		if (json && json.success === true && typeof json.id === 'string' && json.id) {
			return { status: 'accepted', id: json.id };
		}
		return { status: 'rejected', code: 'not_confirmed' };
	} catch {
		return { status: 'rejected', code: 'invalid_json' };
	}
}
