import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

async function detectPackageManager(cwd: string): Promise<'npm' | 'yarn' | 'pnpm' | 'bun'> {
  // Check for lock files
  const lockFiles = {
    'package-lock.json': 'npm' as const,
    'yarn.lock': 'yarn' as const,
    'pnpm-lock.yaml': 'pnpm' as const,
    'bun.lockb': 'bun' as const,
  };

  for (const [lockFile, manager] of Object.entries(lockFiles)) {
    const lockPath = path.join(cwd, lockFile);
    const exists = await fs.access(lockPath).then(() => true).catch(() => false);
    if (exists) {
      return manager;
    }
  }

  // Default to npm
  return 'npm';
}

describe('get-package-manager', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pm-test-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should detect npm from package-lock.json', async () => {
    await fs.writeFile(path.join(tempDir, 'package-lock.json'), '{}');
    const pm = await detectPackageManager(tempDir);
    expect(pm).toBe('npm');
  });

  it('should detect yarn from yarn.lock', async () => {
    await fs.writeFile(path.join(tempDir, 'yarn.lock'), '');
    const pm = await detectPackageManager(tempDir);
    expect(pm).toBe('yarn');
  });

  it('should detect pnpm from pnpm-lock.yaml', async () => {
    await fs.writeFile(path.join(tempDir, 'pnpm-lock.yaml'), '');
    const pm = await detectPackageManager(tempDir);
    expect(pm).toBe('pnpm');
  });

  it('should detect bun from bun.lockb', async () => {
    await fs.writeFile(path.join(tempDir, 'bun.lockb'), '');
    const pm = await detectPackageManager(tempDir);
    expect(pm).toBe('bun');
  });

  it('should default to npm when no lock file exists', async () => {
    const pm = await detectPackageManager(tempDir);
    expect(pm).toBe('npm');
  });

  it('should prioritize npm over other package managers', async () => {
    // Create multiple lock files
    await fs.writeFile(path.join(tempDir, 'package-lock.json'), '{}');
    await fs.writeFile(path.join(tempDir, 'yarn.lock'), '');

    const pm = await detectPackageManager(tempDir);
    expect(pm).toBe('npm');
  });
});
