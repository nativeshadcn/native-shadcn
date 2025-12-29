export const contextMenuTemplate = `import * as React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { cn } from '@/lib/utils';

type ContextMenuContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ContextMenuContext = React.createContext<ContextMenuContextValue | undefined>(undefined);

function useContextMenu() {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error('ContextMenu components must be used within <ContextMenu>');
  }
  return context;
}

interface ContextMenuProps {
  children?: React.ReactNode;
}

const ContextMenu = ({ children }: ContextMenuProps) => {
  const [open, setOpen] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({
      open,
      onOpenChange: setOpen,
    }),
    [open]
  );

  return (
    <ContextMenuContext.Provider value={contextValue}>
      <View>{children}</View>
    </ContextMenuContext.Provider>
  );
};

const ContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onLongPress, children, ...props }, ref) => {
  const { onOpenChange } = useContextMenu();

  return (
    <Pressable
      ref={ref}
      onLongPress={(e) => {
        onOpenChange(true);
        onLongPress?.(e);
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
});
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useContextMenu();

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
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
    </Modal>
  );
});
ContextMenuContent.displayName = 'ContextMenuContent';

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, children, onPress, ...props }, ref) => {
  const { onOpenChange } = useContextMenu();

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
ContextMenuItem.displayName = 'ContextMenuItem';

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
};
`;
