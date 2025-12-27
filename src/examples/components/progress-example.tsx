 
import { View } from 'react-native-web';
import { Progress } from '@/registry/progress';

export function ProgressExample() {
  return (
    <View className="w-full max-w-md gap-4 p-4">
      <Progress value={0} />
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </View>
  );
}
