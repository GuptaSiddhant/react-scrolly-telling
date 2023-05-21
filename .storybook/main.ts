import type { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: [
    "../src/stories/Welcome.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@a110/storybook-expand-all",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  docs: { autodocs: "tag" },
  staticDirs: ["../public"],
} satisfies StorybookConfig;
