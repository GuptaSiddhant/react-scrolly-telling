import type { Meta, StoryObj } from "@storybook/react";

import {
  scrollSpacerDecorator,
  scrollyContextDecorator,
} from "./decorators.jsx";
import ScrollyElement, { useScrollyElementContext } from "../element.jsx";
import RevealScrim from "../components/RevealScrim.js";

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
    preChildren: <RevealScrim />,
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
    style: { gap: "1rem", padding: "1rem", paddingLeft: "20rem" },
    preChildren: <RevealScrim />,
    postChildren: <PostChildren />,
    children: Array(5)
      .fill(null)
      .map((_, i) => {
        const key = `slide-${i}`;
        return <Slide index={i} key={key} />;
      }),
  },
};

function PostChildren({ style }: { style?: React.CSSProperties }) {
  const { scrollRatio } = useScrollyElementContext();

  return (
    <div
      style={{
        backgroundColor: "lightcyan",
        border: "1px solid lightblue",
        borderRadius: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        fontSize: "1.5rem",
        position: "absolute",
        top: "2rem",
        left: "2rem",
        right: "2rem",
        ...style,
      }}
    >
      Scrolled {(scrollRatio * 100).toFixed(2)}%.
    </div>
  );
}

function Slide({
  index,
  style,
}: {
  index: number;
  style?: React.CSSProperties;
}) {
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
      This is slide {index + 1}.
    </div>
  );
}
