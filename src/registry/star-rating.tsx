import * as React from 'react';
import { View, Pressable, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const starRatingVariants = cva('flex-row items-center', {
  variants: {
    size: {
      sm: 'gap-0.5',
      default: 'gap-1',
      lg: 'gap-1.5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface StarRatingProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof starRatingVariants> {
  rating: number;
  maxRating?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
  valuePosition?: 'left' | 'right';
  renderStar?: (filled: boolean, index: number) => React.ReactNode;
  allowHalf?: boolean;
}

const StarRating = React.forwardRef<React.ElementRef<typeof View>, StarRatingProps>(
  (
    {
      rating,
      maxRating = 5,
      interactive = false,
      onRatingChange,
      showValue = false,
      valuePosition = 'right',
      renderStar,
      allowHalf = true,
      size,
      className,
      ...props
    },
    ref
  ) => {
    const [hoverRating, setHoverRating] = React.useState(0);
    const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

    const handlePress = (starIndex: number) => {
      if (interactive && onRatingChange) {
        onRatingChange(starIndex);
      }
    };

    const starSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

    const defaultStarRender = (index: number) => {
      const starPosition = index + 1;
      const difference = displayRating - starPosition;
      const isHalf = allowHalf && difference > -1 && difference < 0;
      const isFull = difference >= 0;

      const StarComponent = interactive ? Pressable : View;

      return (
        <StarComponent
          key={index}
          onPress={() => handlePress(starPosition)}
          disabled={!interactive}
        >
          {/* Full Star */}
          {isFull && (
            <Text style={{ fontSize: starSize, lineHeight: starSize + 4 }}>★</Text>
          )}
          {/* Half Star */}
          {isHalf && (
            <Text style={{ fontSize: starSize, lineHeight: starSize + 4 }}>⯨</Text>
          )}
          {/* Empty Star */}
          {!isFull && !isHalf && (
            <Text
              style={{ fontSize: starSize, lineHeight: starSize + 4 }}
              className="text-muted"
            >
              ☆
            </Text>
          )}
        </StarComponent>
      );
    };

    return (
      <View ref={ref} className={cn(starRatingVariants({ size, className }))} {...props}>
        {showValue && valuePosition === 'left' && (
          <Text className="text-sm font-medium text-foreground mr-2">
            {displayRating.toFixed(1)}
          </Text>
        )}

        <View className="flex-row">
          {Array.from({ length: maxRating }).map((_, index) =>
            renderStar ? renderStar(displayRating >= index + 1, index) : defaultStarRender(index)
          )}
        </View>

        {showValue && valuePosition === 'right' && (
          <Text className="text-sm font-medium text-foreground ml-2">
            {displayRating.toFixed(1)}
          </Text>
        )}
      </View>
    );
  }
);

StarRating.displayName = 'StarRating';

// Interactive Star Rating Input
export interface StarRatingInputProps extends Omit<StarRatingProps, 'interactive'> {
  value: number;
  onValueChange: (value: number) => void;
}

const StarRatingInput = React.forwardRef<React.ElementRef<typeof View>, StarRatingInputProps>(
  ({ value, onValueChange, ...props }, ref) => {
    return (
      <StarRating
        ref={ref}
        rating={value}
        interactive
        onRatingChange={onValueChange}
        {...props}
      />
    );
  }
);

StarRatingInput.displayName = 'StarRatingInput';

export { StarRating, StarRatingInput };
