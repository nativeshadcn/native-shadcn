export const calendarTemplate = `import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

const Calendar = React.forwardRef<
  React.ElementRef<typeof View>,
  CalendarProps
>(({ selected, onSelect, className }, ref) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <View ref={ref} className={cn('p-3', className)}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Pressable onPress={() => {
          const newDate = new Date(currentMonth);
          newDate.setMonth(newDate.getMonth() - 1);
          setCurrentMonth(newDate);
        }}>
          <Text className="text-lg font-semibold">{'<'}</Text>
        </Pressable>
        <Text className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <Pressable onPress={() => {
          const newDate = new Date(currentMonth);
          newDate.setMonth(newDate.getMonth() + 1);
          setCurrentMonth(newDate);
        }}>
          <Text className="text-lg font-semibold">{'>'}</Text>
        </Pressable>
      </View>

      {/* Day headers */}
      <View className="flex-row mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <View key={i} className="flex-1 items-center">
            <Text className="text-sm font-medium text-muted-foreground">{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View className="flex-row flex-wrap">
        {emptyCells.map((_, i) => (
          <View key={\`empty-\${i}\`} className="w-[14.28%] aspect-square" />
        ))}
        {days.map((day) => {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );
          const isSelected = selected?.toDateString() === date.toDateString();

          return (
            <Pressable
              key={day}
              onPress={() => onSelect?.(date)}
              className={cn(
                'w-[14.28%] aspect-square items-center justify-center rounded-md',
                isSelected && 'bg-primary'
              )}
            >
              <Text className={cn(
                'text-sm',
                isSelected && 'text-primary-foreground font-semibold'
              )}>
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});
Calendar.displayName = 'Calendar';

export { Calendar };
export type { CalendarProps };
`;
