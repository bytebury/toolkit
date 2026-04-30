import { build, emptyDir } from "jsr:@deno/dnt";

const denoJson = JSON.parse(Deno.readTextFileSync("deno.json"));
const version = denoJson.version;

await emptyDir("./npm");

await build({
  entryPoints: [
    { name: ".", path: "./mod.ts" },
    { name: "./core", path: "./src/core.ts" },
    { name: "./dates", path: "./src/dates.ts" },
    { name: "./duration", path: "./src/duration.ts" },
    { name: "./numbers", path: "./src/numbers.ts" },
    { name: "./objects", path: "./src/objects.ts" },
    { name: "./strings", path: "./src/strings.ts" },
    { name: "./utility-types", path: "./src/utility_types.ts" },
  ],
  outDir: "./npm",
  shims: {
    deno: "dev",
    timers: "dev",
  },
  compilerOptions: {
    target: "ES2020",
    lib: ["esnext", "dom", "dom.iterable"],
  },
  package: {
    name: "@bytebury/toolkit",
    version,
    description: "TypeScript utility library to help energize your projects with useful functions for any size project. Save yourself some time and focus on shipping features.",
    license: "MIT",
    private: false,
    sideEffects: false,
    repository: {
      type: "git",
      url: "https://github.com/bytebury/toolkit",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
