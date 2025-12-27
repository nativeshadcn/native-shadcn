import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

async function isTypeScriptProject(cwd: string): Promise<boolean> {
  // Check for tsconfig.json
  const tsconfigPath = path.join(cwd, 'tsconfig.json');
  const hasTsConfig = await fs.access(tsconfigPath)
    .then(() => true)
    .catch(() => false);

  if (hasTsConfig) {
    return true;
  }

  // Check for TypeScript files in common directories
  const commonDirs = ['src', 'app', '.'];
  for (const dir of commonDirs) {
    const dirPath = path.join(cwd, dir);
    try {
      const files = await fs.readdir(dirPath);
      const hasTsFiles = files.some(file =>
        file.endsWith('.ts') || file.endsWith('.tsx')
      );
      if (hasTsFiles) {
        return true;
      }
    } catch {
      // Directory doesn't exist, continue
    }
  }

  return false;
}

describe('is-typescript-project', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ts-detect-test-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should detect TypeScript project from tsconfig.json', async () => {
    await fs.writeFile(path.join(tempDir, 'tsconfig.json'), '{}');

    const isTS = await isTypeScriptProject(tempDir);
    expect(isTS).toBe(true);
  });

  it('should detect TypeScript project from .ts files', async () => {
    await fs.writeFile(path.join(tempDir, 'index.ts'), 'export const foo = 1;');

    const isTS = await isTypeScriptProject(tempDir);
    expect(isTS).toBe(true);
  });

  it('should detect TypeScript project from .tsx files', async () => {
    await fs.writeFile(path.join(tempDir, 'App.tsx'), 'export const App = () => null;');

    const isTS = await isTypeScriptProject(tempDir);
    expect(isTS).toBe(true);
  });

  it('should detect TypeScript project from src directory', async () => {
    await fs.mkdir(path.join(tempDir, 'src'));
    await fs.writeFile(path.join(tempDir, 'src', 'index.ts'), '');

    const isTS = await isTypeScriptProject(tempDir);
    expect(isTS).toBe(true);
  });

  it('should detect TypeScript project from app directory', async () => {
    await fs.mkdir(path.join(tempDir, 'app'));
    await fs.writeFile(path.join(tempDir, 'app', '_layout.tsx'), '');

    const isTS = await isTypeScriptProject(tempDir);
    expect(isTS).toBe(true);
  });

  it('should return false for JavaScript-only project', async () => {
    await fs.writeFile(path.join(tempDir, 'index.js'), '');
    await fs.writeFile(path.join(tempDir, 'App.jsx'), '');

    const isTS = await isTypeScriptProject(tempDir);
    expect(isTS).toBe(false);
  });

  it('should return false for empty project', async () => {
    const isTS = await isTypeScriptProject(tempDir);
    expect(isTS).toBe(false);
  });

  it('should prefer tsconfig.json over file scanning', async () => {
    // Create tsconfig.json and JS files
    await fs.writeFile(path.join(tempDir, 'tsconfig.json'), '{}');
    await fs.writeFile(path.join(tempDir, 'index.js'), '');

    const isTS = await isTypeScriptProject(tempDir);
    expect(isTS).toBe(true);
  });

  it('should handle missing directories gracefully', async () => {
    const nonExistentPath = path.join(tempDir, 'non-existent');
    const isTS = await isTypeScriptProject(nonExistentPath);
    expect(isTS).toBe(false);
  });
});
