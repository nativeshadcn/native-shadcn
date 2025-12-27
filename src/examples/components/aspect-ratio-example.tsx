 
import { View, Image } from 'react-native-web';
import { AspectRatio } from '@/registry/aspect-ratio';

export function AspectRatioExample() {
  return (
    <View className="w-full max-w-md p-4">
      <AspectRatio ratio={16 / 9}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' }}
          className="w-full h-full rounded-md"
        />
      </AspectRatio>
    </View>
  );
}
