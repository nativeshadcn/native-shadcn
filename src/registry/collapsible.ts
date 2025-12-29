export const collapsibleTemplate = `import * as React from 'react';
import { View, Animated, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

type CollapsibleContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CollapsibleContext = React.createContext<CollapsibleContextValue | undefined>(undefined);

function useCollapsible() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error('Collapsible components must be used within <Collapsible>');
  }
  return context;
}

interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

const Collapsible = ({ open = false, onOpenChange, children, className }: CollapsibleProps) => {
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
    <CollapsibleContext.Provider value={contextValue}>
      <View className={cn(className)}>{children}</View>
    </CollapsibleContext.Provider>
  );
};

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, onPress, ...props }, ref) => {
  const { open, onOpenChange } = useCollapsible();

  return (
    <Pressable
      ref={ref}
      className={cn(className)}
      onPress={(e) => {
        onOpenChange(!open);
        onPress?.(e);
      }}
      {...props}
    />
  );
});
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof View> {}

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof View>,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const { open } = useCollapsible();
  const [height] = React.useState(new Animated.Value(open ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(height, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [open, height]);

  return (
    <Animated.View
      ref={ref}
      style={{
        maxHeight: height.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1000],
        }),
        opacity: height,
      }}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {children}
    </Animated.View>
  );
});
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
`;
