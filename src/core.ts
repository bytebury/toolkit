import { lower } from "./strings.ts";
import type { NonEmptyList, OneOrMany } from "./utility_types.ts";

/**
 * Clone an object using structuredClone.
 */
export function clone<T>(obj: T): T {
  return structuredClone(obj);
}

/**
 * Compares two things by turning them into strings,
 * and comparing them by their string value.
 *
 * @example
 * ```ts
 * isEqual("1", 1); // true
 * isEqual({foo: "bar"}, {foo: "bar"}); // true
 * isEqual([], []); // true
 * isEqual([0], [1]); // false
 * isEqual(false, " false "); // false
 * isEqual(false, "FALSE"); // false
 * ````
 */
export function isEqual(thing1: unknown, thing2: unknown): boolean {
  return stringify(thing1) === stringify(thing2);
}

/**
 * Returns the first thing in a list. If the value
 * is a string, then it will return the first character.
 *
 * @remarks
 * If an empty list is passed then this will return undefined.
 *
 * @example
 * ```ts
 * first("hello"); // "h"
 * first([1, 2, 3]); // 1
 * ```
 */
export function first<T>(list: NonEmptyList<T>): T;
export function first(value: string): string;
export function first<T>(
  value: string | NonEmptyList<T>,
): T | string | undefined {
  return value[0];
}

/**
 * Returns the last thing in a list. If the value
 * is a string, then it will return the last character.
 *
 * @remarks
 * If an empty list is passed then this will return undefined.
 *
 * @example
 * ```ts
 * last("hello"); // "o"
 * last([1, 2, 3]); // 3
 * ```
 */
export function last<T>(list: NonEmptyList<T>): T;
export function last(value: string): string;
export function last<T>(
  value: string | NonEmptyList<T>,
): T | string | undefined {
  return value[value.length - 1];
}

/**
 * Compares two things by turning them into strings,
 * and comparing them by their string value.
 *
 * @remarks this is the inverse of `isEqual`.
 *
 * @example
 * ```ts
 * isNotEqual("1", 1); // true
 * isNotEqual({foo: "bar"}, {foo: "bar"}); // true
 * isNotEqual([], []); // true
 * isNotEqual([0], [1]); // false
 * isNotEqual(false, " false "); // true
 * isNotEqual(false, "FALSE"); // false
 * ```
 */
export function isNotEqual(thing1: unknown, thing2: unknown): boolean {
  return !isEqual(thing1, thing2);
}

/**
 * Compares two things by turning them into strings and lowercasing
 * them, and comparing the string values. Works exactly like `isEqual` except
 * will lowercase both things before comparing.
 *
 * @example
 * ```ts
 * isEqualIgnoreCase("1", 1); // true
 * isEqualIgnoreCase({foo: "bar"}, {foo: "bar"}); // true
 * isEqualIgnoreCase([], []); // true
 * isEqualIgnoreCase([0], [1]); // false
 * isEqualIgnoreCase(false, " false "); // false
 * isEqualIgnoreCase(false, "FALSE"); // true
 * ```
 */
export function isEqualIgnoreCase(thing1: unknown, thing2: unknown): boolean {
  thing1 = lower(stringify(thing1));
  thing2 = lower(stringify(thing2));

  return thing1 === thing2;
}

/**
 * Compares two things by turning them into strings, trimming and lowercasing
 * them, and comparing the string values. Works exactly like `isEqual` except
 * will lowercase both things before comparing.
 *
 * @example
 * ```ts
 * isNotEqualIgnoreCase("1", 1); // false
 * isNotEqualIgnoreCase({foo: "bar"}, {foo: "bar"}); // false
 * isNotEqualIgnoreCase([], []); // false
 * isNotEqualIgnoreCase([0], [1]); // true
 * isNotEqualIgnoreCase(false, " false "); // true
 * isNotEqualIgnoreCase(false, "FALSE"); // false
 * ```
 */
export function isNotEqualIgnoreCase(
  thing1: unknown,
  thing2: unknown,
): boolean {
  return !isEqualIgnoreCase(thing1, thing2);
}

/**
 * Converts the given parameter into the string equivalent.
 *
 * If the thing provided has the type of "object", then this function
 * returns `JSON.stringify(thing)`. Otherwise, it will wrap the `thing`
 * in a String and convert it to it's string representation.
 *
 * @example
 * ```ts
 * stringify({ foo: "bar" }); // "{ "foo": "bar" }"
 * stringify([1, 2, 3]); // "[1, 2, 3]"
 * stringify(1); // "1"
 * ```
 */
export function stringify(thing: unknown): string {
  return typeof thing === "object" ? JSON.stringify(thing) : String(thing);
}

/**
 * Safely parses a string to JSON or returns the string itself. This will
 * never throw an error and internally called `JSON.parse(thing)`
 *
 * @example
 * ```ts
 * parse("Hello world!"); // "Hello world!"
 * parse<number>("0"); // 0
 * parse<User>("{\"name\":\"Bob\"}"); // { name: "Bob" } as User
 * ```
 */
export function parse<T>(thing: string): T | string {
  try {
    return JSON.parse(thing) as T;
  } catch {
    return thing;
  }
}

/**
 * Reverses the given string or list.
 *
 * If the thing provided is a string, then it will return the string in reverse
 * respecting all characters.
 *
 * If the thing is a list, then it will reverse all items in the list.
 *
 * @example
 * ```ts
 * reverse('Apple'); // "elppA"
 * reverse([1, 2, 3]); // [3, 2, 1]
 * reverse(new Set([1, 2, 3])); // Set[3, 2, 1]
 * ```
 */
export function reverse(thing: string): string;
export function reverse<T>(thing: T[]): T[];
export function reverse<T>(thing: Set<T>): Set<T>;
export function reverse<T>(
  thing: string | Set<T> | T[],
): string | Set<T> | T[] {
  if (typeof thing === "string") return thing.split("").reverse().join("");
  if (thing instanceof Set) return new Set([...thing].reverse());
  return thing.reverse();
}

/**
 * Determines if the given thing is empty.
 *
 * Things are empty when:
 *   * They are `None`
 *   * They are empty strings
 *   * They have no length or size
 *
 * @example
 * ```ts
 * isEmpty([]); // true
 * isEmpty([0]); // false
 * isEmpty(""); // true
 * isEmpty(" "); // false
 * isEmpty(new Set()); // true
 * isEmpty({}); // true
 * isEmpty(new Map()); // true
 * ```
 */
export function isEmpty(thing: unknown[]): boolean;
export function isEmpty(thing: unknown): boolean;
export function isEmpty(thing: string | OneOrMany<unknown>): boolean {
  if (isNone(thing)) return true;
  if (typeof thing === "string") return thing === "";
  if (Array.isArray(thing)) return thing.length === 0;
  if (thing instanceof Map || thing instanceof Set) return thing.size === 0;
  if (typeof thing === "object") return Object.keys(thing!).length === 0;
  return false;
}

/**
 * Determines if the given thing is not empty.
 *
 * @remarks this is the inverse of `isEmpty`.
 *
 * @example
 * ```ts
 * isNotEmpty([]); // false
 * isNotEmpty([0]); // true
 * isNotEmpty(""); // false
 * isNotEmpty(" "); // true
 * isNotEmpty(new Set()); // false
 * isNotEmpty({}); // false
 * isNotEmpty(new Map()); // false
 * ```
 */
export function isNotEmpty(thing: unknown[]): boolean;
export function isNotEmpty(thing: unknown): boolean;
export function isNotEmpty(thing: string | OneOrMany<unknown>): boolean {
  return !isEmpty(thing);
}

/**
 * Returns the distinct values from a list.
 *
 * @remarks same as `distinct`.
 *
 * @example
 * ```ts
 * const myList = [1, 2, 3, 3];
 * unique(myList); // [1, 2, 3];
 * ```
 */
export function unique<T>(list: T[]): T[] {
  return [...new Set(list)];
}

/**
 * Returns the distinct values from a list.
 *
 * @remarks alias for `unique`.
 *
 * @example
 * ```ts
 * const myList = [1, 2, 3, 3];
 * distinct(myList); // [1, 2, 3];
 * ```
 */
export function distinct<T>(list: T[]): T[] {
  return unique(list);
}

/**
 * Pick a random item from an array.
 *
 * @remarks
 * If you pass an empty list, then this function will return `undefined`.
 *
 * @example
 * ```ts
 * const myList = [1, 2, 3, 4];
 * const randomItem = sample(myList);
 *
 * console.log(randomItem); // could be 1, 2, 3, or 4
 * console.log(sample([])); // undefined
 * ```
 */
export function sample<T>(list: NonEmptyList<T>): T {
  return list[random(0, list.length)];
}

/**
 * Gives a random number in the given range. The first parameter is inclusive
 * and the second one is exclusive. Therefore, it will work with lists out of
 * the box.
 *
 * @example
 * ```ts
 * rand(0, 10); // 0 -> 9
 * rand(3, 7); // 3 -> 6
 * ```
 */
export function random(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start)) + start;
}

/**
 * Determines if the given value is truthy.
 *
 * @example
 * ```ts
 * truthy(true); // true
 * truthy(false); // false
 * truthy(''); // false
 * ```
 */
export function truthy(thing: unknown): boolean {
  return Boolean(thing) === true;
}

/**
 * Determines if the given value is falsy.
 *
 * @example
 * ```ts
 * falsy(true); // false
 * falsy(false); // true
 * falsy(''); // true
 * ```
 */
export function falsy(thing: unknown): boolean {
  return !truthy(thing);
}

/**
 * Returns true if the given value is not null or undefined.
 *
 * @example
 * ```ts
 * isSome(null); // false
 * isSome(undefined); // false
 * isSome(0); // true
 * isSome({}); // true
 * ```
 */
export function isSome(thing: unknown): boolean {
  return !isNone(thing);
}

/**
 * Returns true if the given value is null or undefined.
 *
 * @example
 * ```ts
 * isNone(null); // true
 * isNone(undefined); // true
 * isNone(true); // false
 * isNone(0); // false
 * ```
 */
export function isNone(thing: unknown): boolean {
  return thing === null || thing === undefined;
}

/**
 * Returns a function that does nothing.
 *
 * @example
 * ```ts
 * const doNothing = noop();
 * doNothing(); // does nothing
 * ```
 */
export function noop(): void {
  // Do nothing
}

/**
 * Returns a function that does nothing. Similar to `noop`, however
 * this allows you to put in an optional message regarding todos.
 *
 * @example
 * ```ts
 * function doLater(): void {
 *   todo();
 *   todo("We'll do this thing later");
 * }
 * ```
 */
// deno-lint-ignore no-unused-vars -- intentional unused variable for demonstration
export function todo(message?: string): void {
  noop();
}

/**
 * Returns true if the given value is within the given range.
 *
 * @example
 * ```ts
 * inRange(5, 0, 10); // true
 * inRange(0, 0, 10); // true
 * inRange(10, 0, 10); // true
 * inRange(11, 0, 10); // false
 * ```
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Splits an array into chunks of a fixed size.
 *
 * @example
 * ```ts
 * chunk([1,2,3,4,5,6,7], 3); // [[1,2,3],[4,5,6],[7]]
 * chunk(['a','b','c','d'], 2); // [['a','b'], ['c','d']]
 * ```
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) throw new Error("chunk size must be > 0");

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Returns the union of multiple arrays.
 *
 * @example
 * ```ts
 * union([1,2,3], [2,3,4]); // [1,2,3,4]
 * union(['a','b','c'], ['b','c','d']); // ['a','b','c','d']
 * ```
 */
export function union<T>(...lists: T[][]): T[] {
  return [...new Set(lists.flat())];
}

/**
 * Returns the difference of multiple arrays.
 *
 * @example
 * ```ts
 * difference([1,2,3], [2,3,4]); // [1]
 * difference(['a','b','c'], ['b','c','d']); // ['a']
 * ```
 */
export function difference<T>(...lists: T[][]): T[] {
  const set = new Set(lists[0]);
  for (const list of lists.slice(1)) {
    for (const item of list) {
      set.delete(item);
    }
  }
  return Array.from(set);
}

/**
 * Returns the intersection of multiple arrays.
 *
 * @example
 * ```ts
 * intersection([1,2,3], [2,3,4]); // [2,3]
 * intersection(['a','b','c'], ['b','c','d']); // ['b','c']
 * ```
 */
export function intersection<T>(...lists: T[][]): T[] {
  if (lists.length === 0) return [];

  return lists.reduce((acc, current) => {
    const currentSet = new Set(current);
    return acc.filter((item) => currentSet.has(item));
  });
}
