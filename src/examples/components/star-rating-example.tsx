 
import { View } from 'react-native-web';
import { StarRating } from '@/registry/star-rating';
import { useState } from 'react';

export function StarRatingExample() {
  const [rating, setRating] = useState(3);

  return (
    <View className="gap-4 p-4">
      <StarRating rating={rating} onRatingChange={setRating} />
      <StarRating rating={4} disabled />
    </View>
  );
}
