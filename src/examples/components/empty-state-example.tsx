 
import { View } from 'react-native-web';
import { EmptyState } from '@/registry/empty-state';
import { Button } from '@/registry/button';

export function EmptyStateExample() {
  return (
    <View className="w-full max-w-md p-4">
      <EmptyState
        title="No items found"
        description="Get started by creating a new item"
        action={<Button>Create Item</Button>}
      />
    </View>
  );
}
