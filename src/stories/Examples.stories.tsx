import type { Meta, StoryObj } from "@storybook/react";
import { App } from "./examples/Test.jsx";

export default {
  title: "Tests",
} satisfies Meta;

export const Test1: StoryObj = {
  render: App,
};
