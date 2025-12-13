import { assert } from "@std/assert";
import { Duration, duration } from "./duration.ts";
import type {
  Days,
  Hours,
  Milliseconds,
  Minutes,
  Seconds,
  Weeks,
  Years,
} from "@boba/matcha";

Deno.test("duration should just return the value you pass", () => {
  assert(duration(1000 as Milliseconds) === 1000);
  assert(duration(2478 as Seconds) === 2478);
  assert(duration(1000 as Minutes) === 1000);
  assert(duration(20 as Hours) === 20);
  assert(duration(1 as Days) === 1);
  assert(duration(10.5 as Weeks) === 10.5);
  assert(duration(10 as Years) === 10);
});

Deno.test("Duration.milliseconds", () => {
  const duration = Duration.milliseconds(1000 as Milliseconds);

  assert(duration.toMilliseconds() === 1000);
  assert(duration.toSeconds() === 1);
  assert(duration.toMinutes() === 1 / 60);
  assert(duration.toHours() === 1 / 3_600);
  assert(duration.toDays() === 1 / 86_400);
  assert(duration.toWeeks() === 1 / 604_800);
  assert(duration.toYears() === 1 / 31_536_000);
});

Deno.test("Duration.seconds", () => {
  const duration = Duration.seconds(1 as Seconds);

  assert(duration.toMilliseconds() === 1000);
  assert(duration.toSeconds() === 1);
  assert(duration.toMinutes() === 1 / 60);
  assert(duration.toHours() === 1 / 3_600);
  assert(duration.toDays() === 1 / 86_400);
  assert(duration.toWeeks() === 1 / 604_800);
  assert(duration.toYears() === 1 / 31_536_000);
});

Deno.test("Duration.minutes", () => {
  const duration = Duration.minutes(1 as Minutes);

  assert(duration.toMilliseconds() === 60_000);
  assert(duration.toSeconds() === 60);
  assert(duration.toMinutes() === 1);
  assert(duration.toHours() === 1 / 60);
});

Deno.test("Duration.hours", () => {
  const duration = Duration.hours(1 as Hours);

  assert(duration.toMilliseconds() === 3_600_000);
  assert(duration.toSeconds() === 3_600);
  assert(duration.toMinutes() === 60);
  assert(duration.toHours() === 1);
  assert(duration.toDays() === 1 / 24);
});

Deno.test("Duration.days", () => {
  const duration = Duration.days(1 as Days);

  assert(duration.toMilliseconds() === 86_400_000);
  assert(duration.toSeconds() === 86_400);
  assert(duration.toMinutes() === 1_440);
  assert(duration.toHours() === 24);
  assert(duration.toDays() === 1);
  assert(duration.toWeeks() === 1 / 7);
  assert(duration.toYears() === 1 / 365);
});

Deno.test("Duration.weeks", () => {
  const duration = Duration.weeks(1 as Weeks);

  assert(duration.toMilliseconds() === 604_800_000);
  assert(duration.toSeconds() === 604_800);
  assert(duration.toMinutes() === 10_080);
  assert(duration.toHours() === 168);
  assert(duration.toDays() === 7);
  assert(duration.toWeeks() === 1);
});

Deno.test("Duration.years", () => {
  const duration = Duration.years(1 as Years);

  assert(duration.toDays() === 365);
  assert(duration.toYears() === 1);
});
