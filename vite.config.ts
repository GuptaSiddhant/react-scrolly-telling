import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import { peerDependencies, devDependencies } from "./package.json";

const facadeModuleIdMap = new Map<string, boolean>();

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "src",
        element: "src/element.tsx",
        interpolate: "src/interpolate.ts",
        scrim: "src/scrim.ts",
        video: "src/video.tsx",
        videoCaption: "src/components/VideoCaptions.tsx",
      },
      name: "react-scrolly-telling",
      formats: ["es", "cjs"],
      fileName: (format, entry) =>
        `${entry}.${format === "es" ? "mjs" : "cjs"}`,
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

        chunkFileNames: (info) => {
          if (info.facadeModuleId) {
            if (facadeModuleIdMap.has(info.facadeModuleId)) {
              return `__[name]__.cjs`;
            } else {
              facadeModuleIdMap.set(info.facadeModuleId, true);
              return `__[name]__.mjs`;
            }
          }

          const cjs = info.exports.some((e) => e.length > 5);
          return `__[name]__.${cjs ? "cjs" : "mjs"}`;
        },
      },
    },
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
