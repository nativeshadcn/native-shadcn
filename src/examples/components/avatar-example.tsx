 
import { View } from 'react-native-web';
import { Avatar, AvatarImage, AvatarFallback } from '@/registry/avatar';

export function AvatarExample() {
  return (
    <View className="flex-row gap-4 p-4">
      <Avatar>
        <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </View>
  );
}
