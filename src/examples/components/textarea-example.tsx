 
import { View } from 'react-native-web';
import { Textarea } from '@/registry/textarea';

export function TextareaExample() {
  return (
    <View className="w-full max-w-md gap-4 p-4">
      <Textarea placeholder="Type your message here..." />
      <Textarea placeholder="Disabled textarea" editable={false} />
    </View>
  );
}
