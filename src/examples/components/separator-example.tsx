 
import { View, Text } from 'react-native-web';
import { Separator } from '@/registry/separator';

export function SeparatorExample() {
  return (
    <View className="w-full max-w-md p-4">
      <View className="gap-4">
        <Text className="text-sm font-medium">Horizontal Separator</Text>
        <Separator />
        <Text className="text-sm">Content below separator</Text>
      </View>
    </View>
  );
}
