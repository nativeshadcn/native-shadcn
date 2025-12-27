import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

interface ProjectInfo {
  name: string;
  version: string;
  isExpo: boolean;
  isBareReactNative: boolean;
  hasNativeWind: boolean;
  hasTailwind: boolean;
}

async function getProjectInfo(cwd: string): Promise<ProjectInfo | null> {
  try {
    const packageJsonPath = path.join(cwd, 'package.json');
    const content = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(content);

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    return {
      name: packageJson.name || 'unknown',
      version: packageJson.version || '1.0.0',
      isExpo: 'expo' in dependencies,
      isBareReactNative: 'react-native' in dependencies && !('expo' in dependencies),
      hasNativeWind: 'nativewind' in dependencies,
      hasTailwind: 'tailwindcss' in dependencies,
    };
  } catch {
    return null;
  }
}

describe('get-project-info', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'project-info-test-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should get info from Expo project', async () => {
    const packageJson = {
      name: 'my-expo-app',
      version: '1.0.0',
      dependencies: {
        expo: '^49.0.0',
        'react-native': '0.72.0',
      },
    };

    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify(packageJson)
    );

    const info = await getProjectInfo(tempDir);

    expect(info).toBeDefined();
    expect(info?.name).toBe('my-expo-app');
    expect(info?.version).toBe('1.0.0');
    expect(info?.isExpo).toBe(true);
    expect(info?.isBareReactNative).toBe(false);
  });

  it('should get info from bare React Native project', async () => {
    const packageJson = {
      name: 'my-rn-app',
      version: '0.0.1',
      dependencies: {
        'react-native': '0.72.0',
      },
    };

    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify(packageJson)
    );

    const info = await getProjectInfo(tempDir);

    expect(info).toBeDefined();
    expect(info?.name).toBe('my-rn-app');
    expect(info?.isBareReactNative).toBe(true);
    expect(info?.isExpo).toBe(false);
  });

  it('should detect NativeWind installation', async () => {
    const packageJson = {
      name: 'test-app',
      version: '1.0.0',
      dependencies: {
        expo: '^49.0.0',
        nativewind: '^4.0.0',
      },
    };

    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify(packageJson)
    );

    const info = await getProjectInfo(tempDir);

    expect(info?.hasNativeWind).toBe(true);
  });

  it('should detect Tailwind installation', async () => {
    const packageJson = {
      name: 'test-app',
      version: '1.0.0',
      devDependencies: {
        tailwindcss: '^3.3.0',
      },
    };

    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify(packageJson)
    );

    const info = await getProjectInfo(tempDir);

    expect(info?.hasTailwind).toBe(true);
  });

  it('should check both dependencies and devDependencies', async () => {
    const packageJson = {
      name: 'test-app',
      version: '1.0.0',
      dependencies: {
        nativewind: '^4.0.0',
      },
      devDependencies: {
        tailwindcss: '^3.3.0',
      },
    };

    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify(packageJson)
    );

    const info = await getProjectInfo(tempDir);

    expect(info?.hasNativeWind).toBe(true);
    expect(info?.hasTailwind).toBe(true);
  });

  it('should return null when package.json does not exist', async () => {
    const info = await getProjectInfo(tempDir);
    expect(info).toBeNull();
  });

  it('should return null when package.json is invalid JSON', async () => {
    await fs.writeFile(path.join(tempDir, 'package.json'), 'invalid json{{{');

    const info = await getProjectInfo(tempDir);
    expect(info).toBeNull();
  });

  it('should handle missing dependencies object', async () => {
    const packageJson = {
      name: 'minimal-app',
      version: '1.0.0',
    };

    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify(packageJson)
    );

    const info = await getProjectInfo(tempDir);

    expect(info).toBeDefined();
    expect(info?.name).toBe('minimal-app');
    expect(info?.isExpo).toBe(false);
    expect(info?.isBareReactNative).toBe(false);
  });

  it('should use default values for missing fields', async () => {
    const packageJson = {};

    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify(packageJson)
    );

    const info = await getProjectInfo(tempDir);

    expect(info).toBeDefined();
    expect(info?.name).toBe('unknown');
    expect(info?.version).toBe('1.0.0');
  });
});
