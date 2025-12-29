import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { getConfig, createConfig, type Config } from '../../utils/config';

describe('config', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'native-shadcn-config-test-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('createConfig', () => {
    it('should create components.json with default config', async () => {
      const config: Config = {
        style: 'nativewind',
        typescript: true,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'global.css',
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      };

      await createConfig(tempDir, config);

      const configPath = path.join(tempDir, 'components.json');
      const exists = await fs.access(configPath).then(() => true).catch(() => false);
      expect(exists).toBe(true);

      const content = await fs.readFile(configPath, 'utf-8');
      const parsed = JSON.parse(content);

      expect(parsed.style).toBe('nativewind');
      expect(parsed.typescript).toBe(true);
      expect(parsed.tailwind.config).toBe('tailwind.config.js');
      expect(parsed.aliases.components).toBe('@/components');
    });

    it('should create config with TypeScript disabled', async () => {
      const config: Config = {
        style: 'nativewind',
        typescript: false,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'global.css',
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      };

      await createConfig(tempDir, config);

      const configPath = path.join(tempDir, 'components.json');
      const content = await fs.readFile(configPath, 'utf-8');
      const parsed = JSON.parse(content);

      expect(parsed.typescript).toBe(false);
    });

    it('should create config with custom aliases', async () => {
      const config: Config = {
        style: 'nativewind',
        typescript: true,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'global.css',
        },
        aliases: {
          components: '~/components',
          utils: '~/utils',
        },
      };

      await createConfig(tempDir, config);

      const configPath = path.join(tempDir, 'components.json');
      const content = await fs.readFile(configPath, 'utf-8');
      const parsed = JSON.parse(content);

      expect(parsed.aliases.components).toBe('~/components');
      expect(parsed.aliases.utils).toBe('~/utils');
    });

    it('should overwrite existing config', async () => {
      const oldConfig: Config = {
        style: 'nativewind',
        typescript: false,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'global.css',
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      };

      await createConfig(tempDir, oldConfig);

      const newConfig: Config = {
        ...oldConfig,
        typescript: true,
      };

      await createConfig(tempDir, newConfig);

      const configPath = path.join(tempDir, 'components.json');
      const content = await fs.readFile(configPath, 'utf-8');
      const parsed = JSON.parse(content);

      expect(parsed.typescript).toBe(true);
    });
  });

  describe('getConfig', () => {
    it('should read existing config', async () => {
      const config: Config = {
        style: 'nativewind',
        typescript: true,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'global.css',
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      };

      await createConfig(tempDir, config);

      const readConfig = await getConfig(tempDir);

      expect(readConfig).toBeDefined();
      expect(readConfig?.typescript).toBe(true);
      expect(readConfig?.style).toBe('nativewind');
    });

    it('should return null when config does not exist', async () => {
      const config = await getConfig(tempDir);
      expect(config).toBeNull();
    });

    it('should handle invalid JSON gracefully', async () => {
      const configPath = path.join(tempDir, 'components.json');
      await fs.writeFile(configPath, 'invalid json{{{');

      const config = await getConfig(tempDir);
      expect(config).toBeNull();
    });

    it('should read config with all fields', async () => {
      const config: Config = {
        style: 'nativewind',
        typescript: true,
        tailwind: {
          config: 'custom-tailwind.config.js',
          css: 'custom-global.css',
        },
        aliases: {
          components: '~/my-components',
          utils: '~/my-utils',
        },
      };

      await createConfig(tempDir, config);

      const readConfig = await getConfig(tempDir);

      expect(readConfig?.tailwind.config).toBe('custom-tailwind.config.js');
      expect(readConfig?.tailwind.css).toBe('custom-global.css');
      expect(readConfig?.aliases.components).toBe('~/my-components');
      expect(readConfig?.aliases.utils).toBe('~/my-utils');
    });
  });
});
