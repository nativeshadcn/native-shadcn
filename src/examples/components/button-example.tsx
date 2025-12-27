 
import { View } from 'react-native-web';
import { Button } from '@/registry/button';

export function ButtonExample() {
  return (
    <View className="gap-4 p-4 items-center">
      <Button>Default Button</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>

      <View className="flex-row gap-4 mt-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </View>
    </View>
  );
}
