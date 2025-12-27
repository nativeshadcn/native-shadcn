import * as React from 'react';
import { View, TextInput, ScrollView, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

type CommandContextValue = {
  search: string;
  setSearch: (search: string) => void;
  filtered: Set<string>;
  onItemSelect?: (value: string) => void;
};

const CommandContext = React.createContext<CommandContextValue | undefined>(undefined);

function useCommand() {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error('Command components must be used within <Command>');
  }
  return context;
}

interface CommandProps extends React.ComponentPropsWithoutRef<typeof View> {
  onValueChange?: (value: string) => void;
  filter?: (value: string, search: string) => boolean;
}

const Command = React.forwardRef<
  React.ElementRef<typeof View>,
  CommandProps
>(({ className, children, onValueChange, filter, ...props }, ref) => {
  const [search, setSearch] = React.useState('');
  const [filtered] = React.useState(new Set<string>());

  const contextValue = React.useMemo(
    () => ({
      search,
      setSearch,
      filtered,
      onItemSelect: onValueChange,
    }),
    [search, filtered, onValueChange]
  );

  return (
    <CommandContext.Provider value={contextValue}>
      <View
        ref={ref}
        className={cn(
          'flex h-full w-full flex-col overflow-hidden rounded-md bg-background',
          className
        )}
        {...props}
      >
        {children}
      </View>
    </CommandContext.Provider>
  );
});
Command.displayName = 'Command';

const CommandDialog = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <View className="flex-1 justify-center bg-black/50 px-4">
        <View className="overflow-hidden rounded-md bg-popover">
          {children}
        </View>
      </View>
    </Modal>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, onChangeText, ...props }, ref) => {
  const { setSearch } = useCommand();

  return (
    <View className="flex items-center border-b border-border px-3">
      <TextInput
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground',
          className
        )}
        onChangeText={(text) => {
          setSearch(text);
          onChangeText?.(text);
        }}
        {...props}
      />
    </View>
  );
});
CommandInput.displayName = 'CommandInput';

const CommandList = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  React.ComponentPropsWithoutRef<typeof ScrollView>
>(({ className, ...props }, ref) => (
  <ScrollView
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto', className)}
    {...props}
  />
));
CommandList.displayName = 'CommandList';

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children = 'No results found.', ...props }, ref) => {
  const { search } = useCommand();

  if (!search) return null;

  return (
    <View
      ref={ref}
      className={cn('py-6 text-center text-sm', className)}
      {...props}
    >
      <Text className="text-muted-foreground">{children}</Text>
    </View>
  );
});
CommandEmpty.displayName = 'CommandEmpty';

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { heading?: string }
>(({ className, heading, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('overflow-hidden p-1', className)}
    {...props}
  >
    {heading && (
      <Text className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
        {heading}
      </Text>
    )}
    {children}
  </View>
));
CommandGroup.displayName = 'CommandGroup';

interface CommandItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  value?: string;
  keywords?: string[];
}

const CommandItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CommandItemProps
>(({ className, value, keywords, onPress, children, ...props }, ref) => {
  const { search, onItemSelect } = useCommand();

  const shouldShow = React.useMemo(() => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    const valueLower = value?.toLowerCase() || '';
    const keywordsMatch = keywords?.some(k => k.toLowerCase().includes(searchLower));
    
    return valueLower.includes(searchLower) || keywordsMatch;
  }, [search, value, keywords]);

  if (!shouldShow) return null;

  return (
    <Pressable
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none active:bg-accent active:text-accent-foreground',
        className
      )}
      onPress={(e) => {
        if (value && onItemSelect) {
          onItemSelect(value);
        }
        onPress?.(e);
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
});
CommandItem.displayName = 'CommandItem';

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = 'CommandSeparator';

const CommandShortcut = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <Text
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
    >
      {children}
    </Text>
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
};
