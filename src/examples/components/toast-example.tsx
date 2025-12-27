 
import { View } from 'react-native-web';
import { useToast, Toast, ToastProvider } from '@/registry/toast';
import { Button } from '@/registry/button';

export function ToastExample() {
  const { toast } = useToast();

  return (
    <ToastProvider>
      <View className="gap-4 p-4">
        <Button onPress={() => toast({ title: 'Success!', description: 'Your changes have been saved.' })}>
          Show Toast
        </Button>
        <Button variant="destructive" onPress={() => toast({ title: 'Error!', description: 'Something went wrong.', variant: 'destructive' })}>
          Show Error Toast
        </Button>
      </View>
      <Toast />
    </ToastProvider>
  );
}
