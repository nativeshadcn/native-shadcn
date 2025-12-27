import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getRegistryUrl, getRegistryIndex, getComponent, resolveTree } from '../../registry/api';

describe('registry', () => {
  const originalRegistryUrl = process.env.REGISTRY_URL;

  beforeEach(() => {
    // Clear environment variables before each test
    delete process.env.REGISTRY_URL;
  });

  afterEach(() => {
    // Restore original REGISTRY_URL
    if (originalRegistryUrl) {
      process.env.REGISTRY_URL = originalRegistryUrl;
    }
  });

  describe('getRegistryUrl', () => {
    it('should return production registry URL', () => {
      const url = getRegistryUrl();
      expect(url).toBe('https://native-shadcn-ui.netlify.app/registry');
    });

    it('should append path when provided', () => {
      const url = getRegistryUrl('button.json');
      expect(url).toBe('https://native-shadcn-ui.netlify.app/registry/button.json');
    });

    it('should append index.json path', () => {
      const url = getRegistryUrl('index.json');
      expect(url).toBe('https://native-shadcn-ui.netlify.app/registry/index.json');
    });
  });

  describe('resolveTree', () => {
    it('should resolve component tree with dependencies', async () => {
      const mockIndex = [
        {
          name: 'button',
          type: 'registry:ui' as const,
          files: ['ui/button.tsx'],
          dependencies: ['class-variance-authority'],
          registryDependencies: ['utils'],
        },
        {
          name: 'utils',
          type: 'registry:lib' as const,
          files: ['lib/utils.ts'],
          dependencies: ['clsx', 'tailwind-merge'],
        },
      ];

      const tree = await resolveTree(mockIndex, ['button']);

      expect(tree).toHaveLength(2);
      const names = tree.map(item => item.name);
      expect(names).toContain('utils');
      expect(names).toContain('button');
    });

    it('should handle components without dependencies', async () => {
      const mockIndex = [
        {
          name: 'separator',
          type: 'registry:ui' as const,
          files: ['ui/separator.tsx'],
          dependencies: [],
        },
      ];

      const tree = await resolveTree(mockIndex, ['separator']);

      expect(tree).toHaveLength(1);
      expect(tree[0].name).toBe('separator');
    });

    it('should deduplicate dependencies', async () => {
      const mockIndex = [
        {
          name: 'button',
          type: 'registry:ui' as const,
          files: ['ui/button.tsx'],
          registryDependencies: ['utils'],
        },
        {
          name: 'card',
          type: 'registry:ui' as const,
          files: ['ui/card.tsx'],
          registryDependencies: ['utils'],
        },
        {
          name: 'utils',
          type: 'registry:lib' as const,
          files: ['lib/utils.ts'],
        },
      ];

      const tree = await resolveTree(mockIndex, ['button', 'card']);

      // utils should only appear once
      const utilsCount = tree.filter(item => item.name === 'utils').length;
      expect(utilsCount).toBe(1);
      expect(tree).toHaveLength(3);
    });

    it('should resolve nested dependencies', async () => {
      const mockIndex = [
        {
          name: 'dialog',
          type: 'registry:ui' as const,
          files: ['ui/dialog.tsx'],
          registryDependencies: ['button', 'utils'],
        },
        {
          name: 'button',
          type: 'registry:ui' as const,
          files: ['ui/button.tsx'],
          registryDependencies: ['utils'],
        },
        {
          name: 'utils',
          type: 'registry:lib' as const,
          files: ['lib/utils.ts'],
        },
      ];

      const tree = await resolveTree(mockIndex, ['dialog']);

      expect(tree).toHaveLength(3);
      expect(tree.map(item => item.name)).toContain('utils');
      expect(tree.map(item => item.name)).toContain('button');
      expect(tree.map(item => item.name)).toContain('dialog');
    });
  });
});
