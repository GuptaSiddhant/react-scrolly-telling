import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import preserveDirectives from "rollup-plugin-preserve-directives";
import entryPointsDtsPlugin from "./scripts/vite-plugin-entryPoints-dts";
import { peerDependencies, devDependencies } from "./package.json";

const entryPoints: Record<string, string> = {
  index: "src/_root",
  components: "src/_components",
  element: "src/_element",
  video: "src/_video",
};

const facadeModuleIdMap = new Map<string, boolean>();

const format = process.argv
  .find((part) => part.startsWith("--format="))
  ?.split("=")[1] as "es" | "cjs" | undefined;

export default defineConfig({
  build: {
    lib: {
      entry: entryPoints,
      name: "react-scrolly-telling",
      formats: format ? [format] : ["es", "cjs"],
      fileName: (format, entry) => `${entry}.${format === "es" ? "js" : "cjs"}`,
    },
    chunkSizeWarningLimit: 5,
    target: "es2016",
    copyPublicDir: false,
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
        preserveModules: true,
        chunkFileNames: (info) => {
          if (info.facadeModuleId) {
            if (facadeModuleIdMap.has(info.facadeModuleId)) {
              return `__[name]__.cjs`;
            } else {
              facadeModuleIdMap.set(info.facadeModuleId, true);
              return `__[name]__.js`;
            }
          }

          const cjs = info.exports.some((e) => e.length > 5);
          return `__[name]__.${cjs ? "cjs" : "js"}`;
        },

        sourcemap: true,
      },
      plugins: [preserveDirectives()],
    },
  },
  plugins: [
    react(),
    dtsPlugin({
      entryRoot: "src",
      noEmitOnError: true,
      skipDiagnostics: true,
    }),
    entryPointsDtsPlugin(entryPoints),
  ],
});
