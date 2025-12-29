export const skeletonTemplate = `import * as React from 'react';
import { View, Animated } from 'react-native';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.ComponentPropsWithoutRef<typeof View> {}

const Skeleton = React.forwardRef<React.ElementRef<typeof View>, SkeletonProps>(
  ({ className, ...props }, ref) => {
    const opacity = React.useRef(new Animated.Value(0.5)).current;

    React.useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }, []);

    return (
      <Animated.View
        ref={ref}
        style={{ opacity }}
        className={cn('rounded-md bg-muted', className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
`;
