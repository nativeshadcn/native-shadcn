 
import { View } from 'react-native-web';
import { Skeleton } from '@/registry/skeleton';

export function SkeletonExample() {
  return (
    <View className="w-full max-w-md gap-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <View className="gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </View>
    </View>
  );
}
