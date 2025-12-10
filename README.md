<div align="center">

<img src="./assets/logo.png" alt="Matcha Logo" width="128" height="128" /><br />

# matcha

Deliciously energize your projects with matcha, a TypeScript utility
library<br /> to help speed up your development cycle with a focus on
correctness.

</div>
<hr />

## Getting Started

You can install this application from `npm` or `jsr`.

```sh
npm install @bobatea/matcha --save

# or, if you're using JSR

deno add jsr:@bobatea/matcha
```

## Sample Usage

```ts
function sayHelloTo(name: string): void {
  if (isWhitespace(name) {
    console.log("Hello, Guest!");
  } else {
    console.log(`Hello, ${title(name)}!`);
  }
}

function getAverageAge(): number {
  const people = [
    { name: "Tom", age: 2 },
    { name: "Carly", age: 8 },
    { name: "Jenny", age: 5 }
  ];
  return average(people, "age"); // 5
}
```
