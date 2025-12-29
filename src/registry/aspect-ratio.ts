export const aspectRatioTemplate = `import * as React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof View> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof View>,
  AspectRatioProps
>(({ ratio = 1, className, children, style, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn('relative w-full', className)}
      style={[{ aspectRatio: ratio }, style]}
      {...props}
    >
      {children}
    </View>
  );
});
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
export type { AspectRatioProps };
`;
