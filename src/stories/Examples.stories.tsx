import type { Meta, StoryObj } from "@storybook/react";
import { App } from "./examples/Test.jsx";

export default {
  title: "Examples",
} satisfies Meta;

export const Test: StoryObj = {
  render: App,
};
