import type { Meta, StoryObj } from "@storybook/react";

import { ScrollyProvider, useScrollyRootContext } from "../src/_root/index.js";

const component = ScrollyProvider;
type ComponentType = typeof component;

export default {
  title: "Components / ScrollyProvider",
  component,
  argTypes: {
    children: { type: "function" },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<ComponentType>;

export const Preview: StoryObj<ComponentType> = {
  args: { children: <App /> },
};

function App() {
  const { windowHeight, windowWidth } = useScrollyRootContext();

  const height = windowHeight.toString();
  const width = windowWidth.toString();
  const maxLength = Math.max(height.length, width.length);

  return (
    <pre>
      <code>Window height: {height.padStart(maxLength)}px</code>
      <br />
      <code>Window width : {width.padStart(maxLength)}px</code>
    </pre>
  );
}
