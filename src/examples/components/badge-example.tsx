 
import { View } from 'react-native-web';
import { Badge } from '@/registry/badge';

export function BadgeExample() {
  return (
    <View className="flex-row flex-wrap gap-4 p-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
    </View>
  );
}
