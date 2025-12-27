import { describe, it, expect } from 'vitest';
import fs from 'fs/promises';
import path from 'path';

/**
 * Load fixture file
 */
async function loadFixture(fixturePath: string): Promise<any> {
  const fullPath = path.join(__dirname, fixturePath);
  const content = await fs.readFile(fullPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Check if fixture directory exists
 */
async function fixtureExists(fixtureName: string): Promise<boolean> {
  const fixturePath = path.join(__dirname, fixtureName);
  try {
    await fs.access(fixturePath);
    return true;
  } catch {
    return false;
  }
}

describe('fixture-loader', () => {
  describe('fixture directories', () => {
    it('should have with-aliases fixture', async () => {
      const exists = await fixtureExists('with-aliases');
      expect(exists).toBe(true);
    });

    it('should have without-aliases fixture', async () => {
      const exists = await fixtureExists('without-aliases');
      expect(exists).toBe(true);
    });

    it('should have expo-project fixture', async () => {
      const exists = await fixtureExists('expo-project');
      expect(exists).toBe(true);
    });

    it('should have bare-rn-project fixture', async () => {
      const exists = await fixtureExists('bare-rn-project');
      expect(exists).toBe(true);
    });

    it('should have typescript-project fixture', async () => {
      const exists = await fixtureExists('typescript-project');
      expect(exists).toBe(true);
    });

    it('should have javascript-project fixture', async () => {
      const exists = await fixtureExists('javascript-project');
      expect(exists).toBe(true);
    });
  });

  describe('loadFixture', () => {
    it('should load with-aliases package.json', async () => {
      const pkg = await loadFixture('with-aliases/package.json');
      expect(pkg.name).toBe('test-app-with-aliases');
      expect(pkg.dependencies).toHaveProperty('expo');
      expect(pkg.dependencies).toHaveProperty('nativewind');
    });

    it('should load with-aliases tsconfig.json', async () => {
      const tsconfig = await loadFixture('with-aliases/tsconfig.json');
      expect(tsconfig.compilerOptions).toHaveProperty('paths');
      expect(tsconfig.compilerOptions.paths).toHaveProperty('@/components/*');
    });

    it('should load with-aliases components.json', async () => {
      const config = await loadFixture('with-aliases/components.json');
      expect(config.style).toBe('nativewind');
      expect(config.typescript).toBe(true);
      expect(config.aliases).toHaveProperty('components');
      expect(config.aliases.components).toBe('@/components');
    });

    it('should load expo-project package.json', async () => {
      const pkg = await loadFixture('expo-project/package.json');
      expect(pkg.name).toBe('expo-test-app');
      expect(pkg.main).toBe('node_modules/expo/AppEntry.js');
    });

    it('should load expo-project app.json', async () => {
      const appJson = await loadFixture('expo-project/app.json');
      expect(appJson.expo).toHaveProperty('name');
      expect(appJson.expo.name).toBe('expo-test-app');
    });

    it('should load bare-rn-project package.json', async () => {
      const pkg = await loadFixture('bare-rn-project/package.json');
      expect(pkg.name).toBe('bare-rn-test-app');
      expect(pkg.dependencies).toHaveProperty('react-native');
      expect(pkg.dependencies).not.toHaveProperty('expo');
    });
  });

  describe('fixture snapshots', () => {
    it('should match with-aliases configuration', async () => {
      const pkg = await loadFixture('with-aliases/package.json');
      const tsconfig = await loadFixture('with-aliases/tsconfig.json');
      const components = await loadFixture('with-aliases/components.json');

      const config = {
        package: pkg,
        tsconfig: tsconfig,
        components: components,
      };

      expect(config).toMatchSnapshot();
    });

    it('should match without-aliases configuration', async () => {
      const pkg = await loadFixture('without-aliases/package.json');
      const tsconfig = await loadFixture('without-aliases/tsconfig.json');

      const config = {
        package: pkg,
        tsconfig: tsconfig,
      };

      expect(config).toMatchSnapshot();
    });

    it('should match expo project structure', async () => {
      const pkg = await loadFixture('expo-project/package.json');
      const appJson = await loadFixture('expo-project/app.json');

      const project = {
        package: pkg,
        appJson: appJson,
        isExpo: true,
        hasTypeScript: pkg.devDependencies?.typescript !== undefined,
        hasNativeWind: pkg.dependencies?.nativewind !== undefined,
      };

      expect(project).toMatchSnapshot();
    });

    it('should match bare React Native project structure', async () => {
      const pkg = await loadFixture('bare-rn-project/package.json');

      const project = {
        package: pkg,
        isExpo: false,
        isBareRN: true,
        hasTypeScript: pkg.devDependencies?.typescript !== undefined,
      };

      expect(project).toMatchSnapshot();
    });

    it('should match TypeScript project configuration', async () => {
      const pkg = await loadFixture('typescript-project/package.json');
      const tsconfig = await loadFixture('typescript-project/tsconfig.json');

      const project = {
        package: pkg,
        tsconfig: tsconfig,
        typescript: true,
      };

      expect(project).toMatchSnapshot();
    });

    it('should match JavaScript project configuration', async () => {
      const pkg = await loadFixture('javascript-project/package.json');

      const project = {
        package: pkg,
        typescript: false,
        hasNativeWind: pkg.dependencies?.nativewind !== undefined,
      };

      expect(project).toMatchSnapshot();
    });
  });
});
