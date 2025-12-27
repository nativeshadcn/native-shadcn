import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const selectionCardVariants = cva(
  'rounded-lg border-2 transition-colors active:opacity-80',
  {
    variants: {
      variant: {
        default: 'bg-card',
        outline: 'bg-transparent',
      },
      selected: {
        true: 'border-primary bg-primary/5',
        false: 'border-border',
      },
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      selected: false,
      size: 'default',
    },
  }
);

export interface SelectionCardProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof selectionCardVariants> {
  children?: React.ReactNode;
  selected?: boolean;
}

const SelectionCard = React.forwardRef<React.ElementRef<typeof Pressable>, SelectionCardProps>(
  ({ className, variant, selected, size, ...props }, ref) => (
    <Pressable
      ref={ref}
      className={cn(selectionCardVariants({ variant, selected, size, className }))}
      {...props}
    />
  )
);

SelectionCard.displayName = 'SelectionCard';

// Selection Card Icon
export interface SelectionCardIconProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}

const SelectionCardIcon = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectionCardIconProps
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('w-10 h-10 rounded-full bg-primary/10 items-center justify-center', className)}
    {...props}
  >
    {children}
  </View>
));

SelectionCardIcon.displayName = 'SelectionCardIcon';

// Selection Card Header
export interface SelectionCardHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {}

const SelectionCardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectionCardHeaderProps
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex-row items-center justify-between', className)} {...props} />
));

SelectionCardHeader.displayName = 'SelectionCardHeader';

// Selection Card Title
export interface SelectionCardTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const SelectionCardTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  SelectionCardTitleProps
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('text-base font-semibold text-foreground', className)} {...props} />
));

SelectionCardTitle.displayName = 'SelectionCardTitle';

// Selection Card Description
export interface SelectionCardDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const SelectionCardDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  SelectionCardDescriptionProps
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('text-sm text-muted-foreground mt-1', className)} {...props} />
));

SelectionCardDescription.displayName = 'SelectionCardDescription';

// Selection Card Content (Left side)
export interface SelectionCardContentProps extends React.ComponentPropsWithoutRef<typeof View> {}

const SelectionCardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectionCardContentProps
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex-row items-center flex-1', className)} {...props} />
));

SelectionCardContent.displayName = 'SelectionCardContent';

// Selection Card Value (Right side)
export interface SelectionCardValueProps extends React.ComponentPropsWithoutRef<typeof View> {}

const SelectionCardValue = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectionCardValueProps
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('items-end', className)} {...props} />
));

SelectionCardValue.displayName = 'SelectionCardValue';

// Selection Card Indicator (Checkmark)
export interface SelectionCardIndicatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  children?: React.ReactNode;
}

const SelectionCardIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  SelectionCardIndicatorProps
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('w-6 h-6 rounded-full bg-primary items-center justify-center mt-1', className)}
    {...props}
  >
    {children || <Text className="text-primary-foreground text-sm">✓</Text>}
  </View>
));

SelectionCardIndicator.displayName = 'SelectionCardIndicator';

export {
  SelectionCard,
  SelectionCardIcon,
  SelectionCardHeader,
  SelectionCardTitle,
  SelectionCardDescription,
  SelectionCardContent,
  SelectionCardValue,
  SelectionCardIndicator,
};
