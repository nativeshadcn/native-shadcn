 
import { View } from 'react-native-web';
import { Text } from '@/registry/text';

export function TextExample() {
  return (
    <View className="gap-4 p-4">
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="body">Body text</Text>
      <Text variant="small">Small text</Text>
      <Text variant="muted">Muted text</Text>
    </View>
  );
}
