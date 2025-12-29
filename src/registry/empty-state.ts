export const emptyStateTemplate = `import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Empty State Context for composable architecture
type EmptyStateContextValue = {
  variant?: 'default' | 'inline' | 'card';
};

const EmptyStateContext = React.createContext<EmptyStateContextValue | undefined>(undefined);

function useEmptyState() {
  return React.useContext(EmptyStateContext);
}

// Root EmptyState Component
const emptyStateVariants = cva('items-center justify-center', {
  variants: {
    variant: {
      default: 'flex-1 px-6 py-12',
      inline: 'py-8 px-4',
      card: 'bg-card rounded-lg border border-border p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface EmptyStateProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof emptyStateVariants> {}

const EmptyState = React.forwardRef<React.ElementRef<typeof View>, EmptyStateProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <EmptyStateContext.Provider value={{ variant }}>
        <View
          ref={ref}
          className={cn(emptyStateVariants({ variant, className }))}
          {...props}
        />
      </EmptyStateContext.Provider>
    );
  }
);

EmptyState.displayName = 'EmptyState';

// EmptyState Icon
export interface EmptyStateIconProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}

const EmptyStateIcon = React.forwardRef<React.ElementRef<typeof View>, EmptyStateIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View ref={ref} className={cn('mb-4', className)} {...props}>
        {children}
      </View>
    );
  }
);

EmptyStateIcon.displayName = 'EmptyStateIcon';

// EmptyState Title
export interface EmptyStateTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const EmptyStateTitle = React.forwardRef<React.ElementRef<typeof Text>, EmptyStateTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn('text-lg font-semibold text-center text-foreground mb-2', className)}
        {...props}
      />
    );
  }
);

EmptyStateTitle.displayName = 'EmptyStateTitle';

// EmptyState Description
export interface EmptyStateDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const EmptyStateDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  EmptyStateDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn('text-sm text-center text-muted-foreground max-w-sm', className)}
      {...props}
    />
  );
});

EmptyStateDescription.displayName = 'EmptyStateDescription';

// EmptyState Actions
export interface EmptyStateActionsProps extends React.ComponentPropsWithoutRef<typeof View> {}

const EmptyStateActions = React.forwardRef<
  React.ElementRef<typeof View>,
  EmptyStateActionsProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn('mt-6 flex-row gap-2', className)} {...props} />;
});

EmptyStateActions.displayName = 'EmptyStateActions';

export {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
};
`;
