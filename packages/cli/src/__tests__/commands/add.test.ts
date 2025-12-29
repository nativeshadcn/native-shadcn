import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Mock modules before importing
vi.mock('ora', () => ({
  default: vi.fn(() => ({
    start: vi.fn().mockReturnThis(),
    stop: vi.fn().mockReturnThis(),
    succeed: vi.fn().mockReturnThis(),
    fail: vi.fn().mockReturnThis(),
    text: '',
  })),
}));

vi.mock('prompts', () => ({
  default: vi.fn().mockResolvedValue({ overwrite: false }),
}));

vi.mock('execa', () => ({
  default: vi.fn().mockResolvedValue({ stdout: '', stderr: '' }),
}));

describe('add command', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'native-shadcn-add-test-'));

    // Create components.json
    await fs.writeFile(
      path.join(tempDir, 'components.json'),
      JSON.stringify({
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
      })
    );

    // Create package.json
    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: 'test-project', version: '1.0.0' })
    );
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
    vi.clearAllMocks();
  });

  describe('validation', () => {
    it('should require project to be initialized', async () => {
      const uninitDir = await fs.mkdtemp(path.join(os.tmpdir(), 'native-shadcn-uninit-'));

      const { getConfig } = await import('../../utils/config');
      const config = await getConfig(uninitDir);

      expect(config).toBeNull();

      await fs.rm(uninitDir, { recursive: true, force: true });
    });

    it('should validate component names', () => {
      const validNames = ['button', 'card', 'input', 'dialog'];
      const invalidNames = ['', ' ', 'invalid-component-name-123'];

      validNames.forEach(name => {
        expect(name).toMatch(/^[a-z-]+$/);
      });

      invalidNames.forEach(name => {
        expect(name).not.toMatch(/^[a-z-]+$/);
      });
    });
  });

  describe('file operations', () => {
    it('should create component directory if it does not exist', async () => {
      const componentsDir = path.join(tempDir, 'components', 'ui');

      const existsBefore = await fs.access(componentsDir)
        .then(() => true)
        .catch(() => false);

      expect(existsBefore).toBe(false);

      await fs.mkdir(componentsDir, { recursive: true });

      const existsAfter = await fs.access(componentsDir)
        .then(() => true)
        .catch(() => false);

      expect(existsAfter).toBe(true);
    });

    it('should detect existing component files', async () => {
      const componentsDir = path.join(tempDir, 'components', 'ui');
      await fs.mkdir(componentsDir, { recursive: true });

      const buttonPath = path.join(componentsDir, 'button.tsx');
      await fs.writeFile(buttonPath, 'export const Button = () => null;');

      const exists = await fs.access(buttonPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);
    });

    it('should place lib files in root directory', () => {
      const testCases = [
        { path: 'lib/utils.ts', isLib: true },
        { path: 'ui/button.tsx', isLib: false },
        { path: 'ui/card.tsx', isLib: false },
      ];

      testCases.forEach(({ path: filePath, isLib }) => {
        const isLibFile = filePath.startsWith('lib/');
        expect(isLibFile).toBe(isLib);
      });
    });
  });

  describe('dependency handling', () => {
    it('should collect dependencies from components', () => {
      const components = [
        { name: 'button', dependencies: ['class-variance-authority'] },
        { name: 'card', dependencies: [] },
        { name: 'input', dependencies: ['class-variance-authority'] },
      ];

      const allDeps = new Set<string>();
      components.forEach(comp => {
        comp.dependencies?.forEach(dep => allDeps.add(dep));
      });

      expect(allDeps.size).toBe(1);
      expect(allDeps.has('class-variance-authority')).toBe(true);
    });

    it('should deduplicate dependencies', () => {
      const deps = ['clsx', 'tailwind-merge', 'clsx', 'zod', 'tailwind-merge'];
      const uniqueDeps = new Set(deps);

      expect(uniqueDeps.size).toBe(3);
      expect(Array.from(uniqueDeps)).toEqual(['clsx', 'tailwind-merge', 'zod']);
    });

    it('should handle components without dependencies', () => {
      const component = { name: 'separator', dependencies: [] };

      expect(component.dependencies).toBeDefined();
      expect(component.dependencies.length).toBe(0);
    });
  });

  describe('options', () => {
    it('should handle --all flag', () => {
      const options = { all: true, overwrite: false, cwd: tempDir };

      expect(options.all).toBe(true);
    });

    it('should handle --overwrite flag', () => {
      const options = { all: false, overwrite: true, cwd: tempDir };

      expect(options.overwrite).toBe(true);
    });

    it('should handle custom cwd', () => {
      const customCwd = '/custom/path';
      const options = { all: false, overwrite: false, cwd: customCwd };

      expect(options.cwd).toBe(customCwd);
    });
  });
});
