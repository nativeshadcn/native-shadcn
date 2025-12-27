 
import { View, Text } from 'react-native-web';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/registry/drawer';
import { Button } from '@/registry/button';

export function DrawerExample() {
  return (
    <View className="p-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>
              This is a drawer that slides up from the bottom.
            </DrawerDescription>
          </DrawerHeader>
          <View className="p-4">
            <Text>Drawer content goes here...</Text>
          </View>
          <DrawerFooter>
            <Button>Submit</Button>
            <Button variant="outline">Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </View>
  );
}
