import type { Meta, StoryObj } from "@storybook/react";

import {
  scrollSpacerDecorator,
  scrollyContextDecorator,
} from "./decorators.jsx";
import ScrollyElement from "../element.jsx";

const component = ScrollyElement;
type ComponentType = typeof component;

export default {
  title: "ScrollyElement",
  component,
  tags: ["autodocs"],
  decorators: [scrollyContextDecorator, scrollSpacerDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<ComponentType>;

export const Horizontal: StoryObj<ComponentType> = {
  args: {
    horizontal: true,
    style: { gap: "1rem", padding: "1rem" },
    children: Array(5)
      .fill(null)
      .map((_, i) => {
        const key = `slide-${i}`;
        return <App index={i} key={key} />;
      }),
  },
};

function App({ index }: { index: number }) {
  return (
    <div
      style={{
        minWidth: "80vw",
        height: "100%",
        backgroundColor: "lightcyan",
        border: "1px solid lightblue",
        borderRadius: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
    >
      This is slide {index + 1}.
    </div>
  );
}
