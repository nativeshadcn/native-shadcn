 
import { View } from 'react-native-web';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/registry/sheet';
import { Button } from '@/registry/button';

export function SheetExample() {
  return (
    <View className="p-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>
              This is a sheet component that slides in from the side.
            </SheetDescription>
          </SheetHeader>
          <View className="py-4">
            <View className="text-sm">Sheet content goes here...</View>
          </View>
        </SheetContent>
      </Sheet>
    </View>
  );
}
