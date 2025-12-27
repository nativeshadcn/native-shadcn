import { describe, it, expect } from 'vitest';

/**
 * Transform imports to use configured aliases
 */
function transformImport(importPath: string, aliases: Record<string, string>): string {
  for (const [alias, path] of Object.entries(aliases)) {
    if (importPath.startsWith(path)) {
      return importPath.replace(path, alias);
    }
  }
  return importPath;
}

/**
 * Update imports in component code
 */
function updateImports(code: string, aliases: Record<string, string>): string {
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  return code.replace(importRegex, (match, importPath) => {
    const transformed = transformImport(importPath, aliases);
    return `from '${transformed}'`;
  });
}

describe('transform-import', () => {
  const aliases = {
    '@/components': './components',
    '@/lib': './lib',
    '@/utils': './lib/utils',
  };

  describe('transformImport', () => {
    it('should transform component import with alias', () => {
      const result = transformImport('./components/ui/button', aliases);
      expect(result).toMatchSnapshot();
    });

    it('should transform lib import with alias', () => {
      const result = transformImport('./lib/utils', aliases);
      expect(result).toMatchSnapshot();
    });

    it('should transform nested component import', () => {
      const result = transformImport('./components/ui/forms/input', aliases);
      expect(result).toMatchSnapshot();
    });

    it('should not transform external package import', () => {
      const result = transformImport('react-native', aliases);
      expect(result).toMatchSnapshot();
    });

    it('should not transform relative import outside aliases', () => {
      const result = transformImport('../../../other/path', aliases);
      expect(result).toMatchSnapshot();
    });
  });

  describe('updateImports', () => {
    it('should update all imports in component code', () => {
      const code = `import React from 'react';
import { Button } from './components/ui/button';
import { cn } from './lib/utils';
import type { Config } from './lib/types';

export function MyComponent() {
  return <Button className={cn('btn')} />;
}`;

      const result = updateImports(code, aliases);
      expect(result).toMatchSnapshot();
    });

    it('should update imports with double quotes', () => {
      const code = `import { Card } from "./components/ui/card";
import { formatDate } from "./lib/utils";`;

      const result = updateImports(code, aliases);
      expect(result).toMatchSnapshot();
    });

    it('should preserve external imports', () => {
      const code = `import React from 'react';
import { View, Text } from 'react-native';
import { Button } from './components/ui/button';`;

      const result = updateImports(code, aliases);
      expect(result).toMatchSnapshot();
    });

    it('should handle mixed import styles', () => {
      const code = `import * as React from 'react';
import type { ViewProps } from 'react-native';
import { cn } from './lib/utils';
import { Button as Btn } from './components/ui/button';`;

      const result = updateImports(code, aliases);
      expect(result).toMatchSnapshot();
    });

    it('should handle multiline imports', () => {
      const code = `import {
  Card,
  CardHeader,
  CardContent
} from './components/ui/card';`;

      const result = updateImports(code, aliases);
      expect(result).toMatchSnapshot();
    });
  });
});
