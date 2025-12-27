 
import { View, Text } from 'react-native-web';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/registry/tabs';

export function TabsExample() {
  return (
    <View className="w-full max-w-md p-4">
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Account</TabsTrigger>
          <TabsTrigger value="tab2">Password</TabsTrigger>
          <TabsTrigger value="tab3">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <View className="p-4">
            <Text>Account content goes here</Text>
          </View>
        </TabsContent>
        <TabsContent value="tab2">
          <View className="p-4">
            <Text>Password content goes here</Text>
          </View>
        </TabsContent>
        <TabsContent value="tab3">
          <View className="p-4">
            <Text>Settings content goes here</Text>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  );
}
