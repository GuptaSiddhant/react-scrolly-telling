import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import { peerDependencies, devDependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "src",
        element: "src/element.tsx",
        provider: "src/provider.tsx",
      },
      name: "react-scrolly-telling",
      formats: ["es", "cjs"],
      fileName: (format, entry) =>
        `${entry}.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react/jsx-runtime",
        ...Object.keys(peerDependencies),
        ...Object.keys(devDependencies),
      ],
      output: {
        exports: "named",
        globals: {
          react: "react",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
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
