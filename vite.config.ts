import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import { peerDependencies, devDependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "src",
        // useScrolly: "src/useScrolly.ts",
        // provider: "src/ScrollyProvider.tsx",
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
    },
    target: "es2016",
    copyPublicDir: false,
  },
  plugins: [
    react(),
    dtsPlugin({
      entryRoot: "src",
      noEmitOnError: true,
      skipDiagnostics: true,
    }),
  ],
});
