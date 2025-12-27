 
import { View, Text } from 'react-native-web';
import { MenuItem } from '@/registry/menu-item';

export function MenuItemExample() {
  return (
    <View className="w-full max-w-md gap-2 p-4">
      <MenuItem onPress={() => {}}>
        <Text>Menu Item 1</Text>
      </MenuItem>
      <MenuItem onPress={() => {}}>
        <Text>Menu Item 2</Text>
      </MenuItem>
      <MenuItem onPress={() => {}} disabled>
        <Text>Disabled Item</Text>
      </MenuItem>
    </View>
  );
}
