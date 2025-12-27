 
import { View } from 'react-native-web';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/registry/tooltip';
import { Button } from '@/registry/button';

export function TooltipExample() {
  return (
    <View className="p-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <View className="text-sm">This is a tooltip</View>
        </TooltipContent>
      </Tooltip>
    </View>
  );
}
