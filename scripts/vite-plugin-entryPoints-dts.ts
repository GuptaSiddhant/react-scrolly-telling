import type { Plugin } from "vite";
import { existsSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { cyan, yellow, green } from "kolorist";

/**
 * The plugin runs in the beginning on vite process and
 * generated TS declaration files for each entry point.
 */
export default function entryPointsDtsPlugin(
  entryPoints: Record<string, string>
): Plugin {
  const name = "vite:entryPoints-dts";
  const logPrefix = cyan(`[${name}]`);

  return {
    name,
    closeBundle: async () => {
      const timeStart = Date.now();
      console.log("");
      console.log(logPrefix, yellow("Start generate declaration files..."));

      const distPath = resolve(process.cwd(), "dist");
      if (!existsSync(distPath)) await mkdir(distPath);

      const promises = Object.entries(entryPoints).map(
        ([key, entryPointPath]) => {
          const file = resolve(process.cwd(), "dist", `${key}.d.ts`);
          const relativeEntryPointPath = entryPointPath.replace("src", ".");
          const data = `
export { default } from "${relativeEntryPointPath}/index.js"; 
export * from "${relativeEntryPointPath}/index.js";
`;

          return writeFile(file, data, { encoding: "utf-8" });
        }
      );

      await Promise.all(promises);

      const timeEnd = Date.now();
      console.log(
        logPrefix,
        green(`Declaration files built in ${timeEnd - timeStart}ms.\n`)
      );
    },
  };
}
