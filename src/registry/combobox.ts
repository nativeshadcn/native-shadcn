export const comboboxTemplate = `import * as React from 'react';
import { View, TextInput, ScrollView, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

type ComboboxContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  search: string;
  setSearch: (search: string) => void;
};

const ComboboxContext = React.createContext<ComboboxContextValue | undefined>(undefined);

function useCombobox() {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error('Combobox components must be used within <Combobox>');
  }
  return context;
}

interface ComboboxProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

const Combobox = ({ 
  open = false, 
  onOpenChange, 
  value, 
  onValueChange, 
  children 
}: ComboboxProps) => {
  const [internalOpen, setInternalOpen] = React.useState(open);
  const [search, setSearch] = React.useState('');

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const contextValue = React.useMemo(
    () => ({
      open: currentOpen,
      onOpenChange: handleOpenChange,
      value,
      onValueChange,
      search,
      setSearch,
    }),
    [currentOpen, handleOpenChange, value, onValueChange, search]
  );

  return (
    <ComboboxContext.Provider value={contextValue}>
      <View className="relative">{children}</View>
    </ComboboxContext.Provider>
  );
};

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = useCombobox();

  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onOpenChange(true);
        onPress?.(e);
      }}
      {...props}
    />
  );
});
ComboboxTrigger.displayName = 'ComboboxTrigger';

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, onChangeText, onFocus, ...props }, ref) => {
  const { search, setSearch, onOpenChange } = useCombobox();

  return (
    <TextInput
      ref={ref}
      value={search}
      onChangeText={(text) => {
        setSearch(text);
        onOpenChange(true);
        onChangeText?.(text);
      }}
      onFocus={(e) => {
        onOpenChange(true);
        onFocus?.(e);
      }}
      className={cn(
        'h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        className
      )}
      {...props}
    />
  );
});
ComboboxInput.displayName = 'ComboboxInput';

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useCombobox();

  if (!open) return null;

  return (
    <View
      ref={ref}
      className={cn(
        'absolute top-full left-0 right-0 z-50 mt-1 max-h-60 rounded-md border border-border bg-background shadow-lg',
        className
      )}
      {...props}
    >
      <ScrollView>{children}</ScrollView>
    </View>
  );
});
ComboboxContent.displayName = 'ComboboxContent';

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children = 'No results found.', ...props }, ref) => (
  <View
    ref={ref}
    className={cn('py-6 text-center text-sm', className)}
    {...props}
  >
    <Text className="text-muted-foreground">{children}</Text>
  </View>
));
ComboboxEmpty.displayName = 'ComboboxEmpty';

interface ComboboxItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  value: string;
  children: React.ReactNode;
}

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComboboxItemProps
>(({ className, value: itemValue, onPress, children, ...props }, ref) => {
  const { value, onValueChange, onOpenChange, search } = useCombobox();
  const isSelected = value === itemValue;

  // Filter logic
  const shouldShow = React.useMemo(() => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    const childText = typeof children === 'string' ? children : '';
    return childText.toLowerCase().includes(searchLower);
  }, [search, children]);

  if (!shouldShow) return null;

  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onValueChange?.(itemValue);
        onOpenChange(false);
        onPress?.(e);
      }}
      className={cn(
        'px-3 py-2 active:bg-accent',
        isSelected && 'bg-accent',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
});
ComboboxItem.displayName = 'ComboboxItem';

export { 
  Combobox, 
  ComboboxTrigger,
  ComboboxInput,
  ComboboxContent, 
  ComboboxEmpty,
  ComboboxItem,
};
`;
