 
import { View } from 'react-native-web';
import { Label } from '@/registry/label';
import { Input } from '@/registry/input';

export function LabelExample() {
  return (
    <View className="w-full max-w-md gap-4 p-4">
      <View className="gap-2">
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
      </View>

      <View className="gap-2">
        <Label>Password</Label>
        <Input placeholder="Enter your password" secureTextEntry />
      </View>
    </View>
  );
}
