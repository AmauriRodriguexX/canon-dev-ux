import { asset, resolve } from '$app/paths';

/** Prefixes static images with SvelteKit's configured deployment base path. */
export function staticUrl(path: string): string {
	return asset(path.replace(/^\/+/, ''));
}

/** Resolves one of the statically generated family routes under the deployment base path. */
export function familyUrl(slug: string): string {
	return `${resolve('/[family]', { family: slug }).replace(/\/+$/, '')}/`;
}

/** Resolves the home route under the deployment base path. */
export function homeUrl(): string {
	return resolve('/');
}
