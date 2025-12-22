import { isEmpty } from "./core.ts";

/**
 * Determines if a number is even.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` this will return `true`.
 *
 * @example
 * ```ts
 * isEven(null); // false
 * isEven(1); // false
 * isEven(2); // true
 * isEven(3); // false
 * isEven(4); // true
 * isEven(11); // false
 * isEven(21); // false
 * isEven(112); // true
 * ```
 */
export function isEven(num: number): boolean {
  return (num || 0) % 2 === 0;
}

/**
 * Determines if a number is odd.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` this will return `false`.
 *
 * @example
 * ```ts
 * isOdd(null); // false
 * isOdd(1); // true
 * isOdd(2); // false
 * isOdd(3); // true
 * isOdd(4); // false
 * isOdd(11); // true
 * isOdd(21); // true
 * isOdd(112); // false
 * ```
 */
export function isOdd(num: number): boolean {
  return !isEven(num);
}

/**
 * Converts a number to "1st", "2nd", "3rd", etc.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` this will return `0th`.
 *
 * @example
 * ```ts
 * ordinalize(null); // "0th"
 * ordinalize(1); // "1st"
 * ordinalize(2); // "2nd"
 * ordinalize(3); // "3rd"
 * ordinalize(4); // "4th"
 * ordinalize(11); // "11th"
 * ordinalize(21); // "21st"
 * ordinalize(112); // "112th"
 * ```
 */
export function ordinalize(num: number): string {
  num ||= 0;

  const v = num % 100;

  if (v >= 11 && v <= 13) return num + "th";

  switch (num % 10) {
    case 1:
      return num + "st";
    case 2:
      return num + "nd";
    case 3:
      return num + "rd";
    default:
      return num + "th";
  }
}

/**
 * Returns the maximum number from a list of numbers.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` this will return `0`.
 *
 * @example
 * ```ts
 * max([]); // 0
 * max([1]); // 1
 * max([2, 3]); // 3
 * max([4, 5, 6]); // 6
 * max([11, 21, 112]); // 112
 * ```
 */
export function max(nums: number[]): number {
  if (isEmpty(nums)) return 0;
  return Math.max(...nums);
}

/**
 * Returns the minimum number from a list of numbers.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` this will return `0`.
 *
 * @example
 * ```ts
 * min([]); // 0
 * min([1]); // 1
 * min([2, 3]); // 2
 * min([4, 5, 6]); // 4
 * min([11, 21, 112]); // 11
 * ```
 */
export function min(nums: number[]): number {
  if (isEmpty(nums)) return 0;
  return Math.min(...nums);
}

/**
 * Rounds a number to the nearest integer.
 *
 * @example
 * ```ts
 * round(null) // 0
 * round(1.2); // 1
 * round(1.5); // 2
 * round(1.8); // 2
 * round(2.2); // 2
 * round(2.5); // 3
 * round(2.8); // 3
 * ```
 */
export function round(num: number): number {
  return Math.round(num || 0);
}

/**
 * Returns the sum of a list of numbers.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` this will return `0`.
 *
 * @example
 * ```ts
 * sum([1]); // 1
 * sum([2, 3]); // 5
 * sum([4, 5, 6]); // 15
 * sum([11, 21, 112]); // 144
 * ```
 */
export function sum(nums: number[]): number {
  if (isEmpty(nums)) return 0;
  return nums.reduce((acc, num) => acc + num, 0);
}

/**
 * Returns the average number from a list of numbers.
 *
 * @remarks
 * This will include decimals, so you may want to use `Math.round`,
 * `Math.floor` or `Math.ceil`.
 *
 * @example
 * ```ts
 * average([1]); // 1
 * average([2, 3]); // 2.5
 * average([4, 5, 6]); // 5
 * average([11, 21, 112]); 48
 * ```
 * @example With a list of objects
 * ```ts
 * const people = [{ age: 20 }, { age: 18 }, { age: 19 }];
 * const averageAge = average(people.map(({ age }) => age));
 * console.log(averageAge); // 19
 * ```
 */
export function average(nums: number[]): number {
  if (isEmpty(nums)) return 0;
  return sum(nums) / nums.length;
}
