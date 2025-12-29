import { describe, it, expect } from 'vitest';
import { transformJsx } from '../../utils/transform-jsx';
import type { Config } from '../../utils/config';

describe('transform-jsx', () => {
  const baseConfig: Config = {
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

  describe('when typescript is enabled', () => {
    it('should return TypeScript code unchanged', async () => {
      const input = `
import * as React from 'react';

interface ButtonProps {
  title: string;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return <button onClick={onPress}>{title}</button>;
};
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: true });
      expect(result).toBe(input);
    });
  });

  describe('when typescript is disabled', () => {
    it('should remove type annotations', async () => {
      const input = `const name: string = 'John';
const age: number = 30;`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).not.toContain(': string');
      expect(result).not.toContain(': number');
      expect(result).toContain("'John'");
      expect(result).toContain('30');
    });

    it('should remove interfaces', async () => {
      const input = `
interface ButtonProps {
  title: string;
  onPress?: () => void;
}

const props: ButtonProps = { title: 'Click me' };
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).not.toContain('interface ButtonProps');
      expect(result).not.toContain(': ButtonProps');
      expect(result).toContain("title: 'Click me'");
    });

    it('should remove type imports but keep regular imports', async () => {
      const input = `
import type { FC } from 'react';
import { useState } from 'react';
import type { ViewProps } from 'react-native';

export const Component = () => {
  const [count, setCount] = useState(0);
  return null;
};
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).not.toContain('import type');
      expect(result).toContain("import { useState } from 'react'");
      expect(result).toContain('Component');
    });

    it('should remove generic type parameters', async () => {
      const input = `
import * as React from 'react';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return <button ref={ref} {...props}>{children}</button>;
  }
);
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).not.toContain('<HTMLButtonElement, ButtonProps>');
      expect(result).toContain('React.forwardRef(');
      expect(result).toContain('<button');
    });

    it('should preserve JSX syntax', async () => {
      const input = `
export const Component = () => {
  return (
    <div className="container">
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
};
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).toContain('<div');
      expect(result).toContain('className="container"');
      expect(result).toContain('<h1>');
      expect(result).toContain('</div>');
    });

    it('should handle React Native components', async () => {
      const input = `
import * as React from 'react';
import { View, Text, Pressable } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Text>{title}</Text>
      </View>
    </Pressable>
  );
};
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).not.toContain('interface ButtonProps');
      expect(result).not.toContain(': React.FC<ButtonProps>');
      expect(result).toContain('<Pressable');
      expect(result).toContain('<View>');
      expect(result).toContain('<Text>');
      expect(result).toContain('{title}');
    });

    it('should remove optional property syntax', async () => {
      const input = `
interface Props {
  required: string;
  optional?: number;
}

const obj: Props = {
  required: 'value',
};
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).not.toContain('?:');
      expect(result).not.toContain('interface Props');
      expect(result).toContain("required: 'value'");
    });

    it('should handle class-variance-authority types', async () => {
      const input = `
import { cva, type VariantProps } from 'class-variance-authority';

const variants = cva('base', {
  variants: {
    size: {
      sm: 'small',
      lg: 'large',
    },
  },
});

interface ButtonProps extends VariantProps<typeof variants> {
  children?: React.ReactNode;
}
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).not.toContain('type VariantProps');
      expect(result).not.toContain('interface ButtonProps');
      expect(result).not.toContain('extends VariantProps');
      expect(result).toContain('cva(');
      expect(result).toContain("'base'");
    });

    it('should handle complex React Native component', async () => {
      const input = `
import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        outline: 'border border-input',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9 px-3',
      },
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, children, ...props }, ref) => {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      <Text>{children}</Text>
    </Pressable>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      // Should remove TypeScript syntax
      expect(result).not.toContain('type VariantProps');
      expect(result).not.toContain('export interface ButtonProps');
      expect(result).not.toContain('extends React.ComponentPropsWithoutRef');
      expect(result).not.toContain('<React.ElementRef<typeof Pressable>, ButtonProps>');

      // Should preserve functionality
      expect(result).toContain('buttonVariants');
      expect(result).toContain('cva(');
      expect(result).toContain('React.forwardRef(');
      expect(result).toContain('<Pressable');
      expect(result).toContain('className={cn(');
      expect(result).toContain("Button.displayName = 'Button'");
      expect(result).toContain('export { Button, buttonVariants }');
    });

    it('should handle as const assertions', async () => {
      const input = `
const config = {
  name: 'app',
  version: '1.0.0',
} as const;

type Config = typeof config;
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).not.toContain('as const');
      expect(result).not.toContain('type Config');
      expect(result).toContain("name: 'app'");
      expect(result).toContain("version: '1.0.0'");
    });

    it('should handle union types in function parameters', async () => {
      const input = `
function handleEvent(event: 'click' | 'focus' | 'blur'): void {
  console.log(event);
}
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      expect(result).not.toContain(": 'click' | 'focus' | 'blur'");
      expect(result).not.toContain(': void');
      expect(result).toContain('function handleEvent(event)');
      expect(result).toContain('console.log(event)');
    });

    it('should handle enums', async () => {
      const input = `
enum Status {
  Active = 'active',
  Inactive = 'inactive',
}

const status: Status = Status.Active;
`;

      const result = await transformJsx(input, { ...baseConfig, typescript: false });

      // Babel transforms enums to objects
      expect(result).not.toContain(': Status =');
      expect(result).toContain('Status');
    });
  });

  describe('error handling', () => {
    it('should return original code if transformation fails', async () => {
      const invalidCode = 'this is not valid javascript {{{';

      const result = await transformJsx(invalidCode, { ...baseConfig, typescript: false });

      // Should return original if transformation fails
      expect(result).toBe(invalidCode);
    });

    it('should handle empty string', async () => {
      const result = await transformJsx('', { ...baseConfig, typescript: false });
      expect(result).toBe('');
    });
  });
});
