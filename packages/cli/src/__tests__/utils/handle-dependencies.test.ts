import { describe, it, expect } from 'vitest';

interface Component {
  name: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
}

/**
 * Collect all npm dependencies from components
 */
function collectDependencies(components: Component[]): {
  dependencies: Set<string>;
  devDependencies: Set<string>;
} {
  const dependencies = new Set<string>();
  const devDependencies = new Set<string>();

  for (const component of components) {
    component.dependencies?.forEach(dep => dependencies.add(dep));
    component.devDependencies?.forEach(dep => devDependencies.add(dep));
  }

  return { dependencies, devDependencies };
}

/**
 * Filter out dependencies that are already installed
 */
function filterInstalledDeps(
  requiredDeps: Set<string>,
  installedDeps: Record<string, string>
): string[] {
  const toInstall: string[] = [];

  for (const dep of requiredDeps) {
    if (!(dep in installedDeps)) {
      toInstall.push(dep);
    }
  }

  return toInstall;
}

describe('handle-dependencies', () => {
  describe('collectDependencies', () => {
    it('should collect dependencies from single component', () => {
      const components: Component[] = [
        {
          name: 'button',
          dependencies: ['class-variance-authority'],
        },
      ];

      const result = collectDependencies(components);

      expect(result.dependencies.size).toBe(1);
      expect(result.dependencies.has('class-variance-authority')).toBe(true);
    });

    it('should collect dependencies from multiple components', () => {
      const components: Component[] = [
        {
          name: 'button',
          dependencies: ['class-variance-authority'],
        },
        {
          name: 'dialog',
          dependencies: ['@radix-ui/react-dialog'],
        },
      ];

      const result = collectDependencies(components);

      expect(result.dependencies.size).toBe(2);
      expect(result.dependencies.has('class-variance-authority')).toBe(true);
      expect(result.dependencies.has('@radix-ui/react-dialog')).toBe(true);
    });

    it('should deduplicate dependencies', () => {
      const components: Component[] = [
        {
          name: 'button',
          dependencies: ['class-variance-authority'],
        },
        {
          name: 'card',
          dependencies: ['class-variance-authority'],
        },
      ];

      const result = collectDependencies(components);

      expect(result.dependencies.size).toBe(1);
      expect(result.dependencies.has('class-variance-authority')).toBe(true);
    });

    it('should collect devDependencies separately', () => {
      const components: Component[] = [
        {
          name: 'button',
          dependencies: ['class-variance-authority'],
          devDependencies: ['@types/react'],
        },
      ];

      const result = collectDependencies(components);

      expect(result.dependencies.size).toBe(1);
      expect(result.devDependencies.size).toBe(1);
      expect(result.devDependencies.has('@types/react')).toBe(true);
    });

    it('should handle components without dependencies', () => {
      const components: Component[] = [
        {
          name: 'separator',
        },
      ];

      const result = collectDependencies(components);

      expect(result.dependencies.size).toBe(0);
      expect(result.devDependencies.size).toBe(0);
    });

    it('should handle empty component list', () => {
      const components: Component[] = [];

      const result = collectDependencies(components);

      expect(result.dependencies.size).toBe(0);
      expect(result.devDependencies.size).toBe(0);
    });

    it('should ignore registryDependencies', () => {
      const components: Component[] = [
        {
          name: 'dialog',
          dependencies: ['@radix-ui/react-dialog'],
          registryDependencies: ['button', 'utils'],
        },
      ];

      const result = collectDependencies(components);

      expect(result.dependencies.size).toBe(1);
      expect(result.dependencies.has('button')).toBe(false);
      expect(result.dependencies.has('utils')).toBe(false);
    });
  });

  describe('filterInstalledDeps', () => {
    it('should return deps that need installation', () => {
      const required = new Set(['clsx', 'tailwind-merge', 'zod']);
      const installed = { clsx: '2.0.0' };

      const result = filterInstalledDeps(required, installed);

      expect(result).toHaveLength(2);
      expect(result).toContain('tailwind-merge');
      expect(result).toContain('zod');
      expect(result).not.toContain('clsx');
    });

    it('should return empty array when all deps installed', () => {
      const required = new Set(['clsx', 'tailwind-merge']);
      const installed = {
        clsx: '2.0.0',
        'tailwind-merge': '2.0.0',
      };

      const result = filterInstalledDeps(required, installed);

      expect(result).toHaveLength(0);
    });

    it('should return all deps when none installed', () => {
      const required = new Set(['clsx', 'tailwind-merge']);
      const installed = {};

      const result = filterInstalledDeps(required, installed);

      expect(result).toHaveLength(2);
      expect(result).toContain('clsx');
      expect(result).toContain('tailwind-merge');
    });

    it('should handle scoped packages', () => {
      const required = new Set(['@radix-ui/react-dialog']);
      const installed = {};

      const result = filterInstalledDeps(required, installed);

      expect(result).toHaveLength(1);
      expect(result).toContain('@radix-ui/react-dialog');
    });

    it('should check exact package names', () => {
      const required = new Set(['react-native-reanimated']);
      const installed = { 'react-native': '0.72.0' }; // Different package!

      const result = filterInstalledDeps(required, installed);

      expect(result).toHaveLength(1);
      expect(result).toContain('react-native-reanimated');
    });
  });
});
