import { build, emptyDir } from "jsr:@deno/dnt";

const denoJson = JSON.parse(Deno.readTextFileSync("deno.json"));
const version = denoJson.version;

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  compilerOptions: {
    target: "ES2020",
    lib: ["esnext"],
  },
  package: {
    name: "@bytebury/boba",
    version,
    description: "TypeScript utility library to help energize your projects with useful functions for any size project. Save yourself some time and focus on shipping features.",
    license: "MIT",
    private: false,
    repository: {
      type: "git",
      url: "https://github.com/bytebury/boba",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
