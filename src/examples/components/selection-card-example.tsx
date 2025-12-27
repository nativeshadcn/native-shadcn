 
import { View, Text } from 'react-native-web';
import { SelectionCard } from '@/registry/selection-card';
import { useState } from 'react';

export function SelectionCardExample() {
  const [selected, setSelected] = useState('card1');

  return (
    <View className="w-full max-w-md gap-4 p-4">
      <SelectionCard
        selected={selected === 'card1'}
        onPress={() => setSelected('card1')}
      >
        <Text className="font-medium">Option 1</Text>
        <Text className="text-sm text-muted-foreground">Description for option 1</Text>
      </SelectionCard>

      <SelectionCard
        selected={selected === 'card2'}
        onPress={() => setSelected('card2')}
      >
        <Text className="font-medium">Option 2</Text>
        <Text className="text-sm text-muted-foreground">Description for option 2</Text>
      </SelectionCard>
    </View>
  );
}
