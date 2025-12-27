import { describe, it, expect } from 'vitest';

interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: any;
}

/**
 * Check if a dependency is installed
 */
function hasDependency(
  pkg: PackageJson,
  depName: string
): boolean {
  return !!(
    pkg.dependencies?.[depName] ||
    pkg.devDependencies?.[depName]
  );
}

/**
 * Get dependency version
 */
function getDependencyVersion(
  pkg: PackageJson,
  depName: string
): string | null {
  return (
    pkg.dependencies?.[depName] ||
    pkg.devDependencies?.[depName] ||
    null
  );
}

/**
 * Check if package is an Expo project
 */
function isExpoProject(pkg: PackageJson): boolean {
  return hasDependency(pkg, 'expo');
}

/**
 * Check if package is a React Native project
 */
function isReactNativeProject(pkg: PackageJson): boolean {
  return hasDependency(pkg, 'react-native');
}

/**
 * Get all installed UI library dependencies
 */
function getUILibraries(pkg: PackageJson): string[] {
  const uiLibs = [
    'nativewind',
    'tailwindcss',
    '@shopify/restyle',
    'styled-components',
    'emotion',
  ];

  return uiLibs.filter(lib => hasDependency(pkg, lib));
}

describe('package-info', () => {
  describe('hasDependency', () => {
    it('should find dependency in dependencies', () => {
      const pkg: PackageJson = {
        dependencies: {
          'react': '^18.0.0',
          'react-native': '^0.72.0',
        },
      };

      const result = hasDependency(pkg, 'react');
      expect(result).toMatchSnapshot();
    });

    it('should find dependency in devDependencies', () => {
      const pkg: PackageJson = {
        devDependencies: {
          'typescript': '^5.0.0',
        },
      };

      const result = hasDependency(pkg, 'typescript');
      expect(result).toMatchSnapshot();
    });

    it('should return false for missing dependency', () => {
      const pkg: PackageJson = {
        dependencies: {
          'react': '^18.0.0',
        },
      };

      const result = hasDependency(pkg, 'vue');
      expect(result).toMatchSnapshot();
    });

    it('should handle package with no dependencies', () => {
      const pkg: PackageJson = {
        name: 'my-app',
        version: '1.0.0',
      };

      const result = hasDependency(pkg, 'react');
      expect(result).toMatchSnapshot();
    });
  });

  describe('getDependencyVersion', () => {
    it('should get version from dependencies', () => {
      const pkg: PackageJson = {
        dependencies: {
          'react': '^18.2.0',
        },
      };

      const result = getDependencyVersion(pkg, 'react');
      expect(result).toMatchSnapshot();
    });

    it('should get version from devDependencies', () => {
      const pkg: PackageJson = {
        devDependencies: {
          'typescript': '^5.1.0',
        },
      };

      const result = getDependencyVersion(pkg, 'typescript');
      expect(result).toMatchSnapshot();
    });

    it('should return null for missing dependency', () => {
      const pkg: PackageJson = {
        dependencies: {},
      };

      const result = getDependencyVersion(pkg, 'unknown');
      expect(result).toMatchSnapshot();
    });

    it('should prefer dependencies over devDependencies', () => {
      const pkg: PackageJson = {
        dependencies: {
          'typescript': '^5.0.0',
        },
        devDependencies: {
          'typescript': '^4.0.0',
        },
      };

      const result = getDependencyVersion(pkg, 'typescript');
      expect(result).toMatchSnapshot();
    });
  });

  describe('isExpoProject', () => {
    it('should detect Expo project', () => {
      const pkg: PackageJson = {
        dependencies: {
          'expo': '~49.0.0',
          'react': '18.2.0',
          'react-native': '0.72.0',
        },
      };

      const result = isExpoProject(pkg);
      expect(result).toMatchSnapshot();
    });

    it('should return false for non-Expo project', () => {
      const pkg: PackageJson = {
        dependencies: {
          'react': '18.2.0',
          'react-native': '0.72.0',
        },
      };

      const result = isExpoProject(pkg);
      expect(result).toMatchSnapshot();
    });
  });

  describe('isReactNativeProject', () => {
    it('should detect React Native project', () => {
      const pkg: PackageJson = {
        dependencies: {
          'react': '18.2.0',
          'react-native': '0.72.0',
        },
      };

      const result = isReactNativeProject(pkg);
      expect(result).toMatchSnapshot();
    });

    it('should detect Expo as React Native project', () => {
      const pkg: PackageJson = {
        dependencies: {
          'expo': '~49.0.0',
          'react': '18.2.0',
          'react-native': '0.72.0',
        },
      };

      const result = isReactNativeProject(pkg);
      expect(result).toMatchSnapshot();
    });

    it('should return false for non-React Native project', () => {
      const pkg: PackageJson = {
        dependencies: {
          'react': '18.2.0',
          'react-dom': '18.2.0',
        },
      };

      const result = isReactNativeProject(pkg);
      expect(result).toMatchSnapshot();
    });
  });

  describe('getUILibraries', () => {
    it('should detect NativeWind', () => {
      const pkg: PackageJson = {
        dependencies: {
          'nativewind': '^2.0.0',
          'tailwindcss': '^3.3.0',
        },
      };

      const result = getUILibraries(pkg);
      expect(result).toMatchSnapshot();
    });

    it('should detect multiple UI libraries', () => {
      const pkg: PackageJson = {
        dependencies: {
          'nativewind': '^2.0.0',
        },
        devDependencies: {
          'tailwindcss': '^3.3.0',
        },
      };

      const result = getUILibraries(pkg);
      expect(result).toMatchSnapshot();
    });

    it('should return empty array when no UI libraries found', () => {
      const pkg: PackageJson = {
        dependencies: {
          'react': '18.2.0',
          'react-native': '0.72.0',
        },
      };

      const result = getUILibraries(pkg);
      expect(result).toMatchSnapshot();
    });
  });

  describe('package info snapshots', () => {
    it('should match complete Expo project info', () => {
      const pkg: PackageJson = {
        name: 'my-expo-app',
        version: '1.0.0',
        dependencies: {
          'expo': '~49.0.0',
          'react': '18.2.0',
          'react-native': '0.72.0',
          'nativewind': '^2.0.0',
        },
        devDependencies: {
          'tailwindcss': '^3.3.0',
          'typescript': '^5.0.0',
        },
      };

      const info = {
        isExpo: isExpoProject(pkg),
        isReactNative: isReactNativeProject(pkg),
        uiLibraries: getUILibraries(pkg),
        hasTypeScript: hasDependency(pkg, 'typescript'),
      };

      expect(info).toMatchSnapshot();
    });

    it('should match complete bare React Native project info', () => {
      const pkg: PackageJson = {
        name: 'my-rn-app',
        version: '1.0.0',
        dependencies: {
          'react': '18.2.0',
          'react-native': '0.72.0',
        },
      };

      const info = {
        isExpo: isExpoProject(pkg),
        isReactNative: isReactNativeProject(pkg),
        uiLibraries: getUILibraries(pkg),
        hasTypeScript: hasDependency(pkg, 'typescript'),
      };

      expect(info).toMatchSnapshot();
    });
  });
});
