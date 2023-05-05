import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { scrollyContextDecorator } from "./decorators.jsx";
import useScrolly, { type ScrollyOptions } from "../utils/use-scrolly.js";

function Component(props: ScrollyOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const result = useScrolly(ref, props);

  return (
    <>
      <div style={{ height: "50vh" }} />
      <div
        ref={ref}
        style={{
          height: "150vh",
          padding: "20px",
          border: "2px solid gray",
          borderTop: "4px solid red",
          borderBottom: "4px solid blue",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <pre>{JSON.stringify(result, null, 2)}</pre>
        <pre>{JSON.stringify(result, null, 2)}</pre>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
      <div style={{ height: "50vh" }} />
    </>
  );
}
type ComponentType = typeof Component;

export default {
  title: "Helpers / useScrolly",
  component: Component,
  decorators: [scrollyContextDecorator],
  args: { disabled: false },
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {};

export const StartWithEntry: StoryObj<ComponentType> = {
  args: { startAtEntryRatio: 0 },
};

export const EndWithExit: StoryObj<ComponentType> = {
  args: { stopAtExitRatio: 1 },
};

export const StartWithEntryAndEndWithExit: StoryObj<ComponentType> = {
  args: { startAtEntryRatio: 0, stopAtExitRatio: 1 },
};
