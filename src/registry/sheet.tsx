import * as React from 'react';
import { Modal, View, Pressable, Text, Animated, PanResponder, Dimensions } from 'react-native';
import { cn } from '@/lib/utils';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type SheetContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextValue | undefined>(undefined);

type DraggableContextValue = {
  panHandlers: any;
};

const DraggableContext = React.createContext<DraggableContextValue | undefined>(undefined);

function useSheet() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('Sheet components must be used within <Sheet>');
  }
  return context;
}

function useDraggable() {
  return React.useContext(DraggableContext);
}

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Sheet = ({ open = false, onOpenChange, children }: SheetProps) => {
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
    <SheetContext.Provider value={contextValue}>
      <Modal
        visible={currentOpen}
        transparent
        animationType="slide"
        onRequestClose={() => handleOpenChange(false)}
      >
        {children}
      </Modal>
    </SheetContext.Provider>
  );
};

const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = useSheet();

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
SheetTrigger.displayName = 'SheetTrigger';

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, onPress, ...props }, ref) => {
  const { onOpenChange } = useSheet();

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
SheetOverlay.displayName = 'SheetOverlay';

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  draggable?: boolean;
  minHeight?: number;
  maxHeight?: number;
  initialHeight?: number;
  snapPoints?: number[];
  onHeightChange?: (height: number) => void;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof View>,
  SheetContentProps
>(({
  className,
  children,
  draggable = false,
  minHeight = 200,
  maxHeight = SCREEN_HEIGHT * 0.75,
  initialHeight,
  snapPoints,
  onHeightChange,
  ...props
}, ref) => {
  const defaultInitialHeight = initialHeight || (draggable ? minHeight : undefined);
  const sheetHeight = React.useRef(new Animated.Value(defaultInitialHeight || minHeight)).current;
  const startHeight = React.useRef(defaultInitialHeight || minHeight);

  // Get snap points (either custom or default min/max)
  const getSnapPoints = React.useCallback(() => {
    if (snapPoints && snapPoints.length > 0) {
      return snapPoints.sort((a, b) => a - b);
    }
    return [minHeight, maxHeight];
  }, [snapPoints, minHeight, maxHeight]);

  // Find nearest snap point
  const findNearestSnapPoint = React.useCallback(
    (currentHeight: number, velocity: number) => {
      const points = getSnapPoints();

      // If velocity is strong, snap in that direction
      if (velocity < -0.5) return points[points.length - 1]; // Fast swipe up -> max
      if (velocity > 0.5) return points[0]; // Fast swipe down -> min

      // Find nearest snap point
      return points.reduce((nearest, point) => {
        return Math.abs(point - currentHeight) < Math.abs(nearest - currentHeight)
          ? point
          : nearest;
      }, points[0]);
    },
    [getSnapPoints]
  );

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => draggable,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return draggable && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        startHeight.current = (sheetHeight as any)._value;
      },
      onPanResponderMove: (_, gestureState) => {
        if (!draggable) return;

        const newHeight = startHeight.current - gestureState.dy;

        // Allow movement within bounds with resistance
        if (newHeight >= minHeight && newHeight <= maxHeight) {
          sheetHeight.setValue(newHeight);
        } else if (newHeight < minHeight) {
          sheetHeight.setValue(minHeight - (minHeight - newHeight) * 0.3);
        } else if (newHeight > maxHeight) {
          sheetHeight.setValue(maxHeight + (newHeight - maxHeight) * 0.3);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!draggable) return;

        const currentHeight = (sheetHeight as any)._value;
        const targetHeight = findNearestSnapPoint(currentHeight, gestureState.vy);

        Animated.spring(sheetHeight, {
          toValue: targetHeight,
          useNativeDriver: false,
          damping: 25,
          stiffness: 120,
          mass: 0.8,
        }).start(() => {
          onHeightChange?.(targetHeight);
        });
      },
    })
  ).current;

  if (!draggable) {
    // Original non-draggable behavior
    return (
      <View className="flex-1 justify-end">
        <View
          ref={ref}
          className={cn(
            'rounded-t-3xl bg-background p-6 shadow-lg min-h-[50%]',
            className
          )}
          {...props}
        >
          {children}
        </View>
      </View>
    );
  }

  // Draggable behavior
  const draggableContextValue = React.useMemo(
    () => ({ panHandlers: panResponder.panHandlers }),
    [panResponder]
  );

  return (
    <View className="flex-1 justify-end">
      <Animated.View
        ref={ref}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: sheetHeight,
        }}
        className={cn('rounded-t-3xl bg-background shadow-lg', className)}
        {...props}
      >
        <DraggableContext.Provider value={draggableContextValue}>
          {children}
        </DraggableContext.Provider>
      </Animated.View>
    </View>
  );
});
SheetContent.displayName = 'SheetContent';

interface SheetDragHandleProps extends React.ComponentPropsWithoutRef<typeof View> {}

const SheetDragHandle = React.forwardRef<
  React.ElementRef<typeof View>,
  SheetDragHandleProps
>(({ className, ...props }, ref) => {
  const draggable = useDraggable();

  return (
    <View
      ref={ref}
      {...(draggable?.panHandlers || {})}
      className={cn('items-center py-3', className)}
      {...props}
    >
      <View className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
    </View>
  );
});
SheetDragHandle.displayName = 'SheetDragHandle';

const SheetHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('mb-4 text-center', className)} {...props} />
));
SheetHeader.displayName = 'SheetHeader';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-lg font-semibold text-foreground text-center', className)}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-sm text-muted-foreground text-center', className)}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

const SheetClose = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { onOpenChange } = useSheet();

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
SheetClose.displayName = 'SheetClose';

export {
  Sheet,
  SheetTrigger,
  SheetOverlay,
  SheetContent,
  SheetDragHandle,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
};
