import type { None } from "./utility_types.ts";

/**
 * Returns a strongly-typed array of an object's own enumerable keys.
 *
 * @remarks
 * This is `None` safe. If you pass `null | undefined` then this will return an empty array.
 *
 * @example
 * ```ts
 * keys({ a: 1, b: 2 }); // ["a", "b"]
 * keys({}); // []
 * keys(null); // []
 * ```
 */
export function keys<T extends Record<string, unknown>>(
  obj: T | None,
): (keyof T)[] {
  if (obj == null) return [];
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Returns a strongly-typed array of an object's own enumerable `[key, value]` pairs.
 *
 * @remarks
 * This is `None` safe. If you pass `null | undefined` then this will return an empty array.
 *
 * @example
 * ```ts
 * entries({ a: 1, b: 2 }); // [["a", 1], ["b", 2]]
 * entries({}); // []
 * entries(null); // []
 * ```
 */
export function entries<T extends Record<string, unknown>>(
  obj: T | None,
): [keyof T, T[keyof T]][] {
  if (obj == null) return [];
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Returns a new object containing only the specified keys. Keys that are not
 * present on the source object are silently ignored.
 *
 * @remarks
 * This is `None` safe. If you pass `null | undefined` then this will return an empty object.
 *
 * @example
 * ```ts
 * pick({ a: 1, b: 2, c: 3 }, ["a", "c"]); // { a: 1, c: 3 }
 * pick({ a: 1, b: 2 }, []); // {}
 * pick(null, ["a"]); // {}
 * ```
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T | None,
  keys: K[],
): Pick<T, K> {
  if (obj == null) return {} as Pick<T, K>;
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

/**
 * Returns a new object with the specified keys excluded.
 *
 * @remarks
 * This is `None` safe. If you pass `null | undefined` then this will return an empty object.
 *
 * @example
 * ```ts
 * omit({ a: 1, b: 2, c: 3 }, ["a"]); // { b: 2, c: 3 }
 * omit({ a: 1, b: 2 }, []); // { a: 1, b: 2 }
 * omit(null, ["a"]); // {}
 * ```
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T | None,
  keys: K[],
): Omit<T, K> {
  if (obj == null) return {} as Omit<T, K>;
  const excluded = new Set<keyof T>(keys);
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    if (!excluded.has(key as keyof T)) result[key] = obj[key];
  }
  return result as Omit<T, K>;
}

/**
 * Returns a new object with the same keys, where each value is transformed by `fn`.
 *
 * @remarks
 * This is `None` safe. If you pass `null | undefined` then this will return an empty object.
 *
 * @example
 * ```ts
 * mapValues({ a: 1, b: 2 }, (v) => v * 2); // { a: 2, b: 4 }
 * mapValues({ a: 1, b: 2 }, (v, k) => `${k}=${v}`); // { a: "a=1", b: "b=2" }
 * mapValues(null, (v) => v); // {}
 * ```
 */
export function mapValues<T extends Record<string, unknown>, V>(
  obj: T | None,
  fn: (value: T[keyof T], key: keyof T) => V,
): { [K in keyof T]: V } {
  if (obj == null) return {} as { [K in keyof T]: V };
  const result = {} as { [K in keyof T]: V };
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[key] = fn(obj[key] as T[keyof T], key);
  }
  return result;
}

/**
 * Returns a new object with each key transformed by `fn`. Values are unchanged.
 * If `fn` produces duplicate keys, later entries overwrite earlier ones.
 *
 * @remarks
 * This is `None` safe. If you pass `null | undefined` then this will return an empty object.
 *
 * @example
 * ```ts
 * mapKeys({ a: 1, b: 2 }, (k) => k.toUpperCase()); // { A: 1, B: 2 }
 * mapKeys({ first: "Bob", last: "Lee" }, (k) => `user_${k}`); // { user_first: "Bob", user_last: "Lee" }
 * mapKeys(null, (k) => k); // {}
 * ```
 */
export function mapKeys<T extends Record<string, unknown>>(
  obj: T | None,
  fn: (key: keyof T, value: T[keyof T]) => string,
): Record<string, T[keyof T]> {
  if (obj == null) return {};
  const result: Record<string, T[keyof T]> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[fn(key, obj[key] as T[keyof T])] = obj[key] as T[keyof T];
  }
  return result;
}
