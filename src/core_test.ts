import {
  assert,
  assertEquals,
  assertFalse,
  assertNotStrictEquals,
  assertStrictEquals,
} from "@std/assert";

import {
  chunk,
  clone,
  compact,
  difference,
  distinct,
  drop,
  falsy,
  first,
  groupBy,
  includes,
  includesAny,
  intersection,
  isArray,
  isEmpty,
  isEqual,
  isEqualIgnoreCase,
  isNone,
  isNotEmpty,
  isNotEqual,
  isNotEqualIgnoreCase,
  isSome,
  last,
  move,
  noop,
  parse,
  partition,
  range,
  reverse,
  sample,
  sortBy,
  splice,
  stringify,
  swap,
  take,
  todo,
  truthy,
  union,
  unique,
  zip,
} from "../src/core.ts";

if (!Set.prototype.symmetricDifference) {
  Set.prototype.symmetricDifference = function <T>(other: Set<T>) {
    const a = new Set(this);
    const b = new Set(other);
    const result = new Set<T>();
    for (const v of a) if (!b.has(v)) result.add(v);
    for (const v of b) if (!a.has(v)) result.add(v);
    return result;
  };
}

Deno.test("isEqual: numbers and strings", () => {
  assert(isEqual("1", 1));
  assertFalse(isEqual(false, " false "));
});

Deno.test("isEqual: objects", () => {
  assert(isEqual({ foo: "bar" }, { foo: "bar" }));
});

Deno.test("isEqual: empty arrays", () => {
  assert(isEqual([], []));
});

Deno.test("isEqual: different arrays", () => {
  assertFalse(isEqual([0], [1]));
});

Deno.test("isEqual: different strings/cases", () => {
  assertFalse(isEqual(false, "FALSE"));
  assertFalse(isEqual("hello", "world"));
});

Deno.test("isNotEqual basic behavior", () => {
  assertFalse(isNotEqual("1", 1));
  assert(isNotEqual("2", 1));
  assertFalse(isNotEqual({ foo: "bar" }, { foo: "bar" }));
  assert(isNotEqual([], [1]));
  assert(isNotEqual("false ", "false"));
  assertFalse(isNotEqual("false", false));
});

Deno.test("isEqualIgnoreCase basic comparisons", () => {
  assert(isEqualIgnoreCase("1", 1));
  assertFalse(isEqualIgnoreCase(false, " false "));
  assert(isEqualIgnoreCase(false, "FALSE"));
});

Deno.test("isEqualIgnoreCase objects", () => {
  assert(isEqualIgnoreCase({ foo: "bar" }, { foo: "bar" }));
  assert(isEqualIgnoreCase({ Foo: "BAR" }, { foo: "bar" }));
});

Deno.test("isEqualIgnoreCase arrays", () => {
  assert(isEqualIgnoreCase([], []));
  assertFalse(isEqualIgnoreCase([0], [1]));
});

Deno.test("isEqualIgnoreCase different strings", () => {
  assertFalse(isEqualIgnoreCase("hello", "world"));
});

Deno.test("isNotEqualIgnoreCase basic behavior", () => {
  assertFalse(isNotEqualIgnoreCase("1", 1));
  assert(isNotEqualIgnoreCase("2", 1));
});

Deno.test("isNotEqualIgnoreCase arrays/objects", () => {
  assert(isNotEqualIgnoreCase([0], [1]));
  assertFalse(isNotEqualIgnoreCase({ foo: "bar" }, { foo: "bar" }));
});

Deno.test("isNotEqualIgnoreCase booleans", () => {
  assert(isNotEqualIgnoreCase(false, " false "));
  assert(isNotEqualIgnoreCase(false, "false_not"));
  assertFalse(isNotEqualIgnoreCase(false, "FALSE"));
});

Deno.test("stringify converts values to strings", () => {
  assertStrictEquals(stringify({ a: 1 }), JSON.stringify({ a: 1 }));
  assertStrictEquals(stringify([1, 2, 3]), "[1,2,3]");
  assertStrictEquals(stringify(42), "42");
  assertStrictEquals(stringify("hello"), "hello");
});

Deno.test("parse strings to strings", () => {
  assertStrictEquals(parse("thing"), "thing");
  assertStrictEquals(parse("another string"), "another string");
});

Deno.test("parse objects to objects", () => {
  assertEquals(parse(stringify({ foo: "bar" })), { foo: "bar" });
});

Deno.test("parse lists to lists", () => {
  assertEquals(parse<number[]>("[0, 1, 2]"), [0, 1, 2]);
});

Deno.test("parse null to null", () => {
  assertEquals(parse("null"), null);
});

Deno.test("clone deep copies", () => {
  const obj = { a: 1 };
  const arr = [1, 2, 3];

  const clonedObj = clone(obj);
  const clonedArr = clone(arr);

  assertEquals(clonedObj, obj);
  assertNotStrictEquals(clonedObj, obj);

  assertEquals(clonedArr, arr);
  assertNotStrictEquals(clonedArr, arr);
});

Deno.test("reverse strings", () => {
  assertStrictEquals(reverse("abc"), "cba");
});

Deno.test("reverse arrays", () => {
  assertEquals(reverse([1, 2, 3]), [3, 2, 1]);
});

Deno.test("reverse sets", () => {
  assertEquals(reverse(new Set([1, 2, 3])), new Set([3, 2, 1]));
});

Deno.test("isEmpty base cases", () => {
  assert(isEmpty(null));
  assert(isEmpty(undefined));
});

Deno.test("isEmpty strings", () => {
  assert(isEmpty(""));
  assertFalse(isEmpty("\n\t"));
  assertFalse(isEmpty("   "));
  assertFalse(isEmpty("Hello"));
});

Deno.test("isEmpty arrays", () => {
  assert(isEmpty([]));
  assertFalse(isEmpty([1, 2]));
});

Deno.test("isEmpty objects", () => {
  assert(isEmpty({}));
  assertFalse(isEmpty({ foo: "bar" }));
});

Deno.test("isEmpty Set and Map", () => {
  assert(isEmpty(new Set()));
  assert(isEmpty(new Map()));
  assertFalse(isEmpty(new Set([1])));
  assertFalse(isEmpty(new Map([["key", "value"]])));
});

Deno.test("isNotEmpty behavior", () => {
  assertFalse(isNotEmpty(null));
  assertFalse(isNotEmpty(""));
  assert(isNotEmpty("Hello"));
  assert(isNotEmpty([1]));
  assertFalse(isNotEmpty([]));
  assert(isNotEmpty({ foo: "bar" }));
  assertFalse(isNotEmpty({}));
  assert(isNotEmpty(new Set([1])));
  assertFalse(isNotEmpty(new Set()));
});

Deno.test("unique produces distinct values", () => {
  assertEquals(unique([1, 2, 2, 3]), [1, 2, 3]);
  assertEquals(unique(["a", "b", "a"]), ["a", "b"]);
  assertEquals(unique([]), []);
});

Deno.test("distinct is alias for unique", () => {
  assertEquals(distinct([1, 2, 2, 3]), [1, 2, 3]);
  assertEquals(distinct(["x", "x", "y"]), ["x", "y"]);
});

Deno.test("sample empty array", () => {
  assertStrictEquals(sample([]), undefined);
});

Deno.test("sample non-empty", () => {
  const list = [1, 2, 3, 4, 5];
  const result = sample(list);
  assert(list.includes(result as number));
});

Deno.test("truthy detection", () => {
  assert(truthy(true));
  assert(truthy(1));
  assert(truthy("non-empty"));

  assertFalse(truthy(false));
  assertFalse(truthy(0));
  assertFalse(truthy(""));
  assertFalse(truthy(null));
  assertFalse(truthy(undefined));
});

Deno.test("falsy detection", () => {
  assert(falsy(false));
  assert(falsy(0));
  assert(falsy(""));
  assert(falsy(null));
  assert(falsy(undefined));

  assertFalse(falsy(true));
  assertFalse(falsy(1));
  assertFalse(falsy("hello"));
});

Deno.test("last string", () => {
  assertStrictEquals(last("hello world"), "d");
  assertStrictEquals(last("o"), "o");
});

Deno.test("last array", () => {
  assertStrictEquals(last([1]), 1);
  assertStrictEquals(last([1, 2, 3]), 3);
});

Deno.test("first string", () => {
  assertStrictEquals(first("hello world"), "h");
  assertStrictEquals(first("o"), "o");
});

Deno.test("first array", () => {
  assertStrictEquals(first([1]), 1);
  assertStrictEquals(first([1, 2, 3]), 1);
});

Deno.test("first/last/sample accept plain T[] and empty arrays", () => {
  const nums: number[] = [1, 2, 3];
  assertStrictEquals(first(nums), 1);
  assertStrictEquals(last(nums), 3);
  assert(nums.includes(sample(nums) as number));

  assertStrictEquals(first([]), undefined);
  assertStrictEquals(last([]), undefined);
  assertStrictEquals(first(""), undefined);
  assertStrictEquals(last(""), undefined);
});

Deno.test("isSome", () => {
  assertFalse(isSome(null));
  assertFalse(isSome(undefined));

  assert(isSome(0));
  assert(isSome(1));
  assert(isSome(""));
  assert(isSome("Something"));
  assert(isSome([]));
});

Deno.test("isNone", () => {
  assert(isNone(null));
  assert(isNone(undefined));

  assertFalse(isNone(0));
  assertFalse(isNone(1));
  assertFalse(isNone(""));
  assertFalse(isNone("Something"));
  assertFalse(isNone([]));
});

Deno.test("noop behavior", () => {
  noop();
});

Deno.test("todo behavior", () => {
  todo();
  todo("Example usage");
});

Deno.test("chunk", () => {
  assertStrictEquals(chunk([1, 2, 3], 2).length, 2);
  assertStrictEquals(chunk([1, 2, 3], 2)[0].length, 2);
  assertStrictEquals(chunk([1, 2, 3], 2)[1].length, 1);
});

Deno.test("difference", () => {
  assertStrictEquals(difference([1, 2, 3], [2, 3, 4]).length, 1);
  assertStrictEquals(difference(["a", "b", "c"], ["b", "c", "d"]).length, 1);
});

Deno.test("intersection", () => {
  assertStrictEquals(intersection([1, 2, 3], [2, 3, 4]).length, 2);
  assertStrictEquals(intersection(["a", "b", "c"], ["b", "c", "d"]).length, 2);
});

Deno.test("union", () => {
  assertStrictEquals(union([1, 2, 3], [2, 3, 4]).length, 4);
  assertStrictEquals(union(["a", "b", "c"], ["b", "c", "d"]).length, 4);
});

Deno.test("includes string in string", () => {
  assert(includes("hello world", "hello"));
  assert(includes("hello world", "world"));
  assertFalse(includes("hello world", "moon"));
});

Deno.test("includes list of strings in string", () => {
  assert(includes("hello world", ["hello", "world"]));
  assertFalse(includes("hello world", ["hello", "moon"]));
  assert(includes("hello world", []));
});

Deno.test("includes string in list", () => {
  assert(includes(["a", "b", "c"], "a"));
  assertFalse(includes(["a", "b", "c"], "d"));
});

Deno.test("includes list in list", () => {
  assert(includes(["a", "b", "c"], ["a", "b"]));
  assertFalse(includes(["a", "b", "c"], ["a", "d"]));
  assert(includes(["a", "b", "c"], []));
});

Deno.test("includesAny string in string", () => {
  assert(includesAny("hello world", "hello"));
  assertFalse(includesAny("hello world", "moon"));
});

Deno.test("includesAny list of strings in string", () => {
  assert(includesAny("hello world", ["hello", "moon"]));
  assertFalse(includesAny("hello world", ["sun", "moon"]));
  assertFalse(includesAny("hello world", []));
});

Deno.test("includesAny string in list", () => {
  assert(includesAny(["a", "b", "c"], "a"));
  assertFalse(includesAny(["a", "b", "c"], "d"));
});

Deno.test("includesAny list in list", () => {
  assert(includesAny(["a", "b", "c"], ["a", "d"]));
  assertFalse(includesAny(["a", "b", "c"], ["d", "e"]));
  assertFalse(includesAny(["a", "b", "c"], []));
});

Deno.test("includes returns false for null or undefined inputs", () => {
  assertFalse(includes(null, "hello"));
  assertFalse(includes(undefined, "hello"));
  assertFalse(includes("hello world", null));
  assertFalse(includes("hello world", undefined));
  assertFalse(includes(null, null));
  assertFalse(includes(undefined, undefined));
  assertFalse(includes(null, ["hello"]));
  assertFalse(includes(["a", "b"], null));
});

Deno.test("includesAny returns false for null or undefined inputs", () => {
  assertFalse(includesAny(null, "hello"));
  assertFalse(includesAny(undefined, "hello"));
  assertFalse(includesAny("hello world", null));
  assertFalse(includesAny("hello world", undefined));
  assertFalse(includesAny(null, null));
  assertFalse(includesAny(undefined, undefined));
  assertFalse(includesAny(null, ["hello"]));
  assertFalse(includesAny(["a", "b"], null));
});

Deno.test("splice removes elements without mutation", () => {
  const original = [1, 2, 3, 4];
  const result = splice(original, 1, 2);
  assertEquals(result, [1, 4]);
  assertEquals(original, [1, 2, 3, 4]);
});

Deno.test("splice inserts elements", () => {
  assertEquals(splice([1, 2, 3], 1, 0, [9, 10]), [1, 9, 10, 2, 3]);
});

Deno.test("splice replaces elements", () => {
  assertEquals(splice([1, 2, 3, 4], 1, 2, [9]), [1, 9, 4]);
});

Deno.test("splice with no deleteCount removes from start to end", () => {
  assertEquals(splice([1, 2, 3, 4], 2), [1, 2]);
});

Deno.test("isArray", () => {
  assert(isArray([]));
  assert(isArray([1, 2, 3]));
  assert(isArray(new Array(5)));
  assertFalse(isArray("hello"));
  assertFalse(isArray(null));
  assertFalse(isArray(undefined));
  assertFalse(isArray({}));
  assertFalse(isArray(42));
  assertFalse(isArray(new Set([1, 2])));
});

Deno.test("isArray narrows the type", () => {
  const value: unknown = [1, 2, 3];
  if (isArray(value)) {
    assertEquals(value.length, 3);
  } else {
    throw new Error("expected isArray to narrow");
  }
});

Deno.test("groupBy groups items by key function", () => {
  const result = groupBy([1, 2, 3, 4], (n) => n % 2 === 0 ? "even" : "odd");
  assertEquals(result.get("even"), [2, 4]);
  assertEquals(result.get("odd"), [1, 3]);
  assertEquals(result.size, 2);
});

Deno.test("groupBy on empty list returns empty map", () => {
  const result = groupBy<number, string>([], (n) => String(n));
  assertEquals(result.size, 0);
});

Deno.test("partition splits list by predicate", () => {
  assertEquals(partition([1, 2, 3, 4], (n) => n % 2 === 0), [[2, 4], [1, 3]]);
  assertEquals(partition([], (n: number) => n > 0), [[], []]);
});

Deno.test("sortBy sorts without mutating", () => {
  const original = [{ age: 30 }, { age: 20 }, { age: 25 }];
  const sorted = sortBy(original, (p) => p.age);
  assertEquals(sorted, [{ age: 20 }, { age: 25 }, { age: 30 }]);
  assertEquals(original, [{ age: 30 }, { age: 20 }, { age: 25 }]);
});

Deno.test("sortBy works with string keys", () => {
  assertEquals(
    sortBy(["banana", "apple", "cherry"], (s) => s),
    ["apple", "banana", "cherry"],
  );
});

Deno.test("compact removes null and undefined", () => {
  assertEquals(compact([1, null, 2, undefined, 3]), [1, 2, 3]);
  assertEquals(compact(["a", "", null, "b"]), ["a", "", "b"]);
  assertEquals(compact([0, false, null]), [0, false]);
});

Deno.test("range generates ascending numbers", () => {
  assertEquals(range(0, 5), [0, 1, 2, 3, 4]);
  assertEquals(range(2, 8, 2), [2, 4, 6]);
  assertEquals(range(0, 0), []);
});

Deno.test("range generates descending numbers with negative step", () => {
  assertEquals(range(5, 0, -1), [5, 4, 3, 2, 1]);
});

Deno.test("range throws on zero step", () => {
  let threw = false;
  try {
    range(0, 5, 0);
  } catch {
    threw = true;
  }
  assert(threw);
});

Deno.test("zip pairs up two lists, stopping at shorter", () => {
  assertEquals(zip([1, 2, 3], ["a", "b", "c"]), [[1, "a"], [2, "b"], [3, "c"]]);
  assertEquals(zip([1, 2, 3], ["a"]), [[1, "a"]]);
  assertEquals(zip<number, string>([], []), []);
});

Deno.test("take returns first n elements", () => {
  assertEquals(take([1, 2, 3, 4], 2), [1, 2]);
  assertEquals(take([1, 2], 5), [1, 2]);
  assertEquals(take([1, 2, 3], 0), []);
  assertEquals(take([1, 2, 3], -1), []);
});

Deno.test("drop removes first n elements", () => {
  assertEquals(drop([1, 2, 3, 4], 2), [3, 4]);
  assertEquals(drop([1, 2], 5), []);
  assertEquals(drop([1, 2, 3], 0), [1, 2, 3]);
  assertEquals(drop([1, 2, 3], -1), [1, 2, 3]);
});

Deno.test("swap swaps two indices without mutation", () => {
  const original = [1, 2, 3, 4];
  assertEquals(swap(original, 0, 3), [4, 2, 3, 1]);
  assertEquals(original, [1, 2, 3, 4]);
});

Deno.test("move moves an element to a new index without mutation", () => {
  const original = [1, 2, 3, 4];
  assertEquals(move(original, 0, 2), [2, 3, 1, 4]);
  assertEquals(move([1, 2, 3, 4], 3, 0), [4, 1, 2, 3]);
  assertEquals(original, [1, 2, 3, 4]);
});
