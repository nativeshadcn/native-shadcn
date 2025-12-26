import { cosmiconfig } from 'cosmiconfig';
import { z } from 'zod';
import path from 'path';
import fs from 'fs/promises';

const configSchema = z.object({
  style: z.enum(['nativewind']).default('nativewind'),
  typescript: z.boolean().default(true),
  tailwind: z.object({
    config: z.string().default('tailwind.config.js'),
    css: z.string().default('global.css'),
  }),
  aliases: z.object({
    components: z.string().default('@/components'),
    utils: z.string().default('@/lib/utils'),
  }),
});

export type Config = z.infer<typeof configSchema>;

const explorer = cosmiconfig('native-shadcn', {
  searchPlaces: [
    'native-shadcn.json',
    'native-shadcn.config.json',
    'components.json',
  ],
});

export async function getConfig(cwd: string): Promise<Config | null> {
  try {
    const result = await explorer.search(cwd);
    if (!result) return null;
    return configSchema.parse(result.config);
  } catch (error) {
    return null;
  }
}

export async function createConfig(cwd: string, config: Config): Promise<void> {
  const configPath = path.join(cwd, 'components.json');
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));
}

export async function resolveConfigPath(cwd: string, configPath: string): Promise<string> {
  return path.resolve(cwd, configPath);
}
