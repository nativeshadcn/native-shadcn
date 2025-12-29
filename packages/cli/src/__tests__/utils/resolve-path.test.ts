import { describe, it, expect } from 'vitest';
import path from 'path';

/**
 * Resolve component target path based on type
 */
function resolveComponentPath(
  cwd: string,
  componentPath: string,
  type: 'registry:ui' | 'registry:lib'
): string {
  const isLibFile = type === 'registry:lib' || componentPath.startsWith('lib/');

  if (isLibFile) {
    // lib files go to root
    return path.resolve(cwd, componentPath);
  } else {
    // UI components go to components/
    return path.resolve(cwd, 'components', componentPath);
  }
}

describe('resolve-path', () => {
  const cwd = '/Users/test/my-app';

  describe('resolveComponentPath', () => {
    it('should resolve UI component to components directory', () => {
      const result = resolveComponentPath(cwd, 'ui/button.tsx', 'registry:ui');
      expect(result).toBe(path.resolve(cwd, 'components', 'ui/button.tsx'));
    });

    it('should resolve lib file to root directory', () => {
      const result = resolveComponentPath(cwd, 'lib/utils.ts', 'registry:lib');
      expect(result).toBe(path.resolve(cwd, 'lib/utils.ts'));
    });

    it('should resolve lib type to root even without lib prefix', () => {
      const result = resolveComponentPath(cwd, 'utils.ts', 'registry:lib');
      expect(result).toBe(path.resolve(cwd, 'utils.ts'));
    });

    it('should resolve based on path prefix if starts with lib/', () => {
      const result = resolveComponentPath(cwd, 'lib/hooks.ts', 'registry:ui');
      expect(result).toBe(path.resolve(cwd, 'lib/hooks.ts'));
    });

    it('should handle nested UI paths', () => {
      const result = resolveComponentPath(cwd, 'ui/forms/input.tsx', 'registry:ui');
      expect(result).toBe(path.resolve(cwd, 'components', 'ui/forms/input.tsx'));
    });

    it('should handle nested lib paths', () => {
      const result = resolveComponentPath(cwd, 'lib/utils/format.ts', 'registry:lib');
      expect(result).toBe(path.resolve(cwd, 'lib/utils/format.ts'));
    });

    it('should work with Windows-style paths', () => {
      const winCwd = 'C:\\Users\\test\\my-app';
      const result = resolveComponentPath(winCwd, 'ui/button.tsx', 'registry:ui');
      expect(result).toContain('button.tsx');
    });

    it('should work with relative current directory', () => {
      const result = resolveComponentPath('.', 'ui/button.tsx', 'registry:ui');
      expect(result).toContain('components');
      expect(result).toContain('button.tsx');
    });
  });
});
