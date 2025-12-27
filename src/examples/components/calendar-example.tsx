 
import { View } from 'react-native-web';
import { Calendar } from '@/registry/calendar';
import { useState } from 'react';

export function CalendarExample() {
  const [date, setDate] = useState(new Date());

  return (
    <View className="w-full max-w-md p-4">
      <Calendar
        selectedDate={date}
        onDateChange={setDate}
      />
    </View>
  );
}
