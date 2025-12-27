 
import { View } from 'react-native-web';
import { toast, Toaster } from '@/registry/sonner';
import { Button } from '@/registry/button';

export function SonnerExample() {
  return (
    <View className="gap-4 p-4">
      <Button onPress={() => toast('Event has been created')}>
        Show Toast
      </Button>
      <Button onPress={() => toast.success('Event created successfully')}>
        Success
      </Button>
      <Button variant="destructive" onPress={() => toast.error('Event creation failed')}>
        Error
      </Button>
      <Button onPress={() => toast.loading('Creating event...')}>
        Loading
      </Button>
      <Toaster />
    </View>
  );
}
