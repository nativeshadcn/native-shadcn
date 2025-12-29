import { describe, it, expect } from 'vitest';

interface Config {
  style: string;
  typescript: boolean;
  tailwind: {
    config: string;
    css: string;
  };
  aliases: {
    components: string;
    utils: string;
    [key: string]: string;
  };
}

/**
 * Validate config structure
 */
function validateConfig(config: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.style) {
    errors.push('style is required');
  } else if (config.style !== 'nativewind') {
    errors.push('style must be "nativewind"');
  }

  if (typeof config.typescript !== 'boolean') {
    errors.push('typescript must be a boolean');
  }

  if (!config.tailwind) {
    errors.push('tailwind config is required');
  } else {
    if (!config.tailwind.config) {
      errors.push('tailwind.config is required');
    }
    if (!config.tailwind.css) {
      errors.push('tailwind.css is required');
    }
  }

  if (!config.aliases) {
    errors.push('aliases are required');
  } else {
    if (!config.aliases.components) {
      errors.push('aliases.components is required');
    }
    if (!config.aliases.utils) {
      errors.push('aliases.utils is required');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Normalize alias path
 */
function normalizeAlias(alias: string): string {
  // Remove trailing slash
  alias = alias.replace(/\/$/, '');

  // Ensure it starts with @ or ~ or ./
  if (!alias.startsWith('@') && !alias.startsWith('~') && !alias.startsWith('.')) {
    alias = `./${alias}`;
  }

  return alias;
}

describe('validate-config', () => {
  describe('validateConfig', () => {
    it('should validate correct config', () => {
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

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });

    it('should reject config without style', () => {
      const config = {
        typescript: true,
        tailwind: { config: 'tailwind.config.js', css: 'global.css' },
        aliases: { components: '@/components', utils: '@/lib/utils' },
      };

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });

    it('should reject config with invalid style', () => {
      const config = {
        style: 'styled-components',
        typescript: true,
        tailwind: { config: 'tailwind.config.js', css: 'global.css' },
        aliases: { components: '@/components', utils: '@/lib/utils' },
      };

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });

    it('should reject config without typescript field', () => {
      const config = {
        style: 'nativewind',
        tailwind: { config: 'tailwind.config.js', css: 'global.css' },
        aliases: { components: '@/components', utils: '@/lib/utils' },
      };

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });

    it('should reject config without tailwind config', () => {
      const config = {
        style: 'nativewind',
        typescript: true,
        aliases: { components: '@/components', utils: '@/lib/utils' },
      };

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });

    it('should reject config without aliases', () => {
      const config = {
        style: 'nativewind',
        typescript: true,
        tailwind: { config: 'tailwind.config.js', css: 'global.css' },
      };

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });

    it('should reject config with missing alias fields', () => {
      const config = {
        style: 'nativewind',
        typescript: true,
        tailwind: { config: 'tailwind.config.js', css: 'global.css' },
        aliases: { components: '@/components' }, // missing utils
      };

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });

    it('should collect multiple errors', () => {
      const config = {
        style: 'invalid',
        // missing typescript
        // missing tailwind
        // missing aliases
      };

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });
  });

  describe('normalizeAlias', () => {
    it('should normalize @/ prefix', () => {
      const result = normalizeAlias('@/components');
      expect(result).toMatchSnapshot();
    });

    it('should normalize ~/ prefix', () => {
      const result = normalizeAlias('~/components');
      expect(result).toMatchSnapshot();
    });

    it('should normalize relative path', () => {
      const result = normalizeAlias('./components');
      expect(result).toMatchSnapshot();
    });

    it('should add ./ prefix to plain path', () => {
      const result = normalizeAlias('components');
      expect(result).toMatchSnapshot();
    });

    it('should remove trailing slash', () => {
      const result = normalizeAlias('@/components/');
      expect(result).toMatchSnapshot();
    });

    it('should handle nested paths', () => {
      const result = normalizeAlias('@/components/ui');
      expect(result).toMatchSnapshot();
    });
  });

  describe('config validation snapshots', () => {
    it('should match valid TypeScript Expo config', () => {
      const config = {
        style: 'nativewind',
        typescript: true,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'app/styles/global.css',
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
          ui: '@/components/ui',
        },
      };

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });

    it('should match valid JavaScript config', () => {
      const config = {
        style: 'nativewind',
        typescript: false,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'global.css',
        },
        aliases: {
          components: '~/components',
          utils: '~/lib/utils',
        },
      };

      const result = validateConfig(config);
      expect(result).toMatchSnapshot();
    });
  });
});
