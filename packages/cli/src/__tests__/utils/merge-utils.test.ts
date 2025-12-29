import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { hasCnFunction, mergeUtilsFile, getCnFunctionTemplate } from '../../utils/merge-utils';

describe('merge-utils', () => {
  let tempDir: string;
  let utilsPath: string;

  beforeEach(async () => {
    // Create a temporary directory for each test
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'native-shadcn-test-'));
    utilsPath = path.join(tempDir, 'utils.ts');
  });

  afterEach(async () => {
    // Clean up temporary directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('hasCnFunction', () => {
    it('should return true when cn function exists', async () => {
      const content = `
        import { clsx } from 'clsx';

        export function cn(...inputs) {
          return clsx(inputs);
        }
      `;
      await fs.writeFile(utilsPath, content);

      const result = await hasCnFunction(utilsPath);
      expect(result).toBe(true);
    });

    it('should return true when cn const exists', async () => {
      const content = `
        import { clsx } from 'clsx';

        export const cn = (...inputs) => clsx(inputs);
      `;
      await fs.writeFile(utilsPath, content);

      const result = await hasCnFunction(utilsPath);
      expect(result).toBe(true);
    });

    it('should return false when cn function does not exist', async () => {
      const content = `
        export function formatDate(date: Date) {
          return date.toLocaleDateString();
        }
      `;
      await fs.writeFile(utilsPath, content);

      const result = await hasCnFunction(utilsPath);
      expect(result).toBe(false);
    });

    it('should return false when file does not exist', async () => {
      const result = await hasCnFunction(utilsPath);
      expect(result).toBe(false);
    });
  });

  describe('getCnFunctionTemplate', () => {
    it('should return TypeScript template when typescript is true', () => {
      const template = getCnFunctionTemplate(true);

      expect(template).toContain('import { clsx, type ClassValue }');
      expect(template).toContain('export function cn(...inputs: ClassValue[])');
      expect(template).toContain('twMerge(clsx(inputs))');
    });

    it('should return JavaScript template when typescript is false', () => {
      const template = getCnFunctionTemplate(false);

      expect(template).toContain('import { clsx }');
      expect(template).not.toContain('type ClassValue');
      expect(template).toContain('export function cn(...inputs)');
    });
  });

  describe('mergeUtilsFile', () => {
    it('should create new file when it does not exist', async () => {
      const cnTemplate = getCnFunctionTemplate(true);

      await mergeUtilsFile(utilsPath, cnTemplate);

      const content = await fs.readFile(utilsPath, 'utf-8');
      expect(content).toContain('export function cn');
      expect(content).toContain('twMerge(clsx(inputs))');
    });

    it('should skip merge when cn function already exists', async () => {
      const existingContent = `
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function formatDate(date: Date) {
  return date.toLocaleDateString();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
      await fs.writeFile(utilsPath, existingContent);
      const cnTemplate = getCnFunctionTemplate(true);

      await mergeUtilsFile(utilsPath, cnTemplate);

      const content = await fs.readFile(utilsPath, 'utf-8');
      // Content should remain unchanged
      expect(content).toBe(existingContent);
      // Should only have one cn function
      expect((content.match(/export function cn/g) || []).length).toBe(1);
    });

    it('should merge cn function when file exists without cn', async () => {
      const existingContent = `export function formatDate(date: Date) {
  return date.toLocaleDateString();
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/\\s+/g, '-');
}
`;
      await fs.writeFile(utilsPath, existingContent);
      const cnTemplate = getCnFunctionTemplate(true);

      await mergeUtilsFile(utilsPath, cnTemplate);

      const content = await fs.readFile(utilsPath, 'utf-8');

      // Should have imports at top
      expect(content).toContain('import { clsx, type ClassValue }');
      expect(content).toContain('import { twMerge }');

      // Should preserve existing functions
      expect(content).toContain('export function formatDate');
      expect(content).toContain('export function slugify');

      // Should add cn function
      expect(content).toContain('export function cn');
    });

    it('should not duplicate imports when merging', async () => {
      // Use exact same import format as the template
      const existingContent = `import { clsx, type ClassValue } from 'clsx';

export function formatDate(date: Date) {
  return date.toLocaleDateString();
}
`;
      await fs.writeFile(utilsPath, existingContent);
      const cnTemplate = getCnFunctionTemplate(true);

      await mergeUtilsFile(utilsPath, cnTemplate);

      const content = await fs.readFile(utilsPath, 'utf-8');

      // Should only have one clsx import (exact match)
      const clsxImports = content.match(/import { clsx, type ClassValue } from 'clsx';/g) || [];
      expect(clsxImports.length).toBe(1);
    });

    it('should preserve all existing code when merging', async () => {
      const existingContent = `export function formatCurrency(amount: number): string {
  return \`$\${amount.toFixed(2)}\`;
}

export function debounce(fn: Function, ms: number) {
  let timeoutId: NodeJS.Timeout;
  return function(...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}
`;
      await fs.writeFile(utilsPath, existingContent);
      const cnTemplate = getCnFunctionTemplate(true);

      await mergeUtilsFile(utilsPath, cnTemplate);

      const content = await fs.readFile(utilsPath, 'utf-8');

      // All original functions should be preserved
      expect(content).toContain('formatCurrency');
      expect(content).toContain('debounce');
      expect(content).toContain('toFixed(2)');
      expect(content).toContain('clearTimeout');

      // And cn should be added
      expect(content).toContain('export function cn');
    });
  });
});
