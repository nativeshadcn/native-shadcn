 
import { View } from 'react-native-web';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/registry/card';
import { Button } from '@/registry/button';

export function CardExample() {
  return (
    <View className="w-full max-w-md p-4">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="gap-2">
            <View className="text-sm">This is a card component with header, content, and footer.</View>
          </View>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    </View>
  );
}
