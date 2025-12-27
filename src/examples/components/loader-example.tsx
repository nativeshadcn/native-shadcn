 
import { View } from 'react-native-web';
import { Loader } from '@/registry/loader';

export function LoaderExample() {
  return (
    <View className="gap-4 p-4 items-center">
      <Loader />
      <Loader size="sm" />
      <Loader size="lg" />
    </View>
  );
}
