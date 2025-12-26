export const inputTemplate = `import * as React from 'react';
import { TextInput } from 'react-native';
import { cn } from '@/lib/utils';

export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderTextColor, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'h-10 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground web:focus:outline-none web:focus:ring-2 web:focus:ring-ring',
          className
        )}
        placeholderTextColor={placeholderTextColor ?? '#a1a1aa'}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
`;
