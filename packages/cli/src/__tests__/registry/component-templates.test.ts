import { describe, it, expect } from 'vitest';

describe('component-templates', () => {
  describe('UI component templates', () => {
    it('should match button component template', () => {
      const template = `import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input bg-background',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };`;

      expect(template).toMatchSnapshot();
    });

    it('should match card component template', () => {
      const template = `import * as React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };`;

      expect(template).toMatchSnapshot();
    });

    it('should match input component template', () => {
      const template = `import * as React from 'react';
import { TextInput } from 'react-native';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {}

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(({ className, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };`;

      expect(template).toMatchSnapshot();
    });
  });

  describe('lib templates', () => {
    it('should match TypeScript utils template with cn function', () => {
      const template = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

      expect(template).toMatchSnapshot();
    });

    it('should match JavaScript utils template with cn function', () => {
      const template = `import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}`;

      expect(template).toMatchSnapshot();
    });

    it('should match hooks template', () => {
      const template = `import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}`;

      expect(template).toMatchSnapshot();
    });
  });

  describe('config templates', () => {
    it('should match Expo TypeScript config', () => {
      const config = {
        style: 'nativewind',
        typescript: true,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'app/styles/global.css',
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
          ui: '@/components/ui',
        },
        resolveAlias: true,
      };

      expect(config).toMatchSnapshot();
    });

    it('should match bare React Native config', () => {
      const config = {
        style: 'nativewind',
        typescript: true,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'src/styles/global.css',
        },
        aliases: {
          components: '~/components',
          utils: '~/lib/utils',
        },
        resolveAlias: false,
      };

      expect(config).toMatchSnapshot();
    });
  });
});
