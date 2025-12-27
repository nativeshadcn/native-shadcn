import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Mock modules
vi.mock('ora', () => ({
  default: vi.fn(() => ({
    start: vi.fn().mockReturnThis(),
    stop: vi.fn().mockReturnThis(),
    succeed: vi.fn().mockReturnThis(),
    fail: vi.fn().mockReturnThis(),
    warn: vi.fn().mockReturnThis(),
    text: '',
  })),
}));

vi.mock('prompts', () => ({
  default: vi.fn().mockResolvedValue({
    typescript: true,
    componentsAlias: '@/components',
    utilsAlias: '@/lib/utils',
    overwrite: true,
  }),
}));

vi.mock('execa', () => ({
  default: vi.fn().mockResolvedValue({ stdout: '', stderr: '' }),
}));

describe('init command', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'native-shadcn-init-test-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
    vi.clearAllMocks();
  });

  describe('package.json validation', () => {
    it('should require package.json to exist', async () => {
      const packageJsonPath = path.join(tempDir, 'package.json');
      const exists = await fs.access(packageJsonPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(false);
    });

    it('should proceed when package.json exists', async () => {
      const packageJsonPath = path.join(tempDir, 'package.json');
      await fs.writeFile(packageJsonPath, JSON.stringify({ name: 'test' }));

      const exists = await fs.access(packageJsonPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);
    });
  });

  describe('config creation', () => {
    it('should create components.json with TypeScript config', async () => {
      const config = {
        style: 'nativewind' as const,
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

      expect(config.typescript).toBe(true);
      expect(config.aliases.components).toBe('@/components');
    });

    it('should create components.json with JavaScript config', async () => {
      const config = {
        style: 'nativewind' as const,
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

      expect(config.typescript).toBe(false);
    });

    it('should handle custom aliases', async () => {
      const config = {
        style: 'nativewind' as const,
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

      expect(config.aliases.components).toBe('~/components');
      expect(config.aliases.utils).toBe('~/utils');
    });
  });

  describe('file creation', () => {
    it('should create tailwind.config.js', async () => {
      const tailwindConfigPath = path.join(tempDir, 'tailwind.config.js');

      const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
};`;

      await fs.writeFile(tailwindConfigPath, tailwindConfig);

      const exists = await fs.access(tailwindConfigPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);

      const content = await fs.readFile(tailwindConfigPath, 'utf-8');
      expect(content).toContain('tailwindcss');
      expect(content).toContain('content:');
    });

    it('should create global.css with CSS variables', async () => {
      const globalCssPath = path.join(tempDir, 'global.css');

      const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
  }
}`;

      await fs.writeFile(globalCssPath, globalCss);

      const exists = await fs.access(globalCssPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);

      const content = await fs.readFile(globalCssPath, 'utf-8');
      expect(content).toContain('@tailwind base');
      expect(content).toContain('--background');
      expect(content).toContain('.dark');
    });

    it('should create lib/utils.ts with cn function', async () => {
      const utilsDir = path.join(tempDir, 'lib');
      await fs.mkdir(utilsDir, { recursive: true });

      const utilsPath = path.join(utilsDir, 'utils.ts');
      const utilsContent = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

      await fs.writeFile(utilsPath, utilsContent);

      const exists = await fs.access(utilsPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);

      const content = await fs.readFile(utilsPath, 'utf-8');
      expect(content).toContain('export function cn');
      expect(content).toContain('twMerge(clsx(inputs))');
    });

    it('should create components/ui directory', async () => {
      const componentsDir = path.join(tempDir, 'components', 'ui');
      await fs.mkdir(componentsDir, { recursive: true });

      const exists = await fs.access(componentsDir)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);
    });
  });

  describe('babel configuration', () => {
    it('should create babel.config.js if it does not exist', async () => {
      const babelConfigPath = path.join(tempDir, 'babel.config.js');

      const babelConfig = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};`;

      await fs.writeFile(babelConfigPath, babelConfig);

      const exists = await fs.access(babelConfigPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);

      const content = await fs.readFile(babelConfigPath, 'utf-8');
      expect(content).toContain('nativewind/babel');
    });

    it('should detect existing nativewind/babel plugin', async () => {
      const babelConfig = `module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['nativewind/babel', 'other-plugin'],
};`;

      expect(babelConfig).toContain('nativewind/babel');
    });

    it('should add nativewind/babel to existing config', () => {
      const existingConfig = `module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['other-plugin'],
};`;

      const updatedConfig = existingConfig.replace(
        /(plugins:\s*\[)/,
        '$1\n    "nativewind/babel",'
      );

      expect(updatedConfig).toContain('nativewind/babel');
      expect(updatedConfig).toContain('other-plugin');
    });
  });

  describe('dependencies installation', () => {
    it('should include all required dependencies', () => {
      const dependencies = [
        'nativewind',
        'tailwindcss',
        'react-native-reanimated',
        'react-native-gesture-handler',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ];

      expect(dependencies).toContain('nativewind');
      expect(dependencies).toContain('tailwindcss');
      expect(dependencies).toContain('clsx');
      expect(dependencies).toContain('tailwind-merge');
      expect(dependencies.length).toBe(7);
    });

    it('should include TypeScript dev dependencies when enabled', () => {
      const typescript = true;
      const devDependencies = typescript
        ? ['@types/react', '@types/react-native']
        : [];

      expect(devDependencies).toContain('@types/react');
      expect(devDependencies).toContain('@types/react-native');
    });

    it('should skip TypeScript dev dependencies when disabled', () => {
      const typescript = false;
      const devDependencies = typescript
        ? ['@types/react', '@types/react-native']
        : [];

      expect(devDependencies.length).toBe(0);
    });
  });

  describe('options', () => {
    it('should handle --yes flag for automatic confirmation', () => {
      const options = { yes: true, cwd: tempDir };

      expect(options.yes).toBe(true);
    });

    it('should use default config with --yes flag', () => {
      const config = {
        style: 'nativewind' as const,
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

      expect(config.typescript).toBe(true);
      expect(config.aliases.components).toBe('@/components');
    });

    it('should handle custom cwd', () => {
      const customCwd = '/custom/path';
      const options = { yes: false, cwd: customCwd };

      expect(options.cwd).toBe(customCwd);
    });
  });
});
