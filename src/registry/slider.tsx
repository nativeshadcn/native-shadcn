import * as React from 'react';
import { View, PanResponder, Animated } from 'react-native';
import { cn } from '@/lib/utils';

interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'> {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const Slider = React.forwardRef<React.ElementRef<typeof View>, SliderProps>(
  ({ className, value = 0, onValueChange, min = 0, max = 100, step = 1, disabled = false, ...props }, ref) => {
    const [sliderWidth, setSliderWidth] = React.useState(0);
    const [currentValue, setCurrentValue] = React.useState(value);
    const position = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    const panResponder = React.useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: () => {},
        onPanResponderMove: (_, gestureState) => {
          if (sliderWidth === 0) return;

          const percentage = Math.max(0, Math.min(1, gestureState.moveX / sliderWidth));
          const newValue = min + percentage * (max - min);
          const steppedValue = Math.round(newValue / step) * step;

          setCurrentValue(steppedValue);
          onValueChange?.(steppedValue);
        },
      })
    ).current;

    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
      <View
        ref={ref}
        className={cn('relative h-10 w-full justify-center', className)}
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        {...props}
      >
        <View
          className="h-2 w-full rounded-full bg-secondary"
          {...panResponder.panHandlers}
        >
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
          <View
            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-md"
            style={{ left: `${percentage}%`, marginLeft: -10 }}
          />
        </View>
      </View>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
