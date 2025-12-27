import { describe, it, expect } from 'vitest';

interface RegistryItem {
  name: string;
  type: 'registry:ui' | 'registry:lib';
  dependencies?: string[];
  registryDependencies?: string[];
}

/**
 * Resolve all dependencies for a component including nested registry dependencies
 */
function resolveDependencies(
  componentName: string,
  registry: Map<string, RegistryItem>
): RegistryItem[] {
  const resolved = new Map<string, RegistryItem>();
  const queue = [componentName];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const name = queue.shift()!;

    if (visited.has(name)) continue;
    visited.add(name);

    const item = registry.get(name);
    if (!item) continue;

    resolved.set(name, item);

    // Add registry dependencies to queue
    if (item.registryDependencies) {
      queue.push(...item.registryDependencies);
    }
  }

  return Array.from(resolved.values());
}

/**
 * Sort components by dependency order (dependencies first)
 */
function sortByDependencyOrder(components: RegistryItem[]): RegistryItem[] {
  const sorted: RegistryItem[] = [];
  const visited = new Set<string>();

  function visit(item: RegistryItem) {
    if (visited.has(item.name)) return;
    visited.add(item.name);

    // Visit dependencies first
    if (item.registryDependencies) {
      for (const depName of item.registryDependencies) {
        const dep = components.find(c => c.name === depName);
        if (dep) visit(dep);
      }
    }

    sorted.push(item);
  }

  for (const item of components) {
    visit(item);
  }

  return sorted;
}

describe('resolver', () => {
  const registry = new Map<string, RegistryItem>([
    [
      'button',
      {
        name: 'button',
        type: 'registry:ui',
        dependencies: ['class-variance-authority'],
        registryDependencies: ['utils'],
      },
    ],
    [
      'card',
      {
        name: 'card',
        type: 'registry:ui',
        registryDependencies: ['utils'],
      },
    ],
    [
      'dialog',
      {
        name: 'dialog',
        type: 'registry:ui',
        dependencies: ['@radix-ui/react-dialog'],
        registryDependencies: ['button', 'utils'],
      },
    ],
    [
      'utils',
      {
        name: 'utils',
        type: 'registry:lib',
        dependencies: ['clsx', 'tailwind-merge'],
      },
    ],
  ]);

  describe('resolveDependencies', () => {
    it('should resolve component with no dependencies', () => {
      const result = resolveDependencies('utils', registry);
      expect(result.map(r => r.name)).toMatchSnapshot();
    });

    it('should resolve component with single dependency', () => {
      const result = resolveDependencies('button', registry);
      expect(result.map(r => r.name)).toMatchSnapshot();
    });

    it('should resolve component with nested dependencies', () => {
      const result = resolveDependencies('dialog', registry);
      expect(result.map(r => r.name)).toMatchSnapshot();
    });

    it('should handle circular dependencies gracefully', () => {
      const circularRegistry = new Map(registry);
      circularRegistry.set('utils', {
        name: 'utils',
        type: 'registry:lib',
        dependencies: ['clsx', 'tailwind-merge'],
        registryDependencies: ['button'], // Creates circular dependency
      });

      const result = resolveDependencies('button', circularRegistry);
      expect(result.map(r => r.name)).toMatchSnapshot();
    });

    it('should return empty array for non-existent component', () => {
      const result = resolveDependencies('nonexistent', registry);
      expect(result).toMatchSnapshot();
    });
  });

  describe('sortByDependencyOrder', () => {
    it('should sort components by dependency order', () => {
      const components = [
        registry.get('dialog')!,
        registry.get('button')!,
        registry.get('utils')!,
      ];

      const result = sortByDependencyOrder(components);
      expect(result.map(r => r.name)).toMatchSnapshot();
    });

    it('should handle components with no dependencies', () => {
      const components = [registry.get('utils')!];
      const result = sortByDependencyOrder(components);
      expect(result.map(r => r.name)).toMatchSnapshot();
    });

    it('should maintain order for independent components', () => {
      const components = [
        registry.get('button')!,
        registry.get('card')!,
        registry.get('utils')!,
      ];

      const result = sortByDependencyOrder(components);
      expect(result.map(r => r.name)).toMatchSnapshot();
    });

    it('should handle complex dependency tree', () => {
      const result = resolveDependencies('dialog', registry);
      const sorted = sortByDependencyOrder(result);
      expect(sorted.map(r => r.name)).toMatchSnapshot();
    });
  });

  describe('dependency resolution snapshots', () => {
    it('should match complete dependency tree for dialog', () => {
      const result = resolveDependencies('dialog', registry);
      expect(result).toMatchSnapshot();
    });

    it('should match sorted dependency tree', () => {
      const resolved = resolveDependencies('dialog', registry);
      const sorted = sortByDependencyOrder(resolved);
      expect(sorted).toMatchSnapshot();
    });
  });
});
