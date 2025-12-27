import * as React from 'react';
import { View, Text, Animated, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Toast - Hook IS exposed 
type ToastType = {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
};

type ToastContextValue = {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

// Hook EXPORTED 
export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return {
    toast: context.addToast,
    dismiss: context.removeToast,
    toasts: context.toasts,
  };
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

const Toaster = () => {
  const { toasts } = useToast();
  return (
    <View className="absolute top-4 left-4 right-4 z-50 gap-2">
      {toasts.map((toast) => <Toast key={toast.id} {...toast} />)}
    </View>
  );
};

const toastVariants = cva(
  'flex flex-row items-center justify-between gap-2 rounded-lg border p-4 shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-background border-border',
        destructive: 'bg-destructive text-destructive-foreground border-destructive',
        success: 'bg-green-500 text-white border-green-600',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const Toast = ({ id, title, description, variant, duration = 3000 }: ToastType & VariantProps<typeof toastVariants>) => {
  const { dismiss } = useToast();
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    if (duration > 0) {
      const timer = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => dismiss(id));
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id]);

  return (
    <Animated.View style={{ opacity }} className={cn(toastVariants({ variant }))}>
      <View className="flex-1">
        {title && <Text className="font-semibold text-foreground">{title}</Text>}
        {description && <Text className="text-sm text-muted-foreground">{description}</Text>}
      </View>
      <Pressable onPress={() => dismiss(id)}><Text>✕</Text></Pressable>
    </Animated.View>
  );
};

export { Toast, Toaster, ToastProvider };
