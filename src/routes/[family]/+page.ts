import { error } from '@sveltejs/kit';
import { families, familyBySlug } from '#lib/families';

// Prerender de las tres familias
export const entries = () => families.map((f) => ({ family: f.slug }));

export const load = ({ params }) => {
	const family = familyBySlug(params.family);
	if (!family) error(404, 'Familia no encontrada');
	return { slug: family.slug };
};
