import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { calendarTemplate } from '@templates/calendar'

function CalendarPreview() {
  const [currentMonth, setCurrentMonth] = useState(0) // January
  const [currentYear] = useState(2025)
  const [selectedDate, setSelectedDate] = useState<number | null>(15)

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const nextMonth = () => setCurrentMonth((prev) => (prev + 1) % 12)
  const prevMonth = () => setCurrentMonth((prev) => (prev - 1 + 12) % 12)

  return (
    <div className="flex items-center justify-center p-8">
      <div className="rounded-md border border-border p-4 bg-background w-80">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 hover:bg-accent rounded-md transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-semibold">{months[currentMonth]} {currentYear}</span>
          <button onClick={nextMonth} className="p-2 hover:bg-accent rounded-md transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
          <div className="font-medium text-muted-foreground p-2">S</div>
          <div className="font-medium text-muted-foreground p-2">M</div>
          <div className="font-medium text-muted-foreground p-2">T</div>
          <div className="font-medium text-muted-foreground p-2">W</div>
          <div className="font-medium text-muted-foreground p-2">T</div>
          <div className="font-medium text-muted-foreground p-2">F</div>
          <div className="font-medium text-muted-foreground p-2">S</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="p-2"></div>
          ))}
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`p-2 rounded-md hover:bg-accent transition-colors ${
                selectedDate === day ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        {selectedDate && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Selected: {months[currentMonth]} {selectedDate}, {currentYear}
          </div>
        )}
      </div>
    </div>
  )
}

export function CalendarDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Calendar</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A date picker calendar component.
        </p>
      </div>
      <ComponentPreview
        name="Calendar"
        preview={<CalendarPreview />}
        code={`import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

const [currentMonth, setCurrentMonth] = useState(0); // January
const [currentYear, setCurrentYear] = useState(2025);
const [selectedDate, setSelectedDate] = useState(15);

<Calendar
  month={currentMonth}
  year={currentYear}
  selectedDate={selectedDate}
  onSelectDate={setSelectedDate}
  onMonthChange={setCurrentMonth}
/>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add calendar"
        manual={calendarTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Calendar } from '@/components/ui/calendar';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`const [date, setDate] = useState(new Date());

<Calendar selected={date} onSelect={setDate} />`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
