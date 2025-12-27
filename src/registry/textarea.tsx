import * as React from 'react';
import { TextInput } from 'react-native';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextareaProps
>(({ className, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
