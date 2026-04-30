import { assert } from "@std/assert";
import {
  camel,
  isNotWhitespace,
  isWhitespace,
  kebab,
  keepAlphabetical,
  keepAlphanumeric,
  keepNumeric,
  lower,
  pascal,
  slugify,
  snake,
  title,
  trim,
  truncate,
  upper,
} from "./strings.ts";

Deno.test("isWhitespace", () => {
  assert(isWhitespace(" "));
  assert(isWhitespace(null as unknown as string));
  assert(isWhitespace(undefined as unknown as string));
  assert(isWhitespace(""));
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

Deno.test("camel", () => {
  assert(camel(null as unknown as string) === "");
  assert(camel("") === "");
  assert(camel("Hello World") === "helloWorld");
  assert(camel("user_profile_page") === "userProfilePage");
  assert(camel("HELLO-WORLD") === "helloWorld");
  assert(camel("one") === "one");
});

Deno.test("pascal", () => {
  assert(pascal(null as unknown as string) === "");
  assert(pascal("") === "");
  assert(pascal("hello world") === "HelloWorld");
  assert(pascal("user_profile_page") === "UserProfilePage");
  assert(pascal("HELLO-WORLD") === "HelloWorld");
});

Deno.test("truncate", () => {
  assert(truncate(null as unknown as string, 10) === "");
  assert(truncate("Hello World", 5) === "He...");
  assert(truncate("Hello World", 20) === "Hello World");
  assert(truncate("Hello World", 8, "…") === "Hello W…");
  assert(truncate("Hi", 10) === "Hi");
});

Deno.test("slugify", () => {
  assert(slugify(null as unknown as string) === "");
  assert(slugify("Hello World!") === "hello-world");
  assert(slugify("Café à la Carte") === "cafe-a-la-carte");
  assert(slugify("  Multiple   Spaces  ") === "multiple-spaces");
});
