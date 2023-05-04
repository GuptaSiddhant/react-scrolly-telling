import type { Meta, StoryObj } from "@storybook/react";

import {
  scrollSpacerDecorator,
  scrollyContextDecorator,
} from "./decorators.jsx";
import ScrollyElement, { useScrollyElementContext } from "../element.jsx";

const component = ScrollyElement;
type ComponentType = typeof component;

export default {
  title: "Components / ScrollyElement",
  component,
  decorators: [scrollyContextDecorator, scrollSpacerDecorator],
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  args: {
    horizontal: false,
    style: {
      gap: "1rem",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
    },
    children: Array(5)
      .fill(null)
      .map((_, i) => {
        const key = `slide-${i}`;
        return (
          <Slide
            index={i}
            key={key}
            style={{
              height: "80vh",
              position: "sticky",
              top: "1rem",
            }}
          />
        );
      }),
  },
};

export const Horizontal: StoryObj<ComponentType> = {
  args: {
    horizontal: true,
    style: { gap: "1rem", padding: "1rem" },
    children: Array(5)
      .fill(null)
      .map((_, i) => {
        const key = `slide-${i}`;
        return <Slide index={i} key={key} />;
      }),
  },
};

function Slide({
  index,
  style,
}: {
  index: number;
  style?: React.CSSProperties;
}) {
  const { scrollRatio } = useScrollyElementContext();

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
        ...style,
      }}
    >
      This is slide {index + 1}. Scrolled {(scrollRatio * 100).toFixed(2)}%.
    </div>
  );
}
