import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { cn } from '@/lib/utils';

interface TableProps extends React.ComponentPropsWithoutRef<typeof View> {}

const Table = React.forwardRef<React.ElementRef<typeof View>, TableProps>(
  ({ className, ...props }, ref) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      />
    </ScrollView>
  )
);
Table.displayName = 'Table';

interface TableHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {}

const TableHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  TableHeaderProps
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('border-b border-border', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

interface TableBodyProps extends React.ComponentPropsWithoutRef<typeof View> {}

const TableBody = React.forwardRef<
  React.ElementRef<typeof View>,
  TableBodyProps
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn(className)} {...props} />
));
TableBody.displayName = 'TableBody';

interface TableFooterProps extends React.ComponentPropsWithoutRef<typeof View> {}

const TableFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  TableFooterProps
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('border-t border-border bg-muted/50', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

interface TableRowProps extends React.ComponentPropsWithoutRef<typeof View> {}

const TableRow = React.forwardRef<React.ElementRef<typeof View>, TableRowProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        'flex-row border-b border-border transition-colors',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

interface TableHeadProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const TableHead = React.forwardRef<React.ElementRef<typeof Text>, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn(
        'flex-1 px-4 py-3 text-left align-middle font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

interface TableCellProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const TableCell = React.forwardRef<React.ElementRef<typeof Text>, TableCellProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('flex-1 px-4 py-3 align-middle', className)}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

interface TableCaptionProps extends React.ComponentPropsWithoutRef<typeof Text> {}

const TableCaption = React.forwardRef<
  React.ElementRef<typeof Text>,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
