import https from "https";
import http from "http";
import { HttpsProxyAgent } from "https-proxy-agent";
import { logger } from "../utils/logger";
import {
  registryItemSchema,
  registryIndexSchema,
  type RegistryItem,
  type RegistryIndex,
} from "./schema";

// Registry cache to prevent duplicate fetches
const registryCache = new Map<string, Promise<any>>();

/**
 * Get registry base URL
 */
function getRegistryUrl(path: string = ""): string {
  const baseUrl =
    process.env.REGISTRY_URL || "https://native-shadcn-ui.netlify.app/registry";

  // Return full URL if path is provided
  return path ? `${baseUrl}/${path}` : baseUrl;
}

/**
 * Check if string is a URL
 */
function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetch from registry with caching
 */
async function fetchRegistry(paths: string[]): Promise<any[]> {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const url = isUrl(path) ? path : getRegistryUrl(path);

        // Return cached promise if exists
        if (registryCache.has(url)) {
          return registryCache.get(url);
        }

        // Create fetch promise
        const fetchPromise = new Promise((resolve, reject) => {
          const protocol = url.startsWith("https") ? https : http;
          const options: any = {};

          // Add proxy agent if https_proxy is set
          if (process.env.https_proxy && protocol === https) {
            options.agent = new HttpsProxyAgent(process.env.https_proxy);
          }

          const request = protocol.get(url, options, (res) => {
            let data = "";

            // Handle non-200 responses
            if (res.statusCode === 401) {
              reject(new Error("Unauthorized. Check your registry credentials."));
              return;
            }

            if (res.statusCode === 403) {
              reject(new Error("Forbidden. Access denied to registry."));
              return;
            }

            if (res.statusCode === 404) {
              reject(new Error(`Not found: ${path}`));
              return;
            }

            if (res.statusCode !== 200) {
              reject(new Error(`Failed to fetch: ${res.statusCode}`));
              return;
            }

            res.on("data", (chunk) => {
              data += chunk;
            });

            res.on("end", () => {
              try {
                resolve(JSON.parse(data));
              } catch (error) {
                reject(new Error("Failed to parse JSON response"));
              }
            });
          });

          request.on("error", (error) => {
            reject(error);
          });

          request.setTimeout(10000, () => {
            request.destroy();
            reject(new Error("Request timeout"));
          });
        });

        // Cache the promise
        registryCache.set(url, fetchPromise);

        return fetchPromise;
      })
    );

    return results;
  } catch (error) {
    throw error;
  }
}

/**
 * Get registry index
 */
export async function getRegistryIndex(): Promise<RegistryIndex> {
  try {
    const [result] = await fetchRegistry(["index.json"]);
    return registryIndexSchema.parse(result);
  } catch (error) {
    logger.error("Failed to fetch registry index");
    throw error;
  }
}

/**
 * Get registry item
 * Note: Native-shadcn doesn't use styles, so we just fetch by name
 */
export async function getRegistryItem(name: string): Promise<RegistryItem> {
  try {
    const path = isUrl(name) ? name : `${name}.json`;
    const [result] = await fetchRegistry([path]);
    return registryItemSchema.parse(result);
  } catch (error) {
    logger.error(`Failed to fetch component: ${name}`);
    throw error;
  }
}

/**
 * Resolve component dependency tree (matches shadcn/ui approach)
 * Searches in-memory index for faster resolution
 */
export async function resolveTree(
  index: RegistryIndex,
  names: string[]
): Promise<RegistryItem[]> {
  const tree: RegistryItem[] = [];

  for (const name of names) {
    // Find entry in the index
    const entry = index.find((item) => item.name === name);

    if (!entry) {
      logger.warn(`Component "${name}" not found in registry`);
      continue;
    }

    tree.push(entry);

    // Recursively resolve registry dependencies
    if (entry.registryDependencies && entry.registryDependencies.length > 0) {
      const dependencies = await resolveTree(index, entry.registryDependencies);
      tree.push(...dependencies);
    }
  }

  // Deduplicate by name (in case of complex dependency trees)
  return tree.filter(
    (item, index, self) => index === self.findIndex((t) => t.name === item.name)
  );
}

/**
 * Helper: Get component by name
 */
export async function getComponent(
  name: string
): Promise<RegistryItem | undefined> {
  try {
    return await getRegistryItem(name);
  } catch {
    return undefined;
  }
}

/**
 * Helper: Get all components
 */
export async function getAllComponents(): Promise<RegistryItem[]> {
  try {
    return await getRegistryIndex();
  } catch {
    return [];
  }
}

/**
 * Helper: Fetch template content from component
 */
export async function fetchTemplateWithRetry(
  name: string,
  retries: number = 2
): Promise<string | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const item = await getRegistryItem(name);
      if (item.files && item.files[0]?.content) {
        return item.files[0].content;
      }
    } catch (error) {
      if (i === retries) {
        logger.error(`Failed to fetch "${name}" from registry`);
        logger.info(`Registry URL: ${getRegistryUrl()}`);
      } else {
        // Wait before retry
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      }
    }
  }

  return null;
}
