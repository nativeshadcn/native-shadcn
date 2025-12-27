 
import { View, Text } from 'react-native-web';
import { Toggle } from '@/registry/toggle';
import { useState } from 'react';

export function ToggleExample() {
  const [pressed, setPressed] = useState(false);

  return (
    <View className="gap-4 p-4">
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <Text>Toggle</Text>
      </Toggle>

      <Toggle variant="outline">
        <Text>Outline</Text>
      </Toggle>
    </View>
  );
}
