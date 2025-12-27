 
import { View, Text } from 'react-native-web';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/registry/accordion';

export function AccordionExample() {
  return (
    <View className="w-full max-w-md p-4">
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It comes with default styles that matches the other components aesthetic.</Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It's animated by default, but you can disable it if you prefer.</Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
