export const loaderTemplate = `import * as React from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const loaderVariants = cva('items-center justify-center', {
  variants: {
    variant: {
      default: 'flex-1',
      inline: 'py-4',
      overlay: 'absolute inset-0 bg-background/80',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface LoaderProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof loaderVariants> {
  type?: 'dots' | 'spinner' | 'pulse';
  message?: string;
}

const Loader = React.forwardRef<React.ElementRef<typeof View>, LoaderProps>(
  ({ type = 'dots', message, variant, size, className, ...props }, ref) => {
    return (
      <View ref={ref} className={cn(loaderVariants({ variant, size, className }))} {...props}>
        {type === 'dots' && <LoaderDots size={size} />}
        {type === 'spinner' && <LoaderSpinner size={size} />}
        {type === 'pulse' && <LoaderPulse size={size} />}

        {message && (
          <Text className="mt-6 text-sm font-medium text-muted-foreground">{message}</Text>
        )}
      </View>
    );
  }
);

Loader.displayName = 'Loader';

// Dots Loader (Wise-style)
interface LoaderDotsProps {
  size?: 'sm' | 'default' | 'lg' | null;
}

const LoaderDots: React.FC<LoaderDotsProps> = ({ size }) => {
  const dot1 = React.useRef(new Animated.Value(0)).current;
  const dot2 = React.useRef(new Animated.Value(0)).current;
  const dot3 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const createAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = createAnimation(dot1, 0);
    const anim2 = createAnimation(dot2, 150);
    const anim3 = createAnimation(dot3, 300);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  const dotSize = size === 'sm' ? 6 : size === 'lg' ? 16 : 12;
  const spacing = size === 'sm' ? 4 : size === 'lg' ? 12 : 8;

  const renderDot = (animatedValue: Animated.Value) => (
    <Animated.View
      style={{
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        opacity: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        }),
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1.2],
            }),
          },
        ],
      }}
      className="bg-primary"
    />
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing }}>
      {renderDot(dot1)}
      {renderDot(dot2)}
      {renderDot(dot3)}
    </View>
  );
};

// Spinner Loader
const LoaderSpinner: React.FC<LoaderDotsProps> = ({ size }) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const spinnerSize = size === 'sm' ? 20 : size === 'lg' ? 48 : 32;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        width: spinnerSize,
        height: spinnerSize,
        borderRadius: spinnerSize / 2,
        borderWidth: 3,
        borderTopColor: 'transparent',
        transform: [{ rotate: spin }],
      }}
      className="border-primary"
    />
  );
};

// Pulse Loader
const LoaderPulse: React.FC<LoaderDotsProps> = ({ size }) => {
  const pulseValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const pulseSize = size === 'sm' ? 24 : size === 'lg' ? 64 : 40;

  return (
    <Animated.View
      style={{
        width: pulseSize,
        height: pulseSize,
        borderRadius: pulseSize / 2,
        opacity: pulseValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        }),
        transform: [
          {
            scale: pulseValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1.2],
            }),
          },
        ],
      }}
      className="bg-primary"
    />
  );
};

export { Loader, LoaderDots, LoaderSpinner, LoaderPulse };
`;
