 
import { View } from 'react-native-web';
import { Slider } from '@/registry/slider';
import { useState } from 'react';

export function SliderExample() {
  const [value, setValue] = useState(50);

  return (
    <View className="w-full max-w-md gap-4 p-4">
      <Slider value={value} onValueChange={setValue} />
      <Slider value={75} disabled />
    </View>
  );
}
