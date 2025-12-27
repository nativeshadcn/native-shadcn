 
import { View } from 'react-native-web';
import { Combobox, ComboboxTrigger, ComboboxContent, ComboboxItem } from '@/registry/combobox';
import { useState } from 'react';

export function ComboboxExample() {
  const [value, setValue] = useState('');

  const items = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <View className="w-full max-w-md p-4">
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger placeholder="Select framework..." />
        <ComboboxContent>
          {items.map((item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
    </View>
  );
}
