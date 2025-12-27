import * as React from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { cn } from '@/lib/utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Carousel Context for composable architecture
type CarouselContextValue = {
  scrollViewRef: React.RefObject<ScrollView>;
  currentIndex: number;
  itemCount: number;
  itemWidth: number;
  scrollToIndex: (index: number) => void;
  scrollToNext: () => void;
  scrollToPrevious: () => void;
};

const CarouselContext = React.createContext<CarouselContextValue | undefined>(
  undefined
);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel components must be used within <Carousel>');
  }
  return context;
}

// Root Carousel Component
export interface CarouselProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  itemWidth?: number;
  onIndexChange?: (index: number) => void;
}

const Carousel = React.forwardRef<React.ElementRef<typeof View>, CarouselProps>(
  ({ children, itemWidth = SCREEN_WIDTH, onIndexChange, className, ...props }, ref) => {
    const scrollViewRef = React.useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [itemCount, setItemCount] = React.useState(0);

    const scrollToIndex = React.useCallback(
      (index: number) => {
        if (scrollViewRef.current && index >= 0 && index < itemCount) {
          scrollViewRef.current.scrollTo({
            x: index * itemWidth,
            animated: true,
          });
        }
      },
      [itemWidth, itemCount]
    );

    const scrollToNext = React.useCallback(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < itemCount) {
        scrollToIndex(nextIndex);
      }
    }, [currentIndex, itemCount, scrollToIndex]);

    const scrollToPrevious = React.useCallback(() => {
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        scrollToIndex(prevIndex);
      }
    }, [currentIndex, scrollToIndex]);

    const contextValue = React.useMemo(
      () => ({
        scrollViewRef,
        currentIndex,
        itemCount,
        itemWidth,
        scrollToIndex,
        scrollToNext,
        scrollToPrevious,
      }),
      [currentIndex, itemCount, itemWidth, scrollToIndex, scrollToNext, scrollToPrevious]
    );

    React.useEffect(() => {
      onIndexChange?.(currentIndex);
    }, [currentIndex, onIndexChange]);

    return (
      <CarouselContext.Provider value={contextValue}>
        <View ref={ref} className={cn('relative', className)} {...props}>
          {children}
        </View>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = 'Carousel';

// Carousel Content (ScrollView)
export interface CarouselContentProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  className?: string;
}

const CarouselContent = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  CarouselContentProps
>(({ children, autoPlay = false, autoPlayInterval = 3000, loop = false, className }, ref) => {
  const { scrollViewRef, currentIndex, itemWidth, scrollToIndex } = useCarousel();
  const autoPlayTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const items = React.Children.toArray(children);
  const itemCount = items.length;

  // Update context with item count
  const context = React.useContext(CarouselContext);
  React.useEffect(() => {
    if (context) {
      (context as any).itemCount = itemCount;
    }
  }, [itemCount, context]);

  const [localIndex, setLocalIndex] = React.useState(0);

  const handleScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / itemWidth);

      if (index !== localIndex && index >= 0 && index < itemCount) {
        setLocalIndex(index);
        // Update parent context
        if (context) {
          (context as any).currentIndex = index;
        }
      }
    },
    [localIndex, itemWidth, itemCount, context]
  );

  // Auto-play
  const scrollToNext = React.useCallback(() => {
    if (!scrollViewRef.current || itemCount === 0) return;

    let nextIndex = localIndex + 1;

    if (nextIndex >= itemCount) {
      if (loop) {
        nextIndex = 0;
      } else {
        return;
      }
    }

    scrollToIndex(nextIndex);
  }, [localIndex, itemCount, loop, scrollViewRef, scrollToIndex]);

  React.useEffect(() => {
    if (autoPlay && itemCount > 1) {
      autoPlayTimerRef.current = setInterval(scrollToNext, autoPlayInterval);
      return () => {
        if (autoPlayTimerRef.current) {
          clearInterval(autoPlayTimerRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, scrollToNext, itemCount]);

  React.useImperativeHandle(ref, () => scrollViewRef.current as ScrollView);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      decelerationRate="fast"
      snapToInterval={itemWidth}
      snapToAlignment="center"
      className={className}
    >
      {items.map((item, index) => (
        <View key={index} style={{ width: itemWidth }}>
          {item}
        </View>
      ))}
    </ScrollView>
  );
});

CarouselContent.displayName = 'CarouselContent';

// Carousel Item
export interface CarouselItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}

const CarouselItem = React.forwardRef<React.ElementRef<typeof View>, CarouselItemProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} className={cn('w-full h-full', className)} {...props}>
      {children}
    </View>
  )
);

CarouselItem.displayName = 'CarouselItem';

// Carousel Pagination (Dots) - Fully customizable
export interface CarouselPaginationProps extends React.ComponentPropsWithoutRef<typeof View> {
  variant?: 'dots' | 'line' | 'numbers';
  renderDot?: (index: number, isActive: boolean) => React.ReactNode;
}

const CarouselPagination = React.forwardRef<
  React.ElementRef<typeof View>,
  CarouselPaginationProps
>(({ variant = 'dots', renderDot, className, ...props }, ref) => {
  const { currentIndex, itemCount, scrollToIndex } = useCarousel();

  if (itemCount <= 1) return null;

  const defaultDotRender = (index: number, isActive: boolean) => {
    if (variant === 'numbers') {
      return (
        <Pressable
          key={index}
          onPress={() => scrollToIndex(index)}
          className={cn(
            'w-8 h-8 rounded-full items-center justify-center',
            isActive ? 'bg-primary' : 'bg-muted'
          )}
        >
          <Text className={cn('text-sm', isActive ? 'text-primary-foreground' : 'text-muted-foreground')}>
            {index + 1}
          </Text>
        </Pressable>
      );
    }

    if (variant === 'line') {
      return (
        <Pressable
          key={index}
          onPress={() => scrollToIndex(index)}
          className={cn(
            'h-1 rounded-full transition-all',
            isActive ? 'w-8 bg-primary' : 'w-4 bg-muted'
          )}
        />
      );
    }

    // Default dots variant
    return (
      <Pressable
        key={index}
        onPress={() => scrollToIndex(index)}
        className={cn(
          'h-2 rounded-full transition-all',
          isActive ? 'w-6 bg-primary' : 'w-2 bg-muted'
        )}
      />
    );
  };

  return (
    <View
      ref={ref}
      className={cn('flex-row justify-center items-center gap-2', className)}
      {...props}
    >
      {Array.from({ length: itemCount }).map((_, index) =>
        renderDot ? renderDot(index, index === currentIndex) : defaultDotRender(index, index === currentIndex)
      )}
    </View>
  );
});

CarouselPagination.displayName = 'CarouselPagination';

// Carousel Previous Button
// To use with icons: Pass your icon as children
// Example: <CarouselPrevious><ChevronLeftIcon /></CarouselPrevious>
export interface CarouselPreviousProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  children?: React.ReactNode;
}

const CarouselPrevious = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CarouselPreviousProps
>(({ children, className, ...props }, ref) => {
  const { currentIndex, scrollToPrevious } = useCarousel();
  const isDisabled = currentIndex === 0;

  return (
    <Pressable
      ref={ref}
      onPress={scrollToPrevious}
      disabled={isDisabled}
      className={cn(
        'h-10 w-10 rounded-full bg-background/80 items-center justify-center border border-border',
        isDisabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {children || <Text className="text-foreground text-xl">‹</Text>}
    </Pressable>
  );
});

CarouselPrevious.displayName = 'CarouselPrevious';

// To use with icons: Pass your icon as children
// Example: <CarouselNext><ChevronRightIcon /></CarouselNext>
// Carousel Next Button
export interface CarouselNextProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  children?: React.ReactNode;
}

const CarouselNext = React.forwardRef<React.ElementRef<typeof Pressable>, CarouselNextProps>(
  ({ children, className, ...props }, ref) => {
    const { currentIndex, itemCount, scrollToNext } = useCarousel();
    const isDisabled = currentIndex === itemCount - 1;

    return (
      <Pressable
        ref={ref}
        onPress={scrollToNext}
        disabled={isDisabled}
        className={cn(
          'h-10 w-10 rounded-full bg-background/80 items-center justify-center border border-border',
          isDisabled && 'opacity-50',
          className
        )}
        {...props}
      >
        {children || <Text className="text-foreground text-xl">›</Text>}
      </Pressable>
    );
  }
);

CarouselNext.displayName = 'CarouselNext';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination,
  CarouselPrevious,
  CarouselNext,

};
