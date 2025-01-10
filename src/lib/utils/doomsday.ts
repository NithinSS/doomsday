export function calculateDayOfWeek(date: Date): number {
  const doomsdayRef = {
    0: 3, // 2000 - Tuesday
    1: 2, // 2100
    2: 0, // 2200
    3: 5  // 2300
  };

  const monthDoomsdays = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
  const leapMonthDoomsdays = [4, 29, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Calculate century's doomsday
  const century = Math.floor(year / 100);
  const centuryDoomsday = doomsdayRef[century % 4];

  // Calculate year's doomsday
  const twoDigitYear = year % 100;
  const yearDoomsday = (twoDigitYear + Math.floor(twoDigitYear / 4)) % 7;

  // Combine century and year doomsdays
  let doomsday = (centuryDoomsday + yearDoomsday) % 7;

  // Get the doomsday for the month
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const monthDoomsday = isLeapYear && month < 2 
    ? leapMonthDoomsdays[month] 
    : monthDoomsdays[month];

  // Calculate the day of week
  const diff = day - monthDoomsday;
  return (doomsday + diff + 35) % 7;
}

export function generateRandomDate(startYear: number, endYear: number): Date {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];