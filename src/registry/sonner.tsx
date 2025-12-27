import { Toaster as SonnerToaster } from 'sonner-native';
import { toast } from 'sonner-native';

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast: 'bg-background border-border shadow-lg',
          title: 'text-foreground font-semibold',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
          success: 'bg-green-50 border-green-200 text-green-900',
          error: 'bg-red-50 border-red-200 text-red-900',
          warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
          info: 'bg-blue-50 border-blue-200 text-blue-900',
        },
      }}
    />
  );
};

export { toast };
