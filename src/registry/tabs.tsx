import * as React from 'react';
import { View, Pressable, Text } from 'react-native';
import { cn } from '@/lib/utils';

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

interface TabsProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string;
  onValueChange: (value: string) => void;
}

const Tabs = React.forwardRef<React.ElementRef<typeof View>, TabsProps>(
  ({ value, onValueChange, ...props }, ref) => {
    return (
      <TabsContext.Provider value={{ value, onValueChange }}>
        <View ref={ref} {...props} />
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'flex flex-row items-center justify-center rounded-md bg-muted p-1',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  value: string;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  TabsTriggerProps
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.value === value;

  return (
    <Pressable
      ref={ref}
      className={cn(
        'flex-1 items-center justify-center rounded-sm px-3 py-1.5',
        isActive && 'bg-background shadow-sm',
        className
      )}
      onPress={() => context.onValueChange(value)}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          className={cn(
            'text-sm font-medium',
            isActive ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
});
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string;
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof View>,
  TabsContentProps
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.value !== value) return null;

  return (
    <View
      ref={ref}
      className={cn('mt-2', className)}
      {...props}
    />
  );
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
