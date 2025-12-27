import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const menuItemVariants = cva(
  'flex-row items-center px-4 py-3 active:bg-accent transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-background',
        ghost: '',
        card: 'bg-card rounded-lg border border-border',
      },
      hasBorder: {
        true: 'border-b border-border',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hasBorder: true,
    },
  }
);

export interface MenuItemProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof menuItemVariants> {
  children?: React.ReactNode;
}

const MenuItem = React.forwardRef<React.ElementRef<typeof Pressable>, MenuItemProps>(
  ({ className, variant, hasBorder, ...props }, ref) => (
    <Pressable
      ref={ref}
      className={cn(menuItemVariants({ variant, hasBorder, className }))}
      {...props}
    />
  )
);

MenuItem.displayName = 'MenuItem';

// Menu Item Icon
export interface MenuItemIconProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}

const MenuItemIcon = React.forwardRef<React.ElementRef<typeof View>, MenuItemIconProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} className={cn('mr-3', className)} {...props}>
      {children}
    </View>
  )
);

MenuItemIcon.displayName = 'MenuItemIcon';

// Menu Item Label
export interface MenuItemLabelProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const MenuItemLabel = React.forwardRef<React.ElementRef<typeof Text>, MenuItemLabelProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('flex-1 text-base text-foreground', className)}
      {...props}
    />
  )
);

MenuItemLabel.displayName = 'MenuItemLabel';

// Menu Item Description
export interface MenuItemDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const MenuItemDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  MenuItemDescriptionProps
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-sm text-muted-foreground mt-0.5', className)}
    {...props}
  />
));

MenuItemDescription.displayName = 'MenuItemDescription';

// Menu Item Content (for label + description combo)
export interface MenuItemContentProps extends React.ComponentPropsWithoutRef<typeof View> {}

const MenuItemContent = React.forwardRef<React.ElementRef<typeof View>, MenuItemContentProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('flex-1', className)} {...props} />
  )
);

MenuItemContent.displayName = 'MenuItemContent';

// Menu Item Action (right side content)
export interface MenuItemActionProps extends React.ComponentPropsWithoutRef<typeof View> {}

const MenuItemAction = React.forwardRef<React.ElementRef<typeof View>, MenuItemActionProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('ml-3', className)} {...props} />
  )
);

MenuItemAction.displayName = 'MenuItemAction';

export {
  MenuItem,
  MenuItemIcon,
  MenuItemLabel,
  MenuItemDescription,
  MenuItemContent,
  MenuItemAction,
};
