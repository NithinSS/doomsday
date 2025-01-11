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

export function generateHints(date: Date): Hint[] {
  const year = date.getFullYear();
  const yearDoomsday = getYearDoomsday(year);
  const correctDay = dayNames[calculateDayOfWeek(date)];
  const month = date.getMonth();
  const targetDate = date.getDate();

  // Helper function to get mnemonic and its date
  function getMonthMnemonic(month: number): { text: string; date: number } {
    const mnemonics = {
      0: { text: "3rd (4th in leap years)", date: 3 }, // Jan
      1: { text: "Last day (28/29)", date: 28 }, // Feb
      2: { text: "Pi Day (14th) (3/14)", date: 14 }, // Mar
      3: { text: "4/4", date: 4 }, // Apr
      4: { text: "9/5", date: 9 }, // May
      5: { text: "6/6", date: 6 }, // Jun
      6: { text: "7/11", date: 11 }, // Jul
      7: { text: "8/8", date: 8 }, // Aug
      8: { text: "5/9", date: 5 }, // Sep
      9: { text: "10/10", date: 10 }, // Oct
      10: { text: "11/7", date: 7 }, // Nov
      11: { text: "12/12", date: 12 }  // Dec
    };
    return mnemonics[month];
  }

  const monthInfo = getMonthMnemonic(month);
  const difference = targetDate - monthInfo.date;
  const daysCalc = `
1. Doomsday for ${date.toLocaleString('default', { month: 'long' })}: ${monthInfo.date}th
2. Target date: ${targetDate}th
3. Difference: ${Math.abs(difference)} day${Math.abs(difference) === 1 ? '' : 's'} ${difference > 0 ? 'after' : 'before'}
4. So count (${Math.abs(difference)} % 7) ${difference > 0 ? 'forward' : 'backward'}: ${yearDoomsday.day} ${difference > 0 ? '+' : '-'} ${Math.abs(difference) % 7}`;

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
      icon: '💡',
      text: `Doomsday for ${date.toLocaleString('default', { month: 'long' })}: ${monthInfo.text}`,
      unlocked: false
    },
    {
      id: 4,
      icon: '✨',
      text: `It's a ${correctDay}`,
      extraInfo: daysCalc,
      unlocked: false
    }
  ];
}