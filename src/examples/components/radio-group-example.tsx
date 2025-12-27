 
import { View, Text } from 'react-native-web';
import { RadioGroup, RadioGroupItem } from '@/registry/radio-group';
import { useState } from 'react';

export function RadioGroupExample() {
  const [value, setValue] = useState('option1');

  return (
    <View className="w-full max-w-md p-4">
      <RadioGroup value={value} onValueChange={setValue}>
        <View className="flex-row items-center gap-2">
          <RadioGroupItem value="option1" />
          <Text className="text-sm">Option 1</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <RadioGroupItem value="option2" />
          <Text className="text-sm">Option 2</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <RadioGroupItem value="option3" />
          <Text className="text-sm">Option 3</Text>
        </View>
      </RadioGroup>
    </View>
  );
}
