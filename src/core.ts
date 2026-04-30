import { lower } from "./strings.ts";

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
 * If an empty list or string is passed then this will return undefined.
 *
 * @example
 * ```ts
 * first("hello"); // "h"
 * first([1, 2, 3]); // 1
 * first([]); // undefined
 * ```
 */
export function first(value: string): string | undefined;
export function first<T>(list: T[]): T | undefined;
export function first<T>(value: string | T[]): T | string | undefined {
  return value[0];
}

/**
 * Returns the last thing in a list. If the value
 * is a string, then it will return the last character.
 *
 * @remarks
 * If an empty list or string is passed then this will return undefined.
 *
 * @example
 * ```ts
 * last("hello"); // "o"
 * last([1, 2, 3]); // 3
 * last([]); // undefined
 * ```
 */
export function last(value: string): string | undefined;
export function last<T>(list: T[]): T | undefined;
export function last<T>(value: string | T[]): T | string | undefined {
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
export function isEmpty(thing: unknown): boolean {
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
export function isNotEmpty(thing: unknown): boolean {
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
export function sample<T>(list: T[]): T | undefined {
  return list[Math.floor(Math.random() * list.length)];
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
 * Determines if the given value is an array. Acts as a type guard, narrowing
 * the value to `unknown[]` in branches where the result is `true`.
 *
 * @remarks alias for `Array.isArray`.
 *
 * @example
 * ```ts
 * isArray([]); // true
 * isArray([1, 2, 3]); // true
 * isArray("hello"); // false
 * isArray(null); // false
 * isArray({}); // false
 * ```
 */
export function isArray(thing: unknown): thing is unknown[] {
  return Array.isArray(thing);
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

/**
 * Determines if `searchIn` contains the given `searchFor` term(s).
 *
 * When `searchIn` is a string, this performs a substring check.
 * When `searchIn` is a list, this performs an element check.
 * When `searchFor` is a list, every item must be found.
 *
 * @remarks
 * If `searchFor` is an empty list, this returns `true` (vacuously, since
 * every item in an empty list is found).
 *
 * If either `searchIn` or `searchFor` is `null` or `undefined`, this
 * returns `false`.
 *
 * @example
 * ```ts
 * includes("hello world", "hello"); // true
 * includes("hello world", ["hello", "world"]); // true
 * includes("hello world", ["hello", "moon"]); // false
 * includes(["a", "b", "c"], "a"); // true
 * includes(["a", "b", "c"], ["a", "b"]); // true
 * includes(["a", "b", "c"], ["a", "d"]); // false
 * includes("hello world", []); // true
 * includes(null, "hello"); // false
 * includes("hello world", undefined); // false
 * ```
 */
export function includes(
  searchIn: string | string[] | null | undefined,
  searchFor: string | string[] | null | undefined,
): boolean {
  if (searchIn == null || searchFor == null) return false;
  const terms = Array.isArray(searchFor) ? searchFor : [searchFor];
  return terms.every((term) => searchIn.includes(term));
}

/**
 * Determines if `searchIn` contains any of the given `searchFor` term(s).
 *
 * When `searchIn` is a string, this performs a substring check.
 * When `searchIn` is a list, this performs an element check.
 * When `searchFor` is a list, at least one item must be found.
 *
 * @remarks
 * If `searchFor` is an empty list, this returns `false` (there is no term
 * to match).
 *
 * If either `searchIn` or `searchFor` is `null` or `undefined`, this
 * returns `false`.
 *
 * @example
 * ```ts
 * includesAny("hello world", "hello"); // true
 * includesAny("hello world", ["hello", "moon"]); // true
 * includesAny("hello world", ["sun", "moon"]); // false
 * includesAny(["a", "b", "c"], "a"); // true
 * includesAny(["a", "b", "c"], ["a", "d"]); // true
 * includesAny(["a", "b", "c"], ["d", "e"]); // false
 * includesAny("hello world", []); // false
 * includesAny(null, "hello"); // false
 * includesAny("hello world", undefined); // false
 * ```
 */
export function includesAny(
  searchIn: string | string[] | null | undefined,
  searchFor: string | string[] | null | undefined,
): boolean {
  if (searchIn == null || searchFor == null) return false;
  const terms = Array.isArray(searchFor) ? searchFor : [searchFor];
  return terms.some((term) => searchIn.includes(term));
}

/**
 * Returns a new array with elements removed and/or inserted, without mutating the original.
 *
 * @param list - The source array
 * @param start - Index at which to start changing the array
 * @param deleteCount - Number of elements to remove
 * @param items - Elements to insert at the start index
 * @returns A new array with the modifications applied
 *
 * @example
 * ```ts
 * splice([1, 2, 3, 4], 1, 2) // [1, 4]
 * splice([1, 2, 3], 1, 0, [9, 10]) // [1, 9, 10, 2, 3]
 * splice([1, 2, 3, 4], 2) // [1, 2] — omitting deleteCount removes from start to end
 * ```
 */
export function splice<T>(
  list: T[],
  start: number,
  deleteCount?: number,
  items: T[] = [],
): T[] {
  const copy = [...list];
  copy.splice(start, deleteCount ?? list.length, ...items);
  return copy;
}

/**
 * Groups items into a `Map` keyed by the value returned from `keyFn`.
 *
 * @example
 * ```ts
 * groupBy([1, 2, 3, 4], (n) => n % 2 === 0 ? "even" : "odd");
 * // Map { "odd" => [1, 3], "even" => [2, 4] }
 *
 * const people = [{ role: "admin", name: "A" }, { role: "user", name: "B" }];
 * groupBy(people, (p) => p.role);
 * // Map { "admin" => [{...}], "user" => [{...}] }
 * ```
 */
export function groupBy<T, K>(list: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const result = new Map<K, T[]>();
  for (const item of list) {
    const key = keyFn(item);
    const existing = result.get(key);
    if (existing) existing.push(item);
    else result.set(key, [item]);
  }
  return result;
}

/**
 * Splits a list into two: the first contains items where the predicate is true,
 * the second contains items where it is false.
 *
 * @example
 * ```ts
 * partition([1, 2, 3, 4], (n) => n % 2 === 0); // [[2, 4], [1, 3]]
 * ```
 */
export function partition<T>(
  list: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of list) {
    if (predicate(item)) pass.push(item);
    else fail.push(item);
  }
  return [pass, fail];
}

/**
 * Returns a new array sorted by the value returned from `keyFn`.
 *
 * @remarks
 * Does not mutate the input list.
 *
 * @example
 * ```ts
 * sortBy([{ age: 30 }, { age: 20 }], (p) => p.age); // [{ age: 20 }, { age: 30 }]
 * sortBy(["banana", "apple", "cherry"], (s) => s); // ["apple", "banana", "cherry"]
 * ```
 */
export function sortBy<T>(
  list: T[],
  keyFn: (item: T) => number | string,
): T[] {
  return [...list].sort((a, b) => {
    const aKey = keyFn(a);
    const bKey = keyFn(b);
    if (aKey < bKey) return -1;
    if (aKey > bKey) return 1;
    return 0;
  });
}

/**
 * Removes `null` and `undefined` values from a list.
 *
 * @example
 * ```ts
 * compact([1, null, 2, undefined, 3]); // [1, 2, 3]
 * compact(["a", "", null, "b"]); // ["a", "", "b"]
 * ```
 */
export function compact<T>(list: (T | null | undefined)[]): T[] {
  return list.filter(isSome) as T[];
}

/**
 * Generates a list of numbers in the given range. The start is inclusive,
 * the end is exclusive.
 *
 * @example
 * ```ts
 * range(0, 5); // [0, 1, 2, 3, 4]
 * range(2, 8, 2); // [2, 4, 6]
 * range(5, 0, -1); // [5, 4, 3, 2, 1]
 * ```
 */
export function range(start: number, end: number, step: number = 1): number[] {
  if (step === 0) throw new Error("range step must not be 0");
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i);
  } else {
    for (let i = start; i > end; i += step) result.push(i);
  }
  return result;
}

/**
 * Pairs up elements from two lists. Stops at the shorter list.
 *
 * @example
 * ```ts
 * zip([1, 2, 3], ["a", "b", "c"]); // [[1, "a"], [2, "b"], [3, "c"]]
 * zip([1, 2, 3], ["a"]); // [[1, "a"]]
 * ```
 */
export function zip<A, B>(a: A[], b: B[]): [A, B][] {
  const length = Math.min(a.length, b.length);
  const result: [A, B][] = [];
  for (let i = 0; i < length; i++) result.push([a[i], b[i]]);
  return result;
}

/**
 * Returns the first `n` elements of a list. Does not mutate the input.
 *
 * @example
 * ```ts
 * take([1, 2, 3, 4], 2); // [1, 2]
 * take([1, 2], 5); // [1, 2]
 * take([1, 2, 3], 0); // []
 * ```
 */
export function take<T>(list: T[], n: number): T[] {
  return list.slice(0, Math.max(0, n));
}

/**
 * Returns a list with the first `n` elements removed. Does not mutate the input.
 *
 * @example
 * ```ts
 * drop([1, 2, 3, 4], 2); // [3, 4]
 * drop([1, 2], 5); // []
 * ```
 */
export function drop<T>(list: T[], n: number): T[] {
  return list.slice(Math.max(0, n));
}

/**
 * Returns a new list with the elements at indices `i` and `j` swapped.
 *
 * @example
 * ```ts
 * swap([1, 2, 3, 4], 0, 3); // [4, 2, 3, 1]
 * ```
 */
export function swap<T>(list: T[], i: number, j: number): T[] {
  const copy = [...list];
  [copy[i], copy[j]] = [copy[j], copy[i]];
  return copy;
}

/**
 * Returns a new list with an element moved from one index to another.
 *
 * @example
 * ```ts
 * move([1, 2, 3, 4], 0, 2); // [2, 3, 1, 4]
 * ```
 */
export function move<T>(list: T[], from: number, to: number): T[] {
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}
