import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_LEAD_ENDPOINT: {
		public: true,
		static: true,
		description:
			'URL del backend/CRM que recibe el lead. Debe responder JSON { success: true, id }. Vacío = modo vista previa (no envía).',
		schema: (value) => value || ''
	}
});
