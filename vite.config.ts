import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import { peerDependencies, devDependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: {
        main: "src",
        useScrolly: "src/useScrolly.ts",
      },
      name: "react-scrolly-telling",
      formats: ["es", "cjs"],
      fileName: (format, entry) =>
        `${entry}.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(devDependencies),
      ],
      output: { experimentalMinChunkSize: 1000 },
    },
    target: "es2016",
  },
  plugins: [
    dtsPlugin({
      entryRoot: "src",
      noEmitOnError: true,
      skipDiagnostics: true,
    }),
  ],
});
