export const checkboxTemplate = `import * as React from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof Pressable>, CheckboxProps>(
  ({ className, checked = false, onCheckedChange, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        className={cn(
          'h-5 w-5 rounded border border-primary items-center justify-center',
          checked && 'bg-primary',
          className
        )}
        onPress={() => onCheckedChange?.(!checked)}
        {...props}
      >
        {checked && (
          <View className="h-3 w-3 bg-primary-foreground rounded-sm" />
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
`;
