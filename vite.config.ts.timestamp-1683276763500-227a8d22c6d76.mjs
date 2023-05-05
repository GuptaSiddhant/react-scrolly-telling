// vite.config.ts
import react from "file:///Users/siddhant.c.gupta/Projects/GS/react-scrolly/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/siddhant.c.gupta/Projects/GS/react-scrolly/node_modules/vite/dist/node/index.js";
import dtsPlugin from "file:///Users/siddhant.c.gupta/Projects/GS/react-scrolly/node_modules/vite-plugin-dts/dist/index.mjs";

// package.json
var devDependencies = {
  "@storybook/addon-essentials": "^7.0.8",
  "@storybook/addon-interactions": "^7.0.8",
  "@storybook/addon-links": "^7.0.8",
  "@storybook/blocks": "^7.0.8",
  "@storybook/react": "^7.0.8",
  "@storybook/react-vite": "^7.0.8",
  "@storybook/testing-library": "^0.0.14-next.2",
  "@testing-library/react": "^14.0.0",
  "@types/node": "^18.0.0",
  "@types/react": "^18.2.0",
  "@typescript-eslint/eslint-plugin": "^5.57.1",
  "@typescript-eslint/parser": "^5.57.1",
  "@vitejs/plugin-react": "^4.0.0",
  "@vitest/coverage-istanbul": "^0.29.8",
  eslint: "^8.38.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-storybook": "^0.6.11",
  "happy-dom": "^9.10.1",
  "prop-types": "^15.8.1",
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  storybook: "^7.0.8",
  typescript: "^5.0.0",
  vite: "^4.3.3",
  "vite-plugin-dts": "^2.3.0",
  vitest: "^0.30.1"
};
var peerDependencies = {
  react: ">=18.0.0"
};

// vite.config.ts
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: {
        index: "src",
        element: "src/element.tsx",
        interpolate: "src/interpolate.ts",
        provider: "src/provider.tsx",
        video: "src/video.tsx"
      },
      name: "react-scrolly-telling",
      formats: ["es", "cjs"],
      fileName: (format, entry) => `${entry}.${format === "es" ? "mjs" : "cjs"}`
    },
    chunkSizeWarningLimit: 5,
    target: "es2016",
    copyPublicDir: false,
    rollupOptions: {
      external: [
        "react/jsx-runtime",
        ...Object.keys(peerDependencies),
        ...Object.keys(devDependencies)
      ],
      output: {
        exports: "named",
        globals: {
          react: "react",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime"
        },
        chunkFileNames: (info) => {
          const cjs = info.exports.some((e) => e.length > 5);
          return `_[name].${cjs ? "cjs" : "mjs"}`;
        }
      }
    }
  },
  plugins: [
    react(),
    dtsPlugin({
      entryRoot: "src",
      noEmitOnError: true,
      skipDiagnostics: true
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NpZGRoYW50LmMuZ3VwdGEvUHJvamVjdHMvR1MvcmVhY3Qtc2Nyb2xseVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NpZGRoYW50LmMuZ3VwdGEvUHJvamVjdHMvR1MvcmVhY3Qtc2Nyb2xseS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2lkZGhhbnQuYy5ndXB0YS9Qcm9qZWN0cy9HUy9yZWFjdC1zY3JvbGx5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBkdHNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuaW1wb3J0IHsgcGVlckRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzIH0gZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogXCJzcmNcIixcbiAgICAgICAgZWxlbWVudDogXCJzcmMvZWxlbWVudC50c3hcIixcbiAgICAgICAgaW50ZXJwb2xhdGU6IFwic3JjL2ludGVycG9sYXRlLnRzXCIsXG4gICAgICAgIHByb3ZpZGVyOiBcInNyYy9wcm92aWRlci50c3hcIixcbiAgICAgICAgdmlkZW86IFwic3JjL3ZpZGVvLnRzeFwiLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IFwicmVhY3Qtc2Nyb2xseS10ZWxsaW5nXCIsXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiLCBcImNqc1wiXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0LCBlbnRyeSkgPT5cbiAgICAgICAgYCR7ZW50cnl9LiR7Zm9ybWF0ID09PSBcImVzXCIgPyBcIm1qc1wiIDogXCJjanNcIn1gLFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1LFxuICAgIHRhcmdldDogXCJlczIwMTZcIixcbiAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgIFwicmVhY3QvanN4LXJ1bnRpbWVcIixcbiAgICAgICAgLi4uT2JqZWN0LmtleXMocGVlckRlcGVuZGVuY2llcyksXG4gICAgICAgIC4uLk9iamVjdC5rZXlzKGRldkRlcGVuZGVuY2llcyksXG4gICAgICBdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGV4cG9ydHM6IFwibmFtZWRcIixcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiBcInJlYWN0XCIsXG4gICAgICAgICAgXCJyZWFjdC1kb21cIjogXCJSZWFjdERPTVwiLFxuICAgICAgICAgIFwicmVhY3QvanN4LXJ1bnRpbWVcIjogXCJyZWFjdC9qc3gtcnVudGltZVwiLFxuICAgICAgICB9LFxuXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAoaW5mbykgPT4ge1xuICAgICAgICAgIGNvbnN0IGNqcyA9IGluZm8uZXhwb3J0cy5zb21lKChlKSA9PiBlLmxlbmd0aCA+IDUpO1xuICAgICAgICAgIHJldHVybiBgX1tuYW1lXS4ke2NqcyA/IFwiY2pzXCIgOiBcIm1qc1wifWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGR0c1BsdWdpbih7XG4gICAgICBlbnRyeVJvb3Q6IFwic3JjXCIsXG4gICAgICBub0VtaXRPbkVycm9yOiB0cnVlLFxuICAgICAgc2tpcERpYWdub3N0aWNzOiB0cnVlLFxuICAgIH0pLFxuICBdLFxufSk7XG4iLCAie1xuICBcIm5hbWVcIjogXCJyZWFjdC1zY3JvbGx5LXRlbGxpbmdcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjlcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkNyZWF0ZSBzY3JvbGx5LXRlbGxpbmcgYW5pbWF0aW9ucyBpbiBSZWFjdCB3aXRoIGVhc2UuXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInJlYWN0XCIsXG4gICAgXCJzY3JvbGxcIixcbiAgICBcInNjcm9sbHlcIixcbiAgICBcInNjcm9sbHl0ZWxsaW5nXCIsXG4gICAgXCJhbmltYXRpb25cIlxuICBdLFxuICBcImF1dGhvclwiOiBcIlNpZGRoYW50IEd1cHRhIDxtZUBndXB0YXNpZGRoYW50LmNvbT5cIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwibWFpblwiOiBcImRpc3QvaW5kZXguY2pzXCIsXG4gIFwibW9kdWxlXCI6IFwiZGlzdC9pbmRleC5tanNcIixcbiAgXCJ0eXBlc1wiOiBcImRpc3QvaW5kZXguZC50c1wiLFxuICBcInNpZGVFZmZlY3RzXCI6IGZhbHNlLFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3RcIlxuICBdLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLi9wYWNrYWdlLmpzb25cIjogXCIuL3BhY2thZ2UuanNvblwiLFxuICAgIFwiLlwiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L2luZGV4LmQudHNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L2luZGV4Lm1qc1wiLFxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L2luZGV4LmNqc1wiLFxuICAgICAgXCJkZWZhdWx0XCI6IFwiLi9kaXN0L2luZGV4LmNqc1wiXG4gICAgfSxcbiAgICBcIi4vZWxlbWVudFwiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L2VsZW1lbnQuZC50c1wiLFxuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvZWxlbWVudC5tanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9lbGVtZW50LmNqc1wiLFxuICAgICAgXCJkZWZhdWx0XCI6IFwiLi9kaXN0L2VsZW1lbnQuY2pzXCJcbiAgICB9LFxuICAgIFwiLi9pbnRlcnBvbGF0ZVwiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L2ludGVycG9sYXRlLmQudHNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L2ludGVycG9sYXRlLm1qc1wiLFxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L2ludGVycG9sYXRlLmNqc1wiLFxuICAgICAgXCJkZWZhdWx0XCI6IFwiLi9kaXN0L2ludGVycG9sYXRlLmNqc1wiXG4gICAgfSxcbiAgICBcIi4vdmlkZW9cIjoge1xuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC92aWRlby5kLnRzXCIsXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC92aWRlby5tanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC92aWRlby5janNcIixcbiAgICAgIFwiZGVmYXVsdFwiOiBcIi4vZGlzdC92aWRlby5janNcIlxuICAgIH1cbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwiZGV2XCI6IFwidml0ZSBidWlsZCAtd1wiLFxuICAgIFwibGludFwiOiBcImVzbGludCBzcmMgLS1leHQgdHMsdHN4XCIsXG4gICAgXCJwcmVwdWJsaXNoT25seVwiOiBcInlhcm4gbGludDsgeWFybiBidWlsZDsgeWFybiB0ZXN0XCIsXG4gICAgXCJ0ZXN0XCI6IFwidml0ZXN0IHJ1biAtLWNvdmVyYWdlXCIsXG4gICAgXCJ0ZXN0OndhdGNoXCI6IFwidml0ZXN0IC0tY292ZXJhZ2VcIixcbiAgICBcInN0b3J5Ym9va1wiOiBcInN0b3J5Ym9vayBkZXYgLXAgNjAwNlwiLFxuICAgIFwic3Rvcnlib29rOmJ1aWxkXCI6IFwic3Rvcnlib29rIGJ1aWxkXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1lc3NlbnRpYWxzXCI6IFwiXjcuMC44XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWludGVyYWN0aW9uc1wiOiBcIl43LjAuOFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1saW5rc1wiOiBcIl43LjAuOFwiLFxuICAgIFwiQHN0b3J5Ym9vay9ibG9ja3NcIjogXCJeNy4wLjhcIixcbiAgICBcIkBzdG9yeWJvb2svcmVhY3RcIjogXCJeNy4wLjhcIixcbiAgICBcIkBzdG9yeWJvb2svcmVhY3Qtdml0ZVwiOiBcIl43LjAuOFwiLFxuICAgIFwiQHN0b3J5Ym9vay90ZXN0aW5nLWxpYnJhcnlcIjogXCJeMC4wLjE0LW5leHQuMlwiLFxuICAgIFwiQHRlc3RpbmctbGlicmFyeS9yZWFjdFwiOiBcIl4xNC4wLjBcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4LjAuMFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS41Ny4xXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNTcuMVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4wLjBcIixcbiAgICBcIkB2aXRlc3QvY292ZXJhZ2UtaXN0YW5idWxcIjogXCJeMC4yOS44XCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC4zOC4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuNi4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXN0b3J5Ym9va1wiOiBcIl4wLjYuMTFcIixcbiAgICBcImhhcHB5LWRvbVwiOiBcIl45LjEwLjFcIixcbiAgICBcInByb3AtdHlwZXNcIjogXCJeMTUuOC4xXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInN0b3J5Ym9va1wiOiBcIl43LjAuOFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjAuMFwiLFxuICAgIFwidml0ZVwiOiBcIl40LjMuM1wiLFxuICAgIFwidml0ZS1wbHVnaW4tZHRzXCI6IFwiXjIuMy4wXCIsXG4gICAgXCJ2aXRlc3RcIjogXCJeMC4zMC4xXCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInJlYWN0XCI6IFwiPj0xOC4wLjBcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLE9BQU8sV0FBVztBQUN2VixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGVBQWU7OztBQ3dEcEIsc0JBQW1CO0FBQUEsRUFDakIsK0JBQStCO0FBQUEsRUFDL0IsaUNBQWlDO0FBQUEsRUFDakMsMEJBQTBCO0FBQUEsRUFDMUIscUJBQXFCO0FBQUEsRUFDckIsb0JBQW9CO0FBQUEsRUFDcEIseUJBQXlCO0FBQUEsRUFDekIsOEJBQThCO0FBQUEsRUFDOUIsMEJBQTBCO0FBQUEsRUFDMUIsZUFBZTtBQUFBLEVBQ2YsZ0JBQWdCO0FBQUEsRUFDaEIsb0NBQW9DO0FBQUEsRUFDcEMsNkJBQTZCO0FBQUEsRUFDN0Isd0JBQXdCO0FBQUEsRUFDeEIsNkJBQTZCO0FBQUEsRUFDN0IsUUFBVTtBQUFBLEVBQ1YsNkJBQTZCO0FBQUEsRUFDN0IsMkJBQTJCO0FBQUEsRUFDM0IsYUFBYTtBQUFBLEVBQ2IsY0FBYztBQUFBLEVBQ2QsT0FBUztBQUFBLEVBQ1QsYUFBYTtBQUFBLEVBQ2IsV0FBYTtBQUFBLEVBQ2IsWUFBYztBQUFBLEVBQ2QsTUFBUTtBQUFBLEVBQ1IsbUJBQW1CO0FBQUEsRUFDbkIsUUFBVTtBQUNaO0FBQ0EsdUJBQW9CO0FBQUEsRUFDbEIsT0FBUztBQUNYOzs7QURuRkYsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVLENBQUMsUUFBUSxVQUNqQixHQUFHLFNBQVMsV0FBVyxPQUFPLFFBQVE7QUFBQSxJQUMxQztBQUFBLElBQ0EsdUJBQXVCO0FBQUEsSUFDdkIsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLElBRWYsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1I7QUFBQSxRQUNBLEdBQUcsT0FBTyxLQUFLLGdCQUFnQjtBQUFBLFFBQy9CLEdBQUcsT0FBTyxLQUFLLGVBQWU7QUFBQSxNQUNoQztBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsYUFBYTtBQUFBLFVBQ2IscUJBQXFCO0FBQUEsUUFDdkI7QUFBQSxRQUVBLGdCQUFnQixDQUFDLFNBQVM7QUFDeEIsZ0JBQU0sTUFBTSxLQUFLLFFBQVEsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7QUFDakQsaUJBQU8sV0FBVyxNQUFNLFFBQVE7QUFBQSxRQUNsQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
