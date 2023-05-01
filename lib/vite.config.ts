import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

import { peerDependencies, devDependencies } from "./package.json";

// Molecule components are added to this list automatically.
const entryPoints: Record<string, string> = {
  main: "src",
  useScrolly: "src/useScrolly.ts",
};

export default defineConfig({
  build: {
    lib: {
      entry: entryPoints,
      name: "react-scrolly-telling",
      formats: ["es", "cjs"],
      fileName: (format, entry) => `${entry}.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(devDependencies),
      ],
      output: { experimentalMinChunkSize: 1000 },
    },
    target: "es2016",
    manifest: true,
    emptyOutDir: true,
  },
  plugins: [
    // reactPlugin({ jsxRuntime: "classic" }),
    dtsPlugin({
      entryRoot: "src",
      noEmitOnError: true,
      skipDiagnostics: true,
    }),
  ],
});
