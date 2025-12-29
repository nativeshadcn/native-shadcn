export const accordionTemplate = `import * as React from 'react';
import { View, Pressable, Text } from 'react-native';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
}

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined
);

interface AccordionProps extends React.ComponentPropsWithoutRef<typeof View> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}

const Accordion = React.forwardRef<React.ElementRef<typeof View>, AccordionProps>(
  ({ type = 'single', defaultValue, ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<string[]>(
      Array.isArray(defaultValue)
        ? defaultValue
        : defaultValue
        ? [defaultValue]
        : []
    );

    const toggleItem = React.useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          if (type === 'single') {
            return prev.includes(value) ? [] : [value];
          } else {
            return prev.includes(value)
              ? prev.filter((item) => item !== value)
              : [...prev, value];
          }
        });
      },
      [type]
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <View ref={ref} {...props} />
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof View>,
  AccordionItemProps
>(({ className, value, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn('border-b border-border', className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value } as any);
        }
        return child;
      })}
    </View>
  );
});
AccordionItem.displayName = 'AccordionItem';

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  value?: string;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  AccordionTriggerProps
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');

  const isOpen = value ? context.openItems.includes(value) : false;

  return (
    <Pressable
      ref={ref}
      className={cn('flex flex-row items-center justify-between py-4', className)}
      onPress={() => value && context.toggleItem(value)}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium">{children}</Text>
      ) : (
        children
      )}
      <Text className="text-muted-foreground">{isOpen ? '▲' : '▼'}</Text>
    </Pressable>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  value?: string;
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof View>,
  AccordionContentProps
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');

  const isOpen = value ? context.openItems.includes(value) : false;

  if (!isOpen) return null;

  return (
    <View
      ref={ref}
      className={cn('pb-4 pt-0', className)}
      {...props}
    />
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
`;
