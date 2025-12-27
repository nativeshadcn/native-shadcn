 
import { View, Text } from 'react-native-web';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/registry/popover';
import { Button } from '@/registry/button';

export function PopoverExample() {
  return (
    <View className="p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <View className="gap-2">
            <Text className="font-medium">Popover Title</Text>
            <Text className="text-sm text-muted-foreground">
              This is popover content that appears on trigger.
            </Text>
          </View>
        </PopoverContent>
      </Popover>
    </View>
  );
}
