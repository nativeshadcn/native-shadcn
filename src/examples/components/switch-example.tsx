 
import { View, Text } from 'react-native-web';
import { Switch } from '@/registry/switch';
import { useState } from 'react';

export function SwitchExample() {
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(true);

  return (
    <View className="gap-4 p-4">
      <View className="flex-row items-center justify-between w-full max-w-md">
        <Text className="text-sm">Airplane Mode</Text>
        <Switch checked={enabled1} onCheckedChange={setEnabled1} />
      </View>

      <View className="flex-row items-center justify-between w-full max-w-md">
        <Text className="text-sm">WiFi</Text>
        <Switch checked={enabled2} onCheckedChange={setEnabled2} />
      </View>
    </View>
  );
}
