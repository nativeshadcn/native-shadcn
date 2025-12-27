import prompts from 'prompts';
import execa = require('execa');
import ora from 'ora';
import path from 'path';
import fs from 'fs/promises';
import { logger } from '../utils/logger';
import { createConfig, type Config } from '../utils/config';

interface InitOptions {
  yes?: boolean;
  cwd: string;
}

export async function init(options: InitOptions) {
  logger.info('Welcome to Native ShadCN!');
  logger.break();

  const cwd = path.resolve(options.cwd);

  // Check if already initialized
  const configExists = await fs
    .access(path.join(cwd, 'components.json'))
    .then(() => true)
    .catch(() => false);

  if (configExists && !options.yes) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'Configuration already exists. Overwrite?',
      initial: false,
    });

    if (!overwrite) {
      logger.info('Cancelled.');
      process.exit(0);
    }
  }

  // Check for package.json
  const packageJsonPath = path.join(cwd, 'package.json');
  const packageJsonExists = await fs
    .access(packageJsonPath)
    .then(() => true)
    .catch(() => false);

  if (!packageJsonExists) {
    logger.error('package.json not found. Please run this command in a React Native project.');
    process.exit(1);
  }

  let config: Config;
  let configureTsconfig = true;
  let createNativewindEnv = true;

  if (options.yes) {
    config = {
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
  } else {
    const answers = await prompts([
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Would you like to use TypeScript?',
        initial: true,
      },
      {
        type: 'text',
        name: 'componentsAlias',
        message: 'Configure the import alias for components:',
        initial: '@/components',
      },
      {
        type: 'text',
        name: 'utilsAlias',
        message: 'Configure the import alias for utils:',
        initial: '@/lib/utils',
      },
      {
        type: (prev, values) => values.typescript ? 'confirm' : null,
        name: 'configureTsconfig',
        message: 'Update tsconfig.json with path aliases?',
        initial: true,
      },
      {
        type: (prev, values) => values.typescript ? 'confirm' : null,
        name: 'createNativewindEnv',
        message: 'Create nativewind-env.d.ts for className TypeScript support?',
        initial: true,
      },
    ]);

    configureTsconfig = answers.configureTsconfig ?? false;
    createNativewindEnv = answers.createNativewindEnv ?? false;

    config = {
      style: 'nativewind',
      typescript: answers.typescript,
      tailwind: {
        config: 'tailwind.config.js',
        css: 'global.css',
      },
      aliases: {
        components: answers.componentsAlias,
        utils: answers.utilsAlias,
      },
    };
  }

  const spinner = ora('Checking framework').start();

  try {
    // Create config file
    spinner.text = 'Writing components.json';
    await createConfig(cwd, config);
    spinner.succeed('Writing components.json');

    // Update tsconfig.json with path aliases (optional)
    if (config.typescript && configureTsconfig) {
      spinner.start('Updating tsconfig.json');
      const tsconfigPath = path.join(cwd, 'tsconfig.json');
      const tsconfigExists = await fs
        .access(tsconfigPath)
        .then(() => true)
        .catch(() => false);

      if (tsconfigExists) {
        try {
          const tsconfigContent = await fs.readFile(tsconfigPath, 'utf-8');
          const tsconfig = JSON.parse(tsconfigContent);

          // Ensure compilerOptions exists
          if (!tsconfig.compilerOptions) {
            tsconfig.compilerOptions = {};
          }

          // Add baseUrl if not present
          if (!tsconfig.compilerOptions.baseUrl) {
            tsconfig.compilerOptions.baseUrl = '.';
          }

          // Add or update paths
          if (!tsconfig.compilerOptions.paths) {
            tsconfig.compilerOptions.paths = {};
          }

          // Add path aliases based on config
          const componentsAlias = config.aliases.components.replace(/^@\//, '');
          const utilsPath = config.aliases.utils.replace(/^@\//, '');

          tsconfig.compilerOptions.paths[`${config.aliases.components}/*`] = [`./${componentsAlias}/*`];
          tsconfig.compilerOptions.paths[`@/lib/*`] = ['./lib/*'];

          // Write back with proper formatting
          await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2));
          spinner.succeed('Updating tsconfig.json');
        } catch (error) {
          spinner.warn('Could not automatically update tsconfig.json');
          logger.info('  Please add path aliases to your tsconfig.json manually');
        }
      } else {
        spinner.warn('tsconfig.json not found');
        logger.info('  Please add path aliases to your tsconfig.json manually');
      }
    }

    // Create NativeWind type declaration file (optional)
    if (config.typescript && createNativewindEnv) {
      spinner.start('Writing nativewind-env.d.ts');
      const nativewindEnvPath = path.join(cwd, 'nativewind-env.d.ts');
      const nativewindEnvContent = `/// <reference types="nativewind/types" />\n`;
      await fs.writeFile(nativewindEnvPath, nativewindEnvContent);
      spinner.succeed('Writing nativewind-env.d.ts');
    }

    // Install dependencies
    spinner.start('Installing dependencies');
    const dependencies = [
      'nativewind',
      'tailwindcss',
      'react-native-reanimated',
      'react-native-gesture-handler',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ];

    const devDependencies = config.typescript ? ['@types/react', '@types/react-native'] : [];

    // Install runtime dependencies
    await execa('npm', ['install', ...dependencies], { cwd });

    // Install dev dependencies
    if (devDependencies.length > 0) {
      await execa('npm', ['install', '-D', ...devDependencies], { cwd });
    }

    spinner.succeed('Installing dependencies');

    // Create tailwind config with dark mode support
    spinner.start('Writing tailwind.config.js');
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
`;

    await fs.writeFile(path.join(cwd, 'tailwind.config.js'), tailwindConfig);
    spinner.succeed('Writing tailwind.config.js');

    // Create global CSS file with CSS variables
    spinner.start('Writing global.css');
    const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}
`;

    await fs.writeFile(path.join(cwd, 'global.css'), globalCss);
    spinner.succeed('Writing global.css');

    // Create utils directory and cn function
    spinner.start('Writing lib/utils');
    const utilsDir = path.join(cwd, 'lib');
    await fs.mkdir(utilsDir, { recursive: true });

    const utilsContent = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

    const utilsFile = config.typescript ? 'utils.ts' : 'utils.js';
    const utilsFilePath = path.join(utilsDir, utilsFile);

    // Import merge utils for smart utils handling
    const { mergeUtilsFile, hasCnFunction } = await import('../utils/merge-utils');

    const utilsExists = await fs.access(utilsFilePath).then(() => true).catch(() => false);

    if (utilsExists) {
      const hasCn = await hasCnFunction(utilsFilePath);
      if (!hasCn) {
        // Merge cn function into existing file
        await mergeUtilsFile(utilsFilePath, utilsContent);
        spinner.succeed('Writing lib/utils');
      } else {
        // cn already exists, skip
        spinner.succeed('Writing lib/utils');
      }
    } else {
      // Create new file
      await fs.writeFile(utilsFilePath, utilsContent);
      spinner.succeed('Writing lib/utils');
    }

    // Create components directory
    await fs.mkdir(path.join(cwd, 'components', 'ui'), { recursive: true });

    // Configure babel.config.js
    spinner.start('Writing babel.config.js');
    const babelConfigPath = path.join(cwd, 'babel.config.js');
    const babelConfigExists = await fs
      .access(babelConfigPath)
      .then(() => true)
      .catch(() => false);

    if (babelConfigExists) {
      try {
        let babelContent = await fs.readFile(babelConfigPath, 'utf-8');

        // Check if nativewind/babel is already present
        if (!babelContent.includes('nativewind/babel')) {
          // Add nativewind/babel to the plugins array
          if (babelContent.includes('plugins:')) {
            // Find the plugins array and add nativewind/babel
            babelContent = babelContent.replace(
              /(plugins:\s*\[)/,
              '$1\n    "nativewind/babel",'
            );
          } else {
            // Add plugins array if it doesn't exist
            babelContent = babelContent.replace(
              /(module\.exports\s*=\s*{)/,
              '$1\n  plugins: ["nativewind/babel"],'
            );
          }

          await fs.writeFile(babelConfigPath, babelContent);
          spinner.succeed('Writing babel.config.js');
        } else {
          spinner.succeed('Writing babel.config.js');
        }
      } catch (error) {
        spinner.warn('Could not automatically configure babel.config.js');
        logger.info('  Please add "nativewind/babel" to your plugins array manually');
      }
    } else {
      // Create new babel.config.js
      const babelConfig = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
`;
      await fs.writeFile(babelConfigPath, babelConfig);
      spinner.succeed('Writing babel.config.js');
    }

    // Auto-import global.css in root component
    spinner.start('Importing global styles');
    const possibleRootFiles = [
      'app/_layout.tsx',
      'app/_layout.js',
      'App.tsx',
      'App.js',
      'src/App.tsx',
      'src/App.js',
    ];

    let rootFileFound = false;
    for (const file of possibleRootFiles) {
      const filePath = path.join(cwd, file);
      const fileExists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);

      if (fileExists) {
        try {
          let content = await fs.readFile(filePath, 'utf-8');

          // Check if global.css is already imported
          if (!content.includes('global.css') && !content.includes('./global.css')) {
            // Add import at the top of the file
            const importStatement = file.endsWith('.tsx') || file.endsWith('.ts')
              ? "import '../global.css';"
              : "import '../global.css';";

            // Find the first import and add before it, or add at the very top
            if (content.includes('import ')) {
              content = content.replace(
                /(import\s)/,
                `${importStatement}\n$1`
              );
            } else {
              content = `${importStatement}\n\n${content}`;
            }

            await fs.writeFile(filePath, content);
            spinner.succeed('Importing global styles');
            rootFileFound = true;
            break;
          } else {
            spinner.succeed('Importing global styles');
            rootFileFound = true;
            break;
          }
        } catch (error) {
          // Continue to next file
        }
      }
    }

    if (!rootFileFound) {
      spinner.warn('Could not find root component file');
      logger.info('  Please import global.css manually in your root component');
    }

    logger.break();
    logger.success('✓ Project initialized successfully!');
    logger.break();
    logger.info('🎉 All set! You can now add components:');
    logger.info('  npx native-shadcn add button');
    logger.info('  npx native-shadcn add card input dialog');
    logger.info('  npx native-shadcn add --all');
    logger.break();
    logger.info('📚 View all components:');
    logger.info('  npx native-shadcn list');
    logger.break();
  } catch (error) {
    spinner.fail('Failed to initialize project');
    logger.error(error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
