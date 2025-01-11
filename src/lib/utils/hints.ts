import { calculateDayOfWeek, dayNames } from './doomsday';

interface Hint {
  id: number;
  icon: string;
  text: string;
  unlocked: boolean;
  extraInfo?: string;
}

export function getCenturyDoomsday(year: number): string {
  const centuryMap = {
    17: 'Sunday',
    18: 'Friday',
    19: 'Wednesday',
    20: 'Tuesday',
    21: 'Sunday',
    22: 'Friday',
    23: 'Wednesday',
    24: 'Tuesday',
    25: 'Sunday',
    26: 'Friday',
    27: 'Wednesday',
    28: 'Tuesday',
    29: 'Sunday',
    30: 'Friday'
  };
  const century = Math.floor(year / 100);
  return centuryMap[century] || 'Tuesday';
}

export function getYearDoomsday(year: number): { day: string; calculation: string } {
  const twoDigitYear = year % 100;
  const leapYears = Math.floor(twoDigitYear / 4);
  const total = (twoDigitYear + leapYears) % 7;
  const centuryDoomsday = getCenturyDoomsday(year);
  const centuryOffset = dayNames.indexOf(centuryDoomsday);
  const finalDay = dayNames[(centuryOffset + total) % 7];

  return {
    day: finalDay,
    calculation: `
1. Century anchor: ${centuryDoomsday}
2. Year: ${twoDigitYear}
3. Leap years: ${leapYears} (${twoDigitYear} ÷ 4)
4. Total steps: ${twoDigitYear} + ${leapYears} = ${twoDigitYear + leapYears}
5. Remainder: ${total} (${twoDigitYear + leapYears} ÷ 7)
6. Final day: ${finalDay}`
  };
}

export function getMonthDoomsdays(date: Date): string {
  const monthDoomsdays = {
    0: [3, 10, 17, 24, 31], // Jan
    1: [7, 14, 21, 28], // Feb
    2: [7, 14, 21, 28], // Mar
    3: [4, 11, 18, 25], // Apr
    4: [2, 9, 16, 23, 30], // May
    5: [6, 13, 20, 27], // Jun
    6: [4, 11, 18, 25], // Jul
    7: [1, 8, 15, 22, 29], // Aug
    8: [5, 12, 19, 26], // Sep
    9: [3, 10, 17, 24, 31], // Oct
    10: [7, 14, 21, 28], // Nov
    11: [5, 12, 19, 26] // Dec
  };

  const month = date.getMonth();
  const monthName = date.toLocaleString('default', { month: 'long' });
  const dates = monthDoomsdays[month];
  const targetDate = date.getDate();

  // Find closest dates
  const closest = dates.reduce((prev, curr) => 
    Math.abs(curr - targetDate) < Math.abs(prev - targetDate) ? curr : prev
  );

  const nearbyDates = dates
    .filter(d => Math.abs(d - targetDate) <= 7)
    .sort((a, b) => Math.abs(a - targetDate) - Math.abs(b - targetDate));

  return `${monthName} ${nearbyDates.join(', ')} are doomsdays`;
}

export function generateHints(date: Date): Hint[] {
  const year = date.getFullYear();
  const yearDoomsday = getYearDoomsday(year);
  const correctDay = dayNames[calculateDayOfWeek(date)];

  return [
    {
      id: 1,
      icon: '📅',
      text: `${Math.floor(year / 100)}00 is a ${getCenturyDoomsday(year)}`,
      unlocked: false
    },
    {
      id: 2,
      icon: '🗓️',
      text: `${year} is a ${yearDoomsday.day}`,
      extraInfo: yearDoomsday.calculation,
      unlocked: false
    },
    {
      id: 3,
      icon: '📆',
      text: getMonthDoomsdays(date),
      unlocked: false
    },
    {
      id: 4,
      icon: '✨',
      text: `It's a ${correctDay}`,
      unlocked: false
    }
  ];
}