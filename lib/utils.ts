import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, getISOWeek, addDays, setWeek } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to calculate total working hours
export const calculateTotalWorkingHours = (startTime: Date, endTime: Date, breakMinutes: number): number => {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const totalMinutes = (end - start) / (1000 * 60);  // total minutes worked
  const totalWorkingMinutes = totalMinutes - breakMinutes;  // subtract break time
  return totalWorkingMinutes;
};



export const getWeek = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });
  const weekNumber = getISOWeek(date);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  return { start, end, days, weekNumber };
};

export const getNextWeek = (date: Date) => getWeek(addWeeks(date, 1));
export const getPreviousWeek = (date: Date) => getWeek(subWeeks(date, 1));
export const formatDate = (date: Date) => format(date, "dd MMM yyyy");

// Utility function to get dates from week number
export const getDatesFromWeekNumber = (weekNumber: number, year: number) => {
  const date = setWeek(new Date(year, 0, 1), weekNumber);
  return getWeek(date).days;
};

export const getNextWeekNumber = (currentWeekNumber:any) => currentWeekNumber + 1;
export const getPreviousWeekNumber = (currentWeekNumber:any) => currentWeekNumber - 1;