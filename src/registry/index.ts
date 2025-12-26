import { fetchTemplateWithRetry } from '../utils/fetcher';

/**
 * Fetches a component template from the remote registry
 *
 * All templates are now fetched on-demand from the docs site to reduce CLI bundle size.
 *
 * Bundle size reduction:
 * - Before: ~393 KB (all templates bundled)
 * - After: ~50-80 KB (no templates bundled)
 *
 * Registry URL: https://your-docs-site.com/registry/[component].json
 * Local dev: http://localhost:5173/registry/[component].json
 *
 * @param name - Component name (e.g., 'button', 'card')
 * @returns Promise<Template content as string, or null if fetch fails>
 */
export async function getTemplate(name: string): Promise<string | null> {
  return await fetchTemplateWithRetry(name);
}
