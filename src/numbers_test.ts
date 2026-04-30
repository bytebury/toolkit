import { assert } from "@std/assert";
import {
  average,
  clamp,
  isEven,
  isOdd,
  max,
  median,
  min,
  ordinalize,
  round,
  roundTo,
  sum,
} from "./numbers.ts";

Deno.test("isEven", () => {
  assert(isEven(null as unknown as number) === true);
  assert(isEven(1) === false);
  assert(isEven(2) === true);
  assert(isEven(3) === false);
  assert(isEven(4) === true);
  assert(isEven(11) === false);
  assert(isEven(21) === false);
  assert(isEven(112) === true);
});

Deno.test("isOdd", () => {
  assert(isOdd(null as unknown as number) === false);
  assert(isOdd(1) === true);
  assert(isOdd(2) === false);
  assert(isOdd(3) === true);
  assert(isOdd(4) === false);
  assert(isOdd(11) === true);
  assert(isOdd(21) === true);
  assert(isOdd(112) === false);
});

Deno.test("ordinalize", () => {
  assert(ordinalize(1) === "1st");
  assert(ordinalize(2) === "2nd");
  assert(ordinalize(3) === "3rd");
  assert(ordinalize(4) === "4th");
  assert(ordinalize(11) === "11th");
  assert(ordinalize(21) === "21st");
  assert(ordinalize(112) === "112th");
});

Deno.test("max", () => {
  assert(max([]) === 0);
  assert(max([1]) === 1);
  assert(max([2, 3]) === 3);
  assert(max([4, 5, 6]) === 6);
  assert(max([-1, -2, -1000]) === -1);
});

Deno.test("min", () => {
  assert(min([]) === 0);
  assert(min([1]) === 1);
  assert(min([2, 3]) === 2);
  assert(min([4, 5, 6]) === 4);
  assert(min([-1, -2, -1000]) === -1000);
});

Deno.test("sum", () => {
  assert(sum([]) === 0);
  assert(sum([1]) === 1);
  assert(sum([2, 3]) === 5);
  assert(sum([4, 5, 6]) === 15);
  assert(sum([-1, -2, -1000]) === -1003);
});

Deno.test("average", () => {
  assert(average([]) === 0);
  assert(average([1]) === 1);
  assert(average([2, 3]) === 2.5);
  assert(average([4, 5, 6]) === 5);
  assert(Math.round(average([-1, -2, -1000])) === -334);
});

Deno.test("round", () => {
  assert(round(null as unknown as number) === 0);
  assert(round(1.1) === 1);
  assert(round(1.5) === 2);
  assert(round(1.9) === 2);
  assert(round(-1.1) === -1);
  assert(round(-1.5) === -1);
  assert(round(-1.9) === -2);
});

Deno.test("clamp", () => {
  assert(clamp(5, 0, 10) === 5);
  assert(clamp(-1, 0, 10) === 0);
  assert(clamp(15, 0, 10) === 10);
  assert(clamp(0, 0, 10) === 0);
  assert(clamp(10, 0, 10) === 10);
});

Deno.test("median", () => {
  assert(median([]) === 0);
  assert(median([1]) === 1);
  assert(median([1, 2, 3]) === 2);
  assert(median([1, 2, 3, 4]) === 2.5);
  assert(median([3, 1, 2]) === 2); // unsorted input
});

Deno.test("roundTo", () => {
  assert(roundTo(null as unknown as number, 2) === 0);
  assert(roundTo(1.235, 2) === 1.24);
  assert(roundTo(1.5, 0) === 2);
  assert(roundTo(1234.5, -2) === 1200);
  assert(roundTo(1.005, 2) === 1); // floating-point quirk; keep behavior documented
});
