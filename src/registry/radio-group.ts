export const radioGroupTemplate = `import * as React from 'react';
import { View, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type RadioGroupContextValue = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

function useRadioGroup() {
  const context = React.useContext(RadioGroupContext);
  if (!context) throw new Error('RadioGroup components must be used within <RadioGroup>');
  return context;
}

// Root RadioGroup
export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<React.ElementRef<typeof View>, RadioGroupProps>(
  ({ value, onValueChange, className, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <View ref={ref} className={cn('gap-2', className)} {...props} />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

// RadioGroup Item
const radioGroupItemVariants = cva(
  'h-5 w-5 rounded-full border-2 border-primary items-center justify-center',
  {
    variants: {
      checked: {
        true: 'bg-primary',
        false: 'bg-background',
      },
    },
    defaultVariants: { checked: false },
  }
);

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof radioGroupItemVariants> {
  value: string;
}

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof Pressable>, RadioGroupItemProps>(
  ({ className, value: itemValue, ...props }, ref) => {
    const { value, onValueChange } = useRadioGroup();
    const isChecked = value === itemValue;

    return (
      <Pressable
        ref={ref}
        className={cn(radioGroupItemVariants({ checked: isChecked, className }))}
        onPress={() => onValueChange?.(itemValue)}
        role="radio"
        {...props}
      >
        {isChecked && <View className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />}
      </Pressable>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
`;
