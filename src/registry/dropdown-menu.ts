export const dropdownMenuTemplate = `import * as React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { cn } from '@/lib/utils';

type DropdownMenuContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | undefined>(undefined);

function useDropdownMenu() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('DropdownMenu components must be used within <DropdownMenu>');
  }
  return context;
}

interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const DropdownMenu = ({ open = false, onOpenChange, children }: DropdownMenuProps) => {
  const [internalOpen, setInternalOpen] = React.useState(open);

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const contextValue = React.useMemo(
    () => ({
      open: currentOpen,
      onOpenChange: handleOpenChange,
    }),
    [currentOpen, handleOpenChange]
  );

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <Modal
        visible={currentOpen}
        transparent
        animationType="fade"
        onRequestClose={() => handleOpenChange(false)}
      >
        {children}
      </Modal>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = useDropdownMenu();

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
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { onOpenChange } = useDropdownMenu();

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Pressable 
        className="absolute inset-0" 
        onPress={() => onOpenChange(false)}
      />
      <View
        ref={ref}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </View>
    </View>
  );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, children, onPress, ...props }, ref) => {
  const { onOpenChange } = useDropdownMenu();

  return (
    <Pressable
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none active:bg-accent',
        className
      )}
      onPress={(e) => {
        onPress?.(e);
        onOpenChange(false);
      }}
      {...props}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Pressable>
  );
});
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  >
    {typeof children === 'string' ? (
      <Text className="font-semibold">{children}</Text>
    ) : (
      children
    )}
  </View>
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
`;
