import { assert, assertEquals, assertInstanceOf } from "@std/assert";
import {
  addDays,
  addMonths,
  addYears,
  currentMonth,
  currentYear,
  daysBetween,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTomorrow,
  isTuesday,
  isWednesday,
  isWeekday,
  isWeekend,
  isYesterday,
  monthsBetween,
  now,
  subtractDays,
  subtractMonths,
  subtractYears,
  today,
  tomorrow,
  yearsBetween,
  yesterday,
} from "../src/dates.ts";

Deno.test("now returns a Date object close to current time", () => {
  const n = now();
  assertInstanceOf(n, Date);
  assert(Math.abs(n.getTime() - new Date().getTime()) < 1000);
});

Deno.test("today returns today's date at midnight", () => {
  const t = today();
  const nowDate = new Date();

  assertEquals(t.getHours(), 0);
  assertEquals(t.getMinutes(), 0);
  assertEquals(t.getSeconds(), 0);
  assertEquals(t.getMilliseconds(), 0);

  assertEquals(t.getFullYear(), nowDate.getFullYear());
  assertEquals(t.getMonth(), nowDate.getMonth());
  assertEquals(t.getDate(), nowDate.getDate());
});

Deno.test("tomorrow returns tomorrow's date at midnight", () => {
  const t = tomorrow();
  const expected = addDays(today(), 1);
  assertEquals(t.getTime(), expected.getTime());
});

Deno.test("yesterday returns yesterday's date at midnight", () => {
  const t = yesterday();
  const expected = subtractDays(today(), 1);
  assertEquals(t.getTime(), expected.getTime());
});

Deno.test("currentMonth returns the current month as 1-12", () => {
  const m = currentMonth();
  assertEquals(m, new Date().getMonth() + 1);
  assert(m >= 1 && m <= 12);
});

Deno.test("currentYear returns the current year", () => {
  assertEquals(currentYear(), new Date().getFullYear());
});

Deno.test("addDays / subtractDays work correctly", () => {
  const base = new Date(2025, 0, 1); // Jan 1 2025
  assertEquals(addDays(base, 5).getDate(), 6);
  assertEquals(subtractDays(base, 1).getDate(), 31); // Dec 31 2024
});

Deno.test("addMonths / subtractMonths work correctly", () => {
  const base = new Date(2025, 0, 31);
  assertEquals(addMonths(base, 1).getMonth(), 1);
  assertEquals(subtractMonths(base, 1).getMonth(), 11);
});

Deno.test("addYears / subtractYears work correctly", () => {
  const base = new Date(2025, 0, 1);
  assertEquals(addYears(base, 2).getFullYear(), 2027);
  assertEquals(subtractYears(base, 2).getFullYear(), 2023);
});

Deno.test("daysBetween calculates absolute number of days", () => {
  const start = new Date(2025, 0, 1);
  const end = new Date(2025, 0, 10);
  assertEquals(daysBetween(start, end), 9);
  assertEquals(daysBetween(end, start), 9);
});

Deno.test("monthsBetween calculates absolute number of months", () => {
  const start = new Date(2025, 0, 1);
  const end = new Date(2025, 3, 1);
  assertEquals(monthsBetween(start, end), 3);
});

Deno.test("yearsBetween calculates full-year differences", () => {
  const start = new Date("2007-08-01");
  const end1 = new Date("2008-07-31");
  const end2 = new Date("2008-08-01");

  assertEquals(yearsBetween(start, end1), 0);
  assertEquals(yearsBetween(start, end2), 1);
});

Deno.test("weekday checks: isSunday → isSaturday", () => {
  const base = new Date(2025, 9, 5); // Sunday Oct 5 2025

  assert(isSunday(base));
  assert(!isMonday(base));
  assert(!isTuesday(base));
  assert(!isWednesday(base));
  assert(!isThursday(base));
  assert(!isFriday(base));
  assert(!isSaturday(base));
});

Deno.test("isWeekend / isWeekday work correctly", () => {
  const sunday = new Date(2025, 9, 5);
  const monday = new Date(2025, 9, 6);
  const saturday = new Date(2025, 9, 4);

  assert(isWeekend(sunday));
  assert(isWeekend(saturday));
  assert(!isWeekend(monday));

  assert(!isWeekday(sunday));
  assert(isWeekday(monday));
  assert(!isWeekday(saturday));
});

Deno.test("isYesterday", () => {
  assert(isYesterday(yesterday()));
  assert(!isYesterday(today()));
  assert(!isYesterday(tomorrow()));
  assert(!isYesterday(subtractDays(today(), 2)));
});

Deno.test("isTomorrow", () => {
  assert(isTomorrow(tomorrow()));
  assert(!isTomorrow(today()));
  assert(!isTomorrow(yesterday()));
  assert(!isTomorrow(addDays(today(), 2)));
});
