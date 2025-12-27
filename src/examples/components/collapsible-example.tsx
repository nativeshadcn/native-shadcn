 
import { View, Text } from 'react-native-web';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/registry/collapsible';
import { Button } from '@/registry/button';
import { useState } from 'react';

export function CollapsibleExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="w-full max-w-md p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline">
            {isOpen ? 'Hide' : 'Show'} Details
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View className="p-4 border rounded-md mt-2">
            <Text>This is collapsible content that can be toggled.</Text>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
}
