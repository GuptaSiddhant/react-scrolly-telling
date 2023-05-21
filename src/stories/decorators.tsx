import { Decorator } from "@storybook/react";
import ScrollyProvider from "../components/Provider.js";

export const scrollyContextDecorator: Decorator<unknown> = (Story) => (
  <ScrollyProvider>
    <Story />
  </ScrollyProvider>
);

function ScrollSpacer(style: React.CSSProperties) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "lightgray",
        color: "black",
        font: "2rem",
        ...style,
      }}
    >
      Scroll to see the component
    </div>
  );
}

export const scrollSpacerDecorator: Decorator<unknown> = (Story) => {
  return (
    <>
      <ScrollSpacer />
      <Story />
      <ScrollSpacer />
    </>
  );
};
