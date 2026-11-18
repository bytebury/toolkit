import { type Days, Duration } from "./duration.ts";

/**
 * Right now. This is an alias for `new Date()`.
 */
export function now(): Date {
  return new Date();
}

/**
 * Today's date at midnight.
 */
export function today(): Date {
  const d = new Date(now());
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Tomorrow's date at midnight.
 */
export function tomorrow(): Date {
  const d = new Date(now());
  d.setHours(0, 0, 0, 0);
  return addDays(d, 1);
}

/**
 * Yesterday's date at midnight.
 */
export function yesterday(): Date {
  return subtractDays(today(), 1);
}

/**
 * The current month as a number from 1 (January) to 12 (December).
 */
export function currentMonth(): number {
  return now().getMonth() + 1;
}

/**
 * The current year as a number (e.g. 2026).
 */
export function currentYear(): number {
  return now().getFullYear();
}

/**
 * Adds the given amount of days to the specified date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtracts the given amount of days from the specified date.
 */
export function subtractDays(date: Date, days: number): Date {
  return addDays(new Date(date), -days);
}

/**
 * Adds the given amount of months to the specified date.
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const targetMonth = result.getMonth() + months;
  result.setMonth(targetMonth);

  // Fix for month overflow (e.g., Jan 31 → Feb)
  while (result.getMonth() !== ((targetMonth % 12 + 12) % 12)) {
    result.setDate(result.getDate() - 1);
  }

  return result;
}

/**
 * Subtracts the given amount of months from the specified date.
 */
export function subtractMonths(date: Date, months: number): Date {
  return addMonths(new Date(date), -months);
}

/**
 * Adds the given amount of years to the specified date.
 */
export function addYears(date: Date, years: number): Date {
  return addMonths(new Date(date), years * 12);
}

/**
 * Subtracts the given amount of yers from the specified date.
 */
export function subtractYears(date: Date, years: number): Date {
  return addYears(new Date(date), -years);
}

/**
 * Calculates the number of full days between two dates. The order of the
 * arguments does not matter.
 *
 * @remarks
 * Days are counted on the local calendar, so two consecutive midnights are
 * always 1 day apart, even across a daylight saving time change.
 *
 * @example
 * ```ts
 * daysBetween(new Date("2026-01-01T00:00"), new Date("2026-01-02T12:00")); // 1
 * daysBetween(new Date("2026-01-02T12:00"), new Date("2026-01-01T00:00")); // 1
 * ```
 */
export function daysBetween(start: Date, end: Date): number {
  const [earlier, later] = inOrder(start, end);
  // Comparing calendar dates in UTC keeps every day exactly 24 hours long.
  const calendarDays = Math.round(
    (Date.UTC(later.getFullYear(), later.getMonth(), later.getDate()) -
      Date.UTC(earlier.getFullYear(), earlier.getMonth(), earlier.getDate())) /
      Duration.days(1 as Days).toMilliseconds(),
  );
  // The last day only counts once the time of day has been reached.
  const hasTimePassed = timeOfDay(later) >= timeOfDay(earlier);
  return hasTimePassed || calendarDays === 0 ? calendarDays : calendarDays - 1;
}

/**
 * Calculates the months between two dates.
 */
export function monthsBetween(start: Date, end: Date): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const years = endDate.getFullYear() - startDate.getFullYear();
  const months = endDate.getMonth() - startDate.getMonth();
  return Math.abs(years * 12 + months);
}

/**
 * Calculates the number of full years between two dates. The order of the
 * arguments does not matter.
 * The date must be equal or past for it to count as a full year.
 *
 * @example
 * ```ts
 * yearsBetween(new Date("2007-08-01"), new Date("2008-07-31")); // 0
 * yearsBetween(new Date("2007-08-01"), new Date("2008-08-01")); // 1
 * ```
 */
export function yearsBetween(start: Date, end: Date): number {
  const [earlier, later] = inOrder(start, end);
  const years = later.getFullYear() - earlier.getFullYear();
  if (years === 0) {
    return 0;
  }
  // The last year only counts once the anniversary has been reached.
  const hasDayPassed = later.getMonth() > earlier.getMonth() ||
    (later.getMonth() === earlier.getMonth() &&
      later.getDate() >= earlier.getDate());
  return hasDayPassed ? years : years - 1;
}

/**
 * Returns copies of the two dates with the earlier one first.
 */
function inOrder(a: Date, b: Date): [Date, Date] {
  const first = new Date(a);
  const second = new Date(b);
  return first <= second ? [first, second] : [second, first];
}

/**
 * The milliseconds that have passed on the local clock since midnight.
 */
function timeOfDay(date: Date): number {
  return ((date.getHours() * 60 + date.getMinutes()) * 60 +
        date.getSeconds()) * 1000 + date.getMilliseconds();
}

/**
 * Checks if a date is a Sunday.
 */
export function isSunday(date: Date): boolean {
  return new Date(date).getDay() === 0;
}

/**
 * Checks if a date is a Monday.
 */
export function isMonday(date: Date): boolean {
  return new Date(date).getDay() === 1;
}

/**
 * Checks if a date is a Tuesday.
 */
export function isTuesday(date: Date): boolean {
  return new Date(date).getDay() === 2;
}

/**
 * Checks if a date is a Wednesday.
 */
export function isWednesday(date: Date): boolean {
  return new Date(date).getDay() === 3;
}

/**
 * Checks if a date is a Thursday.
 */
export function isThursday(date: Date): boolean {
  return new Date(date).getDay() === 4;
}

/**
 * Checks if a date is a Friday.
 */
export function isFriday(date: Date): boolean {
  return new Date(date).getDay() === 5;
}

/**
 * Checks if a date is a Saturday.
 */
export function isSaturday(date: Date): boolean {
  return new Date(date).getDay() === 6;
}

/**
 * Checks if a date is a weekend.
 */
export function isWeekend(date: Date): boolean {
  return isSaturday(date) || isSunday(date);
}

/**
 * Checks if a date is a weekday.
 */
export function isWeekday(date: Date): boolean {
  return !isWeekend(date);
}

/**
 * Determines if the date is in the past.
 */
export function isInPast(date: Date): boolean {
  return date < today();
}

/**
 * Determines if the date is in the future.
 *
 * @remarks
 * this is date specific. So, if it is 1:00 PM and you pass
 * a date that is today at 2:00 PM, it will return false, because
 * the "date" is the same.
 */
export function isInFuture(date: Date): boolean {
  return date >= tomorrow();
}

/**
 * Determines if the date is today.
 */
export function isToday(date: Date): boolean {
  return !isInFuture(date) && !isInPast(date);
}

/**
 * Determines if the date is yesterday.
 *
 * @remarks
 * this is date specific. Time of day is ignored.
 */
export function isYesterday(date: Date): boolean {
  return date >= yesterday() && date < today();
}

/**
 * Determines if the date is tomorrow.
 *
 * @remarks
 * this is date specific. Time of day is ignored.
 */
export function isTomorrow(date: Date): boolean {
  return date >= tomorrow() && date < addDays(tomorrow(), 1);
}
