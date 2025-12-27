import * as React from 'react';
import { View, Modal, Pressable, Animated, Text } from 'react-native';
import { cn } from '@/lib/utils';

type DrawerContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DrawerContext = React.createContext<DrawerContextValue | undefined>(undefined);

function useDrawer() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within <Drawer>');
  }
  return context;
}

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Drawer = ({ open = false, onOpenChange, children }: DrawerProps) => {
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
    <DrawerContext.Provider value={contextValue}>
      <Modal
        visible={currentOpen}
        transparent
        animationType="none"
        onRequestClose={() => handleOpenChange(false)}
      >
        {children}
      </Modal>
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = useDrawer();

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
DrawerTrigger.displayName = 'DrawerTrigger';

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, onPress, ...props }, ref) => {
  const { onOpenChange } = useDrawer();

  return (
    <Pressable
      ref={ref}
      className={cn('flex-1 bg-black/50', className)}
      onPress={(e) => {
        onOpenChange(false);
        onPress?.(e);
      }}
      {...props}
    />
  );
});
DrawerOverlay.displayName = 'DrawerOverlay';

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { side?: 'left' | 'right' }
>(({ className, children, side = 'left', ...props }, ref) => {
  const [slideAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <View className="flex-1 flex-row">
      <DrawerOverlay />
      <Animated.View
        ref={ref}
        style={{
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: side === 'left' ? [-300, 0] : [300, 0],
              }),
            },
          ],
        }}
        className={cn(
          'h-full w-[80%] max-w-[400px] bg-background p-6 shadow-lg',
          side === 'right' && 'items-end',
          className
        )}
        {...props}
      >
        {children}
      </Animated.View>
    </View>
  );
});
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('flex flex-col space-y-2 mb-4', className)}
    {...props}
  />
));
DrawerHeader.displayName = 'DrawerHeader';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
));
DrawerTitle.displayName = 'DrawerTitle';

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DrawerDescription.displayName = 'DrawerDescription';

const DrawerFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto', className)}
    {...props}
  />
));
DrawerFooter.displayName = 'DrawerFooter';

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = useDrawer();

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
DrawerClose.displayName = 'DrawerClose';

export {
  Drawer,
  DrawerTrigger,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
};
