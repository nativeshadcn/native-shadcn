 
import { View, Text } from 'react-native-web';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/registry/hover-card';
import { Button } from '@/registry/button';

export function HoverCardExample() {
  return (
    <View className="p-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@username</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <View className="gap-2">
            <Text className="font-semibold">User Name</Text>
            <Text className="text-sm text-muted-foreground">
              This is a hover card with user information.
            </Text>
            <View className="flex-row gap-4 text-xs text-muted-foreground">
              <Text>100 Following</Text>
              <Text>1000 Followers</Text>
            </View>
          </View>
        </HoverCardContent>
      </HoverCard>
    </View>
  );
}
