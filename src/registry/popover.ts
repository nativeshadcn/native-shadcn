export const popoverTemplate = `import * as React from 'react';
import { Modal, View, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

type PopoverContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PopoverContext = React.createContext<PopoverContextValue | undefined>(undefined);

function usePopover() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within <Popover>');
  }
  return context;
}

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Popover = ({ open = false, onOpenChange, children }: PopoverProps) => {
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
    <PopoverContext.Provider value={contextValue}>
      <Modal
        visible={currentOpen}
        transparent
        animationType="fade"
        onRequestClose={() => handleOpenChange(false)}
      >
        {children}
      </Modal>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = usePopover();

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
PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { onOpenChange } = usePopover();

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Pressable 
        className="absolute inset-0" 
        onPress={() => onOpenChange(false)}
      />
      <View
        ref={ref}
        className={cn(
          'rounded-lg bg-background p-4 shadow-lg border border-border',
          className
        )}
        {...props}
      >
        {children}
      </View>
    </View>
  );
});
PopoverContent.displayName = 'PopoverContent';

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = usePopover();

  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onOpenChange(false);
        onPress?.(e);
      }}
      {...props}
    />
  );
});
PopoverClose.displayName = 'PopoverClose';

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
`;
