import * as React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { cn } from '@/lib/utils';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';
type ToastPosition = 'top-center' | 'bottom-center';
type SwipeDirection = 'up' | 'left';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastOptions {
  description?: string;
  duration?: number;
  position?: ToastPosition;
  icon?: React.ReactNode;
  action?: ToastAction;
  cancel?: ToastAction;
  onDismiss?: () => void;
  onAutoClose?: () => void;
  closeButton?: boolean;
  dismissible?: boolean;
  richColors?: boolean;
}

interface Toast extends ToastOptions {
  id: string;
  message: string;
  type: ToastType;
}

interface ToasterProps {
  theme?: 'light' | 'dark' | 'system';
  visibleToasts?: number;
  position?: ToastPosition;
  offset?: number;
  closeButton?: boolean;
  invert?: boolean;
  gap?: number;
  swipeToDismissDirection?: SwipeDirection;
  richColors?: boolean;
  pauseWhenPageIsHidden?: boolean;
}

let toastState: {
  toasts: Toast[];
  listeners: Set<(toasts: Toast[]) => void>;
} = {
  toasts: [],
  listeners: new Set(),
};

const addToast = (toast: Toast) => {
  toastState.toasts = [...toastState.toasts, toast];
  toastState.listeners.forEach((listener) => listener(toastState.toasts));

  if (toast.duration !== Infinity && toast.type !== 'loading') {
    setTimeout(() => {
      dismissToast(toast.id);
      toast.onAutoClose?.();
    }, toast.duration || 4000);
  }
};

const dismissToast = (id: string) => {
  const toast = toastState.toasts.find(t => t.id === id);
  toastState.toasts = toastState.toasts.filter((t) => t.id !== id);
  toastState.listeners.forEach((listener) => listener(toastState.toasts));
  toast?.onDismiss?.();
};

type ToastFunction = {
  (message: string, options?: ToastOptions): string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  loading: (message: string, options?: ToastOptions) => string;
  dismiss: (id?: string) => void;
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => Promise<T>;
};

const createToast = (message: string, type: ToastType, options?: ToastOptions): string => {
  const id = Math.random().toString(36).substring(7);
  const toast: Toast = {
    id,
    message,
    type,
    dismissible: true,
    ...options,
  };
  addToast(toast);
  return id;
};

export const toast = ((message: string, options?: ToastOptions) => {
  return createToast(message, 'default', options);
}) as ToastFunction;

toast.success = (message: string, options?: ToastOptions) => {
  return createToast(message, 'success', options);
};

toast.error = (message: string, options?: ToastOptions) => {
  return createToast(message, 'error', options);
};

toast.warning = (message: string, options?: ToastOptions) => {
  return createToast(message, 'warning', options);
};

toast.info = (message: string, options?: ToastOptions) => {
  return createToast(message, 'info', options);
};

toast.loading = (message: string, options?: ToastOptions) => {
  return createToast(message, 'loading', options);
};

toast.dismiss = (id?: string) => {
  if (id) {
    dismissToast(id);
  } else {
    toastState.toasts.forEach(t => dismissToast(t.id));
  }
};

toast.promise = async <T,>(
  promise: Promise<T>,
  options: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  }
): Promise<T> => {
  const id = toast.loading(options.loading);

  try {
    const data = await promise;
    dismissToast(id);
    const successMsg = typeof options.success === 'function'
      ? options.success(data)
      : options.success;
    toast.success(successMsg);
    return data;
  } catch (error) {
    dismissToast(id);
    const errorMsg = typeof options.error === 'function'
      ? options.error(error)
      : options.error;
    toast.error(errorMsg);
    throw error;
  }
};

const ToastItem = ({
  toast,
  index,
  totalToasts,
  expanded,
  onDismiss,
  gap = 16,
  swipeDirection = 'up',
  closeButton = false,
}: {
  toast: Toast;
  index: number;
  totalToasts: number;
  expanded: boolean;
  onDismiss: (id: string) => void;
  gap?: number;
  swipeDirection?: SwipeDirection;
  closeButton?: boolean;
}) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
    scale.value = withSpring(1);
  }, []);

  const stackOffset = index * 8;
  const expandedOffset = index * (60 + gap);
  const stackScale = 1 - index * 0.05;
  const stackOpacity = 1 - index * 0.15;

  const gesture = Gesture.Pan()
    .enabled(toast.dismissible !== false)
    .onChange((event) => {
      if (swipeDirection === 'up') {
        translateY.value = Math.min(0, event.translationY);
      } else {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      const threshold = swipeDirection === 'up' ? -50 : 50;
      const shouldDismiss = swipeDirection === 'up'
        ? event.translationY < threshold
        : Math.abs(event.translationX) > threshold;

      if (shouldDismiss) {
        if (swipeDirection === 'up') {
          translateY.value = withTiming(-500, { duration: 300 }, () => {
            runOnJS(onDismiss)(toast.id);
          });
        } else {
          translateX.value = withTiming(event.translationX > 0 ? 500 : -500, { duration: 300 }, () => {
            runOnJS(onDismiss)(toast.id);
          });
        }
        opacity.value = withTiming(0, { duration: 300 });
      } else {
        translateY.value = withSpring(0);
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const targetOffset = expanded ? expandedOffset : stackOffset;
    const targetScale = expanded ? 1 : stackScale;
    const targetOpacity = expanded ? 1 : stackOpacity;

    return {
      position: 'absolute',
      top: withSpring(targetOffset),
      opacity: opacity.value * targetOpacity,
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: withSpring(scale.value * targetScale) },
      ],
      zIndex: totalToasts - index,
    };
  });

  const getTypeStyles = () => {
    if (toast.richColors) {
      switch (toast.type) {
        case 'success':
          return 'bg-green-500 border-green-600';
        case 'error':
          return 'bg-red-500 border-red-600';
        case 'warning':
          return 'bg-yellow-500 border-yellow-600';
        case 'info':
          return 'bg-blue-500 border-blue-600';
        default:
          return 'bg-background border-border';
      }
    }

    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
      default:
        return 'bg-background border-border';
    }
  };

  const getTextColor = () => {
    if (toast.richColors) {
      return 'text-white';
    }
    switch (toast.type) {
      case 'success':
        return 'text-green-900 dark:text-green-100';
      case 'error':
        return 'text-red-900 dark:text-red-100';
      case 'warning':
        return 'text-yellow-900 dark:text-yellow-100';
      case 'info':
        return 'text-blue-900 dark:text-blue-100';
      default:
        return 'text-foreground';
    }
  };

  const getIcon = () => {
    if (toast.icon) return toast.icon;

    switch (toast.type) {
      case 'success':
        return <Text className="text-green-600 dark:text-green-400">✓</Text>;
      case 'error':
        return <Text className="text-red-600 dark:text-red-400">✕</Text>;
      case 'warning':
        return <Text className="text-yellow-600 dark:text-yellow-400">⚠</Text>;
      case 'info':
        return <Text className="text-blue-600 dark:text-blue-400">ⓘ</Text>;
      case 'loading':
        return <ActivityIndicator size="small" />;
      default:
        return null;
    }
  };

  const showCloseButton = toast.closeButton ?? closeButton;

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={animatedStyle}
        className={cn(
          'w-full max-w-md rounded-lg border shadow-lg',
          getTypeStyles()
        )}
      >
        <View className="p-4">
          <View className="flex-row items-start gap-3">
            {getIcon()}
            <View className="flex-1">
              <Text className={cn('font-semibold', getTextColor())}>
                {toast.message}
              </Text>
              {toast.description && (
                <Text className="mt-1 text-sm text-muted-foreground">
                  {toast.description}
                </Text>
              )}
            </View>
            {showCloseButton && (
              <Pressable onPress={() => onDismiss(toast.id)} className="ml-2 -mt-1">
                <Text className={cn('text-lg', getTextColor())}>✕</Text>
              </Pressable>
            )}
          </View>
          {(toast.action || toast.cancel) && (
            <View className="flex-row gap-2 mt-3">
              {toast.cancel && (
                <Pressable
                  onPress={() => {
                    toast.cancel?.onClick();
                    onDismiss(toast.id);
                  }}
                  className="flex-1 rounded-md bg-muted px-3 py-2"
                >
                  <Text className="text-sm font-medium text-muted-foreground text-center">
                    {toast.cancel.label}
                  </Text>
                </Pressable>
              )}
              {toast.action && (
                <Pressable
                  onPress={() => {
                    toast.action?.onClick();
                    onDismiss(toast.id);
                  }}
                  className="flex-1 rounded-md bg-primary px-3 py-2"
                >
                  <Text className="text-sm font-medium text-primary-foreground text-center">
                    {toast.action.label}
                  </Text>
                </Pressable>
              )}
            </View>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export const Toaster = ({
  visibleToasts = 3,
  position = 'top-center',
  offset = 0,
  closeButton = false,
  gap = 16,
  swipeToDismissDirection = 'up',
  richColors = false,
}: ToasterProps = {}) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setToasts(newToasts.slice(0, visibleToasts));
    };
    toastState.listeners.add(listener);
    return () => {
      toastState.listeners.delete(listener);
    };
  }, [visibleToasts]);

  if (toasts.length === 0) return null;

  const containerHeight = expanded ? toasts.length * (60 + gap) + 40 : toasts.length * 8 + 100;
  const isTop = position.includes('top');

  return (
    <View
      className={cn(
        'absolute left-0 right-0 z-50 items-center px-4',
        isTop ? 'top-0' : 'bottom-0'
      )}
      style={{ [isTop ? 'paddingTop' : 'paddingBottom']: offset + 16 }}
      pointerEvents="box-none"
    >
      <Pressable
        onPressIn={() => setExpanded(true)}
        onPressOut={() => setExpanded(false)}
        style={{ width: '100%', maxWidth: 448 }}
      >
        <View className="relative w-full" style={{ height: containerHeight }}>
          {toasts.map((toast, index) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              index={index}
              totalToasts={toasts.length}
              expanded={expanded}
              onDismiss={dismissToast}
              gap={gap}
              swipeDirection={swipeToDismissDirection}
              closeButton={toast.closeButton ?? closeButton}
            />
          ))}
        </View>
      </Pressable>
    </View>
  );
};
