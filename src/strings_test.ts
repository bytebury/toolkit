import { assert } from "@std/assert";
import {
  isNotWhitespace,
  isWhitespace,
  kebab,
  keepAlphabetical,
  keepAlphanumeric,
  keepNumeric,
  lower,
  snake,
  title,
  trim,
  upper,
} from "./strings.ts";

Deno.test("isWhitespace", () => {
  assert(isWhitespace(" "));
  assert(isWhitespace("\t"));
  assert(isWhitespace("\n"));
  assert(!isWhitespace("Hello"));
});

Deno.test("isNotWhitespace", () => {
  assert(!isNotWhitespace(" "));
  assert(!isNotWhitespace("\t"));
  assert(!isNotWhitespace("\n"));
  assert(isNotWhitespace("Hello"));
});

Deno.test("trim", () => {
  assert(trim("  Hello, World!  ") === "Hello, World!");
  assert(trim("\nHey\n\t") === "Hey");
  assert(trim("") === "");
});

Deno.test("title", () => {
  assert(title("hello world") === "Hello World");
  assert(title("HELLO WORLD") === "Hello World");
  assert(title("hello_world") === "Hello World");
  assert(title("hello-world") === "Hello-world");
});

Deno.test("lower", () => {
  assert(lower("HELLO WORLD") === "hello world");
  assert(lower("HELLO_WORLD") === "hello_world");
  assert(lower("HELLO-WORLD") === "hello-world");
  assert(lower("") === "");
});

Deno.test("upper", () => {
  assert(upper("hello world") === "HELLO WORLD");
  assert(upper("hello_world") === "HELLO_WORLD");
  assert(upper("hello-world") === "HELLO-WORLD");
  assert(upper("") === "");
});

Deno.test("kebab", () => {
  assert(kebab("hello world") === "hello-world");
  assert(kebab("HELLO WORLD") === "hello-world");
  assert(kebab("hello_world") === "hello-world");
  assert(kebab("hello-world") === "hello-world");
});

Deno.test("snake", () => {
  assert(snake("hello world") === "hello_world");
  assert(snake("HELLO WORLD") === "hello_world");
  assert(snake("hello-world") === "hello_world");
});

Deno.test("onlyAlpha", () => {
  assert(keepAlphabetical("Hello, World!") === "Hello World");
  assert(keepAlphabetical("123@#Test") === "Test");
  assert(keepAlphabetical("") === "");
});

Deno.test("onlyAlphanumeric", () => {
  assert(keepAlphanumeric("Hello, World!") === "Hello World");
  assert(keepAlphanumeric("123@#Test") === "123Test");
  assert(keepAlphanumeric("") === "");
});

Deno.test("onlyNumeric", () => {
  assert(keepNumeric("Hello, World!") === "");
  assert(keepNumeric("123@#Test") === "123");
  assert(keepNumeric("") === "");
  assert(keepNumeric("(555)-457-3456") === "5554573456");
});
