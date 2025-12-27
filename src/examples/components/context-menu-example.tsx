 
import { View, Text } from 'react-native-web';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/registry/context-menu';

export function ContextMenuExample() {
  return (
    <View className="w-full max-w-md p-4">
      <ContextMenu>
        <ContextMenuTrigger>
          <View className="p-8 border-2 border-dashed border-border rounded-lg">
            <Text className="text-center text-muted-foreground">
              Right click or long press here
            </Text>
          </View>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </View>
  );
}
