import * as React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Error State Context
type ErrorStateContextValue = {
  variant?: 'default' | 'inline' | 'minimal';
};

const ErrorStateContext = React.createContext<ErrorStateContextValue | undefined>(undefined);

// Root ErrorState Component
const errorStateVariants = cva('items-center justify-center', {
  variants: {
    variant: {
      default: 'flex-1 px-8 py-12',
      inline: 'py-6 px-4',
      minimal: 'py-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ErrorStateProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof errorStateVariants> {}

const ErrorState = React.forwardRef<React.ElementRef<typeof View>, ErrorStateProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <ErrorStateContext.Provider value={{ variant }}>
        <View
          ref={ref}
          className={cn(errorStateVariants({ variant, className }))}
          {...props}
        />
      </ErrorStateContext.Provider>
    );
  }
);

ErrorState.displayName = 'ErrorState';

// ErrorState Icon Container
const errorStateIconVariants = cva('rounded-full items-center justify-center mb-4', {
  variants: {
    variant: {
      default: 'w-20 h-20 bg-destructive/10',
      danger: 'w-20 h-20 bg-red-50',
      warning: 'w-20 h-20 bg-yellow-50',
      info: 'w-20 h-20 bg-blue-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ErrorStateIconProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof errorStateIconVariants> {
  children: React.ReactNode;
}

const ErrorStateIcon = React.forwardRef<React.ElementRef<typeof View>, ErrorStateIconProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(errorStateIconVariants({ variant, className }))}
        {...props}
      >
        {children}
      </View>
    );
  }
);

ErrorStateIcon.displayName = 'ErrorStateIcon';

// ErrorState Title
export interface ErrorStateTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const ErrorStateTitle = React.forwardRef<React.ElementRef<typeof Text>, ErrorStateTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn('text-xl font-semibold text-center text-foreground mb-2', className)}
        {...props}
      />
    );
  }
);

ErrorStateTitle.displayName = 'ErrorStateTitle';

// ErrorState Description
export interface ErrorStateDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const ErrorStateDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  ErrorStateDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn('text-sm text-center text-muted-foreground mb-6 max-w-sm', className)}
      {...props}
    />
  );
});

ErrorStateDescription.displayName = 'ErrorStateDescription';

// ErrorState Actions
export interface ErrorStateActionsProps extends React.ComponentPropsWithoutRef<typeof View> {}

const ErrorStateActions = React.forwardRef<
  React.ElementRef<typeof View>,
  ErrorStateActionsProps
>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn('flex-row gap-2', className)} {...props} />;
});

ErrorStateActions.displayName = 'ErrorStateActions';

export {
  ErrorState,
  ErrorStateIcon,
  ErrorStateTitle,
  ErrorStateDescription,
  ErrorStateActions,
};
