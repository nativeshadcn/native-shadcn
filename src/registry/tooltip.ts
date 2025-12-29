export const tooltipTemplate = `import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

type TooltipContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined);

function useTooltip() {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip components must be used within <Tooltip>');
  }
  return context;
}

interface TooltipProps {
  children?: React.ReactNode;
  delayDuration?: number;
}

const Tooltip = ({ children, delayDuration = 200 }: TooltipProps) => {
  const [open, setOpen] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({
      open,
      onOpenChange: setOpen,
    }),
    [open]
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      <View className="relative">{children}</View>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ children, ...props }, ref) => {
  const { onOpenChange } = useTooltip();

  return (
    <Pressable
      ref={ref}
      onPressIn={() => onOpenChange(true)}
      onPressOut={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </Pressable>
  );
});
TooltipTrigger.displayName = 'TooltipTrigger';

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { open } = useTooltip();

  if (!open) return null;

  return (
    <View
      ref={ref}
      className={cn(
        'absolute bottom-full mb-2 rounded-md bg-foreground px-3 py-1.5 z-50',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-xs text-background">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
});
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent };
`;
