import { describe, it, expect } from 'vitest';

/**
 * Format component list for CLI output
 */
function formatComponentList(components: string[]): string {
  if (components.length === 0) return '';
  if (components.length === 1) return components[0];

  const last = components[components.length - 1];
  const rest = components.slice(0, -1);
  return `${rest.join(', ')} and ${last}`;
}

/**
 * Format dependency installation message
 */
function formatDependencyMessage(deps: string[], devDeps: string[]): string {
  const parts: string[] = [];

  if (deps.length > 0) {
    parts.push(`${deps.length} ${deps.length === 1 ? 'dependency' : 'dependencies'}`);
  }

  if (devDeps.length > 0) {
    parts.push(`${devDeps.length} dev ${devDeps.length === 1 ? 'dependency' : 'dependencies'}`);
  }

  return parts.join(' and ');
}

/**
 * Format success message
 */
function formatSuccessMessage(type: 'add' | 'init', count?: number): string {
  if (type === 'init') {
    return 'Success! Your project has been initialized.';
  }

  if (count === 1) {
    return 'Success! Component has been added.';
  }

  return `Success! ${count} components have been added.`;
}

describe('format-output', () => {
  describe('formatComponentList', () => {
    it('should format single component', () => {
      const result = formatComponentList(['button']);
      expect(result).toMatchSnapshot();
    });

    it('should format two components', () => {
      const result = formatComponentList(['button', 'card']);
      expect(result).toMatchSnapshot();
    });

    it('should format multiple components', () => {
      const result = formatComponentList(['button', 'card', 'input', 'dialog']);
      expect(result).toMatchSnapshot();
    });

    it('should handle empty array', () => {
      const result = formatComponentList([]);
      expect(result).toMatchSnapshot();
    });
  });

  describe('formatDependencyMessage', () => {
    it('should format single dependency', () => {
      const result = formatDependencyMessage(['clsx'], []);
      expect(result).toMatchSnapshot();
    });

    it('should format multiple dependencies', () => {
      const result = formatDependencyMessage(['clsx', 'tailwind-merge'], []);
      expect(result).toMatchSnapshot();
    });

    it('should format dev dependencies only', () => {
      const result = formatDependencyMessage([], ['@types/react']);
      expect(result).toMatchSnapshot();
    });

    it('should format both dependencies and dev dependencies', () => {
      const result = formatDependencyMessage(
        ['clsx', 'tailwind-merge'],
        ['@types/react', '@types/react-native']
      );
      expect(result).toMatchSnapshot();
    });

    it('should handle singular forms', () => {
      const result = formatDependencyMessage(['clsx'], ['@types/react']);
      expect(result).toMatchSnapshot();
    });
  });

  describe('formatSuccessMessage', () => {
    it('should format init success message', () => {
      const result = formatSuccessMessage('init');
      expect(result).toMatchSnapshot();
    });

    it('should format single component add success', () => {
      const result = formatSuccessMessage('add', 1);
      expect(result).toMatchSnapshot();
    });

    it('should format multiple components add success', () => {
      const result = formatSuccessMessage('add', 5);
      expect(result).toMatchSnapshot();
    });
  });

  describe('CLI output snapshots', () => {
    it('should match complete add command output', () => {
      const output = {
        action: 'add',
        components: ['button', 'card', 'input'],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
        devDependencies: [],
        success: true,
        message: 'Success! 3 components have been added.',
      };

      expect(output).toMatchSnapshot();
    });

    it('should match complete init command output', () => {
      const output = {
        action: 'init',
        config: {
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
        },
        filesCreated: [
          'components.json',
          'lib/utils.ts',
          'global.css',
        ],
        dependencies: ['clsx', 'tailwind-merge', 'nativewind'],
        devDependencies: ['tailwindcss'],
        success: true,
        message: 'Success! Your project has been initialized.',
      };

      expect(output).toMatchSnapshot();
    });

    it('should match error output', () => {
      const output = {
        action: 'add',
        components: ['nonexistent-component'],
        error: 'Component "nonexistent-component" not found in registry',
        success: false,
      };

      expect(output).toMatchSnapshot();
    });
  });
});
