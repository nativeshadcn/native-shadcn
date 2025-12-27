import * as React from 'react';
import { View, Pressable, Modal, Animated } from 'react-native';
import { cn } from '@/lib/utils';

interface HoverCardProps {
  children: React.ReactNode;
}

const HoverCard = ({ children }: HoverCardProps) => {
  const [open, setOpen] = React.useState(false);
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: open ? 1 : 0.95,
        useNativeDriver: true,
      }),
    ]).start();
  }, [open]);

  return (
    <HoverCardContext.Provider value={{ open, setOpen, opacity, scale }}>
      {children}
    </HoverCardContext.Provider>
  );
};

interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  opacity: Animated.Value;
  scale: Animated.Value;
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null);

const useHoverCard = () => {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error('useHoverCard must be used within HoverCard');
  }
  return context;
};

interface HoverCardTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {}

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  HoverCardTriggerProps
>(({ className, onPress, onLongPress, ...props }, ref) => {
  const { setOpen } = useHoverCard();

  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        setOpen(true);
        onPress?.(e);
      }}
      onLongPress={(e) => {
        setOpen(true);
        onLongPress?.(e);
      }}
      className={cn(className)}
      {...props}
    />
  );
});
HoverCardTrigger.displayName = 'HoverCardTrigger';

interface HoverCardContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const { open, setOpen, opacity, scale } = useHoverCard();

  if (!open) return null;

  return (
    <Modal
      transparent
      visible={open}
      animationType="none"
      onRequestClose={() => setOpen(false)}
    >
      <Pressable
        className="flex-1 bg-black/50"
        onPress={() => setOpen(false)}
      >
        <View className="flex-1 items-center justify-center p-4">
          <Animated.View
            ref={ref}
            style={{
              opacity,
              transform: [{ scale }],
            }}
            className={cn(
              'z-50 w-64 rounded-md border border-border bg-popover p-4 shadow-md',
              className
            )}
            {...props}
          />
        </View>
      </Pressable>
    </Modal>
  );
});
HoverCardContent.displayName = 'HoverCardContent';

export { HoverCard, HoverCardTrigger, HoverCardContent };
