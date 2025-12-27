 
import { View } from 'react-native-web';
import { ErrorState } from '@/registry/error-state';
import { Button } from '@/registry/button';

export function ErrorStateExample() {
  return (
    <View className="w-full max-w-md p-4">
      <ErrorState
        title="Something went wrong"
        description="We couldn't load your data. Please try again."
        action={<Button>Retry</Button>}
      />
    </View>
  );
}
