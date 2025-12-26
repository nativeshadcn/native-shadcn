export const dialogTemplate = `import * as React from 'react';
import { Modal, View, Pressable, Text } from 'react-native';
import { cn } from '@/lib/utils';

type DialogContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined);

function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within <Dialog>');
  }
  return context;
}

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Dialog = ({ open = false, onOpenChange, children }: DialogProps) => {
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
    <DialogContext.Provider value={contextValue}>
      <Modal
        visible={currentOpen}
        transparent
        animationType="fade"
        onRequestClose={() => handleOpenChange(false)}
      >
        {children}
      </Modal>
    </DialogContext.Provider>
  );
};

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = useDialog();

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
DialogTrigger.displayName = 'DialogTrigger';

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, onPress, ...props }, ref) => {
  const { onOpenChange } = useDialog();

  return (
    <Pressable
      ref={ref}
      className={cn('absolute inset-0 bg-black/50', className)}
      onPress={(e) => {
        onOpenChange(false);
        onPress?.(e);
      }}
      {...props}
    />
  );
});
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => (
  <View className="flex-1 items-center justify-center p-4">
    <View
      ref={ref}
      className={cn(
        'w-full max-w-lg rounded-lg bg-background p-6 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </View>
  </View>
));
DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('mb-4', className)} {...props} />
));
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

const DialogFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('mt-4 flex flex-row justify-end gap-2', className)}
    {...props}
  />
));
DialogFooter.displayName = 'DialogFooter';

const DialogClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = useDialog();

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
DialogClose.displayName = 'DialogClose';

export {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
`;
