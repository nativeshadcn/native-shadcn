 
import { View } from 'react-native-web';
import { Input } from '@/registry/input';

export function InputExample() {
  return (
    <View className="w-full max-w-md gap-4 p-4">
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <Input placeholder="Disabled" editable={false} />
    </View>
  );
}
