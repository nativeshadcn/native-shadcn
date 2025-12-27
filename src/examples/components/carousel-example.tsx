 
import { View, Text } from 'react-native-web';
import { Carousel, CarouselItem } from '@/registry/carousel';

export function CarouselExample() {
  return (
    <View className="w-full max-w-md p-4">
      <Carousel>
        <CarouselItem>
          <View className="p-8 bg-primary rounded-lg">
            <Text className="text-primary-foreground text-center">Slide 1</Text>
          </View>
        </CarouselItem>
        <CarouselItem>
          <View className="p-8 bg-secondary rounded-lg">
            <Text className="text-secondary-foreground text-center">Slide 2</Text>
          </View>
        </CarouselItem>
        <CarouselItem>
          <View className="p-8 bg-accent rounded-lg">
            <Text className="text-accent-foreground text-center">Slide 3</Text>
          </View>
        </CarouselItem>
      </Carousel>
    </View>
  );
}
