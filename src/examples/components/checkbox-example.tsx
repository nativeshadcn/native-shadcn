 
import { View, Text } from 'react-native-web';
import { Checkbox } from '@/registry/checkbox';
import { useState } from 'react';

export function CheckboxExample() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <View className="gap-4 p-4">
      <View className="flex-row items-center gap-3">
        <Checkbox checked={checked1} onCheckedChange={setChecked1} />
        <Text className="text-sm">Accept terms and conditions</Text>
      </View>

      <View className="flex-row items-center gap-3">
        <Checkbox checked={checked2} onCheckedChange={setChecked2} />
        <Text className="text-sm">Checked by default</Text>
      </View>
    </View>
  );
}
