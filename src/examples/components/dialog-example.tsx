 
import { View } from 'react-native-web';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/registry/dialog';
import { Button } from '@/registry/button';
import { Input } from '@/registry/input';
import { Label } from '@/registry/label';

export function DialogExample() {
  return (
    <View className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <View className="gap-4 py-4">
            <View className="gap-2">
              <Label>Name</Label>
              <Input placeholder="Enter your name" />
            </View>
            <View className="gap-2">
              <Label>Email</Label>
              <Input placeholder="Enter your email" />
            </View>
          </View>
          <DialogFooter>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
