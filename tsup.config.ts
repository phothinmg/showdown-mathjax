/* cspell:disable */
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./dist",
  splitting: true,
  sourcemap: true,
  dts: true,
  format: ["cjs", "esm"],
  bundle: true,
  treeshake: true,
  // minify: true,
  external: ["showdown"],
  clean: true,
});
