import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "text-summary"],
      exclude: ["**/node_modules/**", "**/components/**"],
    },
  },
});
