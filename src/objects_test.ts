import { assertEquals } from "@std/assert";
import { entries, keys, mapKeys, mapValues, omit, pick } from "./objects.ts";

Deno.test("keys returns object keys", () => {
  assertEquals(keys({ a: 1, b: 2 }), ["a", "b"]);
  assertEquals(keys({}), []);
});

Deno.test("keys is None-safe", () => {
  const a: Record<string, unknown> | null = null;
  const b: Record<string, unknown> | undefined = undefined;
  assertEquals(keys(a), []);
  assertEquals(keys(b), []);
});

Deno.test("entries returns key-value pairs", () => {
  assertEquals(entries({ a: 1, b: 2 }), [["a", 1], ["b", 2]]);
  assertEquals(entries({}), []);
});

Deno.test("entries is None-safe", () => {
  const a: Record<string, unknown> | null = null;
  const b: Record<string, unknown> | undefined = undefined;
  assertEquals(entries(a), []);
  assertEquals(entries(b), []);
});

Deno.test("pick selects only specified keys", () => {
  assertEquals(pick({ a: 1, b: 2, c: 3 }, ["a", "c"]), { a: 1, c: 3 });
  assertEquals(pick({ a: 1, b: 2 }, []), {});
  assertEquals(pick({ a: 1, b: 2 }, ["a", "b"]), { a: 1, b: 2 });
});

Deno.test("pick preserves explicit undefined values", () => {
  assertEquals(pick({ a: undefined, b: 2 }, ["a"]), { a: undefined });
});

Deno.test("pick is None-safe", () => {
  const obj: { a: number } | null = null;
  const result = pick(obj, ["a"]);
  assertEquals(result, {} as { a: number });
});

Deno.test("omit excludes specified keys", () => {
  assertEquals(omit({ a: 1, b: 2, c: 3 }, ["a"]), { b: 2, c: 3 });
  assertEquals(omit({ a: 1, b: 2 }, []), { a: 1, b: 2 });
  assertEquals(omit({ a: 1, b: 2 }, ["a", "b"]), {});
});

Deno.test("omit is None-safe", () => {
  const obj: { a: number; b: number } | null = null;
  assertEquals(omit(obj, ["a"]), {});
});

Deno.test("mapValues transforms each value", () => {
  assertEquals(mapValues({ a: 1, b: 2 }, (v) => v * 2), { a: 2, b: 4 });
  assertEquals(mapValues({}, (v: number) => v), {});
});

Deno.test("mapValues passes key as second argument", () => {
  assertEquals(
    mapValues({ a: 1, b: 2 }, (v, k) => `${k}=${v}`),
    { a: "a=1", b: "b=2" },
  );
});

Deno.test("mapValues is None-safe", () => {
  const result = mapValues<Record<string, number>, number>(
    null,
    (v) => v * 2,
  );
  assertEquals(result, {});
});

Deno.test("mapKeys transforms each key", () => {
  assertEquals(
    mapKeys({ a: 1, b: 2 }, (k) => k.toUpperCase()),
    { A: 1, B: 2 },
  );
  assertEquals(mapKeys({}, (k: string) => k), {});
});

Deno.test("mapKeys passes value as second argument", () => {
  assertEquals(
    mapKeys({ first: "Bob", last: "Lee" }, (k, v) => `${k}_${v.length}`),
    { first_3: "Bob", last_3: "Lee" },
  );
});

Deno.test("mapKeys overwrites on collision", () => {
  assertEquals(
    mapKeys({ a: 1, b: 2 }, () => "same"),
    { same: 2 },
  );
});

Deno.test("mapKeys is None-safe", () => {
  const obj: Record<string, number> | null = null;
  assertEquals(mapKeys(obj, (k) => k), {});
});
