import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ToggleProps
>(({ className, variant, size, pressed, onPressedChange, children, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        pressed && 'bg-accent text-accent-foreground',
        className
      )}
      onPress={() => onPressedChange?.(!pressed)}
      {...props}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Pressable>
  );
});

Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
