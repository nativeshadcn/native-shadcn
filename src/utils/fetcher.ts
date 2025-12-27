/**
 * Get registry base URL
 */
function getRegistryUrl(path: string = ""): string {
  const baseUrl =
    import.meta.env.VITE_REGISTRY_URL || "https://native-shadcn-ui.netlify.app/registry";

  // Return full URL if path is provided
  return path ? `${baseUrl}/${path}` : baseUrl;
}

/**
 * Fetch template content from registry with retry logic
 *
 * @param name - Component name (e.g., 'button', 'card')
 * @param retries - Number of retry attempts (default: 2)
 * @returns Promise<Template content as string, or null if fetch fails>
 */
export async function fetchTemplateWithRetry(
  name: string,
  retries: number = 2
): Promise<string | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const url = getRegistryUrl(`${name}.json`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Extract template content from registry item
      if (data.files && data.files[0]?.content) {
        return data.files[0].content;
      }

      return null;
    } catch (error) {
      if (i === retries) {
        console.error(`Failed to fetch "${name}" from registry:`, error);
        console.info(`Registry URL: ${getRegistryUrl()}`);
        return null;
      } else {
        // Wait before retry with exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      }
    }
  }

  return null;
}
