export const selectTemplate = `import * as React from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Select Context - INTERNAL ONLY (like shadcn/ui)
type SelectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined);

// Hook is INTERNAL - not exported!
function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error('Select components must be used within <Select>');
  return context;
}

// Root Select Component
export interface SelectProps extends React.ComponentPropsWithoutRef<typeof View> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<React.ElementRef<typeof View>, SelectProps>(
  ({ value, onValueChange, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    return (
      <SelectContext.Provider value={{ open, setOpen, value, onValueChange }}>
        <View ref={ref} {...props}>{children}</View>
      </SelectContext.Provider>
    );
  }
);
Select.displayName = 'Select';

// Select Trigger
const selectTriggerVariants = cva(
  'h-10 rounded-md border px-3 py-2 flex-row items-center justify-between active:opacity-80',
  { variants: { variant: { default: 'border-input bg-background' } }, defaultVariants: { variant: 'default' } }
);

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable>, VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<React.ElementRef<typeof Pressable>, SelectTriggerProps>(
  ({ className, variant, children, ...props }, ref) => {
    const { setOpen } = useSelectContext();
    return <Pressable ref={ref} onPress={() => setOpen(true)} className={cn(selectTriggerVariants({ variant, className }))} {...props}>{children}</Pressable>;
  }
);
SelectTrigger.displayName = 'SelectTrigger';

// Select Value
export interface SelectValueProps extends React.ComponentPropsWithoutRef<typeof Text> {
  placeholder?: string;
}

const SelectValue = React.forwardRef<React.ElementRef<typeof Text>, SelectValueProps>(
  ({ className, placeholder, ...props }, ref) => {
    const { value } = useSelectContext();
    return <Text ref={ref} className={cn('text-base flex-1', !value && 'text-muted-foreground', className)} {...props}>{value || placeholder || 'Select...'}</Text>;
  }
);
SelectValue.displayName = 'SelectValue';

// Select Content
export interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof View> {}

const SelectContent = React.forwardRef<React.ElementRef<typeof View>, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();

    return (
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/50 items-center justify-center" onPress={() => setOpen(false)}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View ref={ref} className={cn('w-80 max-h-96 bg-background rounded-lg shadow-lg border border-border', className)} {...props}>
              <ScrollView>{children}</ScrollView>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }
);
SelectContent.displayName = 'SelectContent';

// Select Item
export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  value: string;
  label?: string;
}

const SelectItem = React.forwardRef<React.ElementRef<typeof Pressable>, SelectItemProps>(
  ({ className, value: itemValue, label, children, ...props }, ref) => {
    const { value, onValueChange, setOpen } = useSelectContext();
    const isSelected = value === itemValue;
    return (
      <Pressable ref={ref} className={cn('px-4 py-3 border-b border-border active:bg-accent', isSelected && 'bg-accent', className)} onPress={() => { onValueChange?.(itemValue); setOpen(false); }} {...props}>
        {children || <Text className="text-base text-foreground">{label || itemValue}</Text>}
      </Pressable>
    );
  }
);
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
`;
