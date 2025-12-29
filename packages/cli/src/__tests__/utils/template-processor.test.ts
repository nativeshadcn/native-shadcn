import { describe, it, expect } from 'vitest';

/**
 * Process template with variables
 */
function processTemplate(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(placeholder, value);
  }

  return result;
}

/**
 * Generate component import statement
 */
function generateImport(
  componentName: string,
  path: string,
  named: boolean = false
): string {
  if (named) {
    return `import { ${componentName} } from '${path}';`;
  }
  return `import ${componentName} from '${path}';`;
}

/**
 * Generate type import statement
 */
function generateTypeImport(
  typeName: string,
  path: string
): string {
  return `import type { ${typeName} } from '${path}';`;
}

/**
 * Convert component name to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Convert component name to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

describe('template-processor', () => {
  describe('processTemplate', () => {
    it('should replace single variable', () => {
      const template = 'Hello, {{ name }}!';
      const variables = { name: 'World' };
      const result = processTemplate(template, variables);
      expect(result).toMatchSnapshot();
    });

    it('should replace multiple variables', () => {
      const template = 'export const {{ componentName }} = () => <{{ element }} />;';
      const variables = {
        componentName: 'Button',
        element: 'Pressable',
      };
      const result = processTemplate(template, variables);
      expect(result).toMatchSnapshot();
    });

    it('should handle variables with whitespace', () => {
      const template = '{{ firstName }} {{ lastName }}';
      const variables = {
        firstName: 'John',
        lastName: 'Doe',
      };
      const result = processTemplate(template, variables);
      expect(result).toMatchSnapshot();
    });

    it('should handle missing variables', () => {
      const template = 'Hello, {{ name }}! Welcome to {{ place }}.';
      const variables = { name: 'Alice' };
      const result = processTemplate(template, variables);
      expect(result).toMatchSnapshot();
    });

    it('should process component template', () => {
      const template = `import * as React from 'react';
import { {{ element }} } from 'react-native';
import { cn } from '{{ utilsPath }}';

export const {{ componentName }} = React.forwardRef<
  React.ElementRef<typeof {{ element }}>,
  React.ComponentPropsWithoutRef<typeof {{ element }}>
>(({ className, ...props }, ref) => {
  return (
    <{{ element }}
      ref={ref}
      className={cn('{{ defaultClasses }}', className)}
      {...props}
    />
  );
});
{{ componentName }}.displayName = '{{ componentName }}';`;

      const variables = {
        element: 'Pressable',
        componentName: 'Button',
        utilsPath: '@/lib/utils',
        defaultClasses: 'inline-flex items-center justify-center',
      };

      const result = processTemplate(template, variables);
      expect(result).toMatchSnapshot();
    });
  });

  describe('generateImport', () => {
    it('should generate default import', () => {
      const result = generateImport('Button', '@/components/ui/button');
      expect(result).toMatchSnapshot();
    });

    it('should generate named import', () => {
      const result = generateImport('Button', '@/components/ui/button', true);
      expect(result).toMatchSnapshot();
    });

    it('should generate import from relative path', () => {
      const result = generateImport('cn', './lib/utils', true);
      expect(result).toMatchSnapshot();
    });

    it('should generate import from package', () => {
      const result = generateImport('View', 'react-native', true);
      expect(result).toMatchSnapshot();
    });
  });

  describe('generateTypeImport', () => {
    it('should generate type import', () => {
      const result = generateTypeImport('Config', '@/lib/types');
      expect(result).toMatchSnapshot();
    });

    it('should generate type import from package', () => {
      const result = generateTypeImport('ViewProps', 'react-native');
      expect(result).toMatchSnapshot();
    });

    it('should generate multiple types import', () => {
      const result = generateTypeImport('Config, Theme', '@/lib/types');
      expect(result).toMatchSnapshot();
    });
  });

  describe('toPascalCase', () => {
    it('should convert kebab-case to PascalCase', () => {
      const result = toPascalCase('button-component');
      expect(result).toMatchSnapshot();
    });

    it('should convert snake_case to PascalCase', () => {
      const result = toPascalCase('button_component');
      expect(result).toMatchSnapshot();
    });

    it('should handle already PascalCase', () => {
      const result = toPascalCase('ButtonComponent');
      expect(result).toMatchSnapshot();
    });

    it('should handle single word', () => {
      const result = toPascalCase('button');
      expect(result).toMatchSnapshot();
    });

    it('should handle multi-word with mixed separators', () => {
      const result = toPascalCase('my-button_component');
      expect(result).toMatchSnapshot();
    });
  });

  describe('toKebabCase', () => {
    it('should convert PascalCase to kebab-case', () => {
      const result = toKebabCase('ButtonComponent');
      expect(result).toMatchSnapshot();
    });

    it('should convert camelCase to kebab-case', () => {
      const result = toKebabCase('buttonComponent');
      expect(result).toMatchSnapshot();
    });

    it('should handle already kebab-case', () => {
      const result = toKebabCase('button-component');
      expect(result).toMatchSnapshot();
    });

    it('should handle single word', () => {
      const result = toKebabCase('Button');
      expect(result).toMatchSnapshot();
    });

    it('should handle acronyms', () => {
      const result = toKebabCase('UIButton');
      expect(result).toMatchSnapshot();
    });
  });

  describe('template snapshots', () => {
    it('should match complete UI component template', () => {
      const template = `import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  variant?: 'default' | 'outline' | 'ghost';
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant = 'default', ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        {
          'bg-primary': variant === 'default',
          'border border-input': variant === 'outline',
          'hover:bg-accent': variant === 'ghost',
        },
        className
      )}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button };`;

      expect(template).toMatchSnapshot();
    });

    it('should match lib utils template', () => {
      const template = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}`;

      expect(template).toMatchSnapshot();
    });
  });
});
