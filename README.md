<div align="center">

<img src="./assets/logo.png" alt="Toolkit Logo" width="348" height="256" /><br />

# toolkit

toolkit is a developer-friendly TypeScript utility library with small, <br />
well-typed helpers for common tasks. It’s designed to reduce boilerplate, <br />
stay out of your way, and feel natural to use in everyday projects.

<hr />

</div>

## Getting Started

You can install this application from `npm` or `jsr`.

```sh
# recommended if using NodeJS
npx jsr add @bytebury/toolkit

# good, old-fashion npm
npm install @bytebury/toolkit --save

# or, if you're using Deno
deno add jsr:@bytebury/toolkit
```

## Sample Usage

```ts
import { average, isWhitespace, title } from "@bytebury/toolkit";

function sayHelloTo(name: string): void {
  if (isWhitespace(name)) {
    console.log("Hello, Guest!");
  } else {
    console.log(`Hello, ${title(name)}!`);
  }
}

function getAverageAge(): number {
  const people = [
    { name: "Tom", age: 2 },
    { name: "Carly", age: 8 },
    { name: "Jenny", age: 5 },
  ];
  return average(people.map(({ age }) => age)); // 5
}
```

## Modules

Every helper is exported from the root `@bytebury/toolkit`. The library is
organized into focused modules — `core`, `strings`, `numbers`, `objects`,
`dates`, and `duration` — covered below.

### Strings

```ts
import {
  camel,
  isWhitespace,
  kebab,
  pascal,
  slugify,
  snake,
  title,
  trim,
  truncate,
} from "@bytebury/toolkit";

isWhitespace("   "); // true
trim("  hello  "); // "hello"

title("hello world"); // "Hello World"
kebab("Hello World"); // "hello-world"
snake("Hello World"); // "hello_world"
camel("hello world"); // "helloWorld"
pascal("hello world"); // "HelloWorld"

slugify("Café à la Carte"); // "cafe-a-la-carte"
truncate("Hello World", 8); // "Hello..."
truncate("Hello World", 8, "…"); // "Hello W…"
```

### Numbers

```ts
import {
  average,
  clamp,
  inRange,
  median,
  ordinalize,
  random,
  roundTo,
  sum,
} from "@bytebury/toolkit";

sum([1, 2, 3]); // 6
average([10, 20, 30]); // 20
median([1, 2, 3, 4]); // 2.5

clamp(15, 0, 10); // 10
inRange(5, 0, 10); // true
roundTo(1.235, 2); // 1.24

ordinalize(21); // "21st"
random(0, 100); // a number 0–99
```

### Lists

```ts
import {
  chunk,
  compact,
  drop,
  first,
  groupBy,
  last,
  partition,
  range,
  sample,
  sortBy,
  splice,
  take,
  unique,
  zip,
} from "@bytebury/toolkit";

first([1, 2, 3]); // 1
last([1, 2, 3]); // 3
unique([1, 2, 2, 3]); // [1, 2, 3]
range(0, 5); // [0, 1, 2, 3, 4]

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
take([1, 2, 3, 4], 2); // [1, 2]
drop([1, 2, 3, 4], 2); // [3, 4]
zip([1, 2, 3], ["a", "b", "c"]); // [[1, "a"], [2, "b"], [3, "c"]]
splice([1, 2, 3, 4], 1, 2); // [1, 4] — non-mutating

const people = [
  { role: "admin", name: "A" },
  { role: "user", name: "B" },
  { role: "admin", name: "C" },
];
groupBy(people, (p) => p.role); // Map { "admin" => [A, C], "user" => [B] }
partition([1, 2, 3, 4], (n) => n % 2 === 0); // [[2, 4], [1, 3]]
sortBy(people, (p) => p.name); // sorted by name, non-mutating
compact([1, null, 2, undefined, 3]); // [1, 2, 3]
sample([1, 2, 3]); // a random element
```

### Objects (records)

```ts
import {
  entries,
  keys,
  mapKeys,
  mapValues,
  omit,
  pick,
} from "@bytebury/toolkit";

keys({ a: 1, b: 2 }); // ["a", "b"] — typed as ("a" | "b")[]
entries({ a: 1, b: 2 }); // [["a", 1], ["b", 2]] — typed pairs

pick({ id: 1, name: "Bob", age: 30 }, ["id", "name"]); // { id: 1, name: "Bob" }
omit({ id: 1, name: "Bob", age: 30 }, ["age"]); // { id: 1, name: "Bob" }

mapValues({ a: 1, b: 2 }, (v) => v * 2); // { a: 2, b: 4 }
mapKeys({ first: "Bob", last: "Lee" }, (k) => `user_${k}`);
// { user_first: "Bob", user_last: "Lee" }
```

### Dates

```ts
import {
  addDays,
  daysBetween,
  isToday,
  isTomorrow,
  isWeekend,
  isYesterday,
  subtractMonths,
  today,
  tomorrow,
} from "@bytebury/toolkit";

today(); // today at 00:00
tomorrow(); // tomorrow at 00:00
addDays(today(), 7); // a week from today
subtractMonths(today(), 3); // 3 months ago

isToday(someDate); // true if same calendar day
isYesterday(someDate);
isTomorrow(someDate);
isWeekend(someDate);

daysBetween(new Date(2025, 0, 1), new Date(2025, 0, 10)); // 9
```

### Duration

```ts
import { hours, minutes, seconds, sleep } from "@bytebury/toolkit";

await sleep(seconds(2)); // wait 2 seconds
setTimeout(handler, minutes(5)); // 5 minutes in ms
const cacheTtl = hours(1); // 3_600_000
```

### General predicates and helpers

```ts
import {
  clone,
  isArray,
  isEmpty,
  isEqual,
  isNone,
  isSome,
} from "@bytebury/toolkit";

isEmpty(""); // true
isEmpty([]); // true
isEmpty({}); // true
isEqual({ a: 1 }, { a: 1 }); // true

isSome(0); // true (0 is not None)
isNone(null); // true
isArray([1, 2, 3]); // true — also acts as a TypeScript type guard

const copy = clone(originalObject); // structuredClone-based deep copy
```
