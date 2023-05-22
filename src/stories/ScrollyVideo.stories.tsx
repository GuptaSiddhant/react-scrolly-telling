import type { Meta, StoryObj } from "@storybook/react";

import {
  scrollSpacerDecorator,
  scrollyContextDecorator,
} from "./decorators.jsx";
import ScrollyVideo from "../video.jsx";
import { ScrollyVideoCaptionProps } from "../components/VideoCaptions.js";

const component = ScrollyVideo;
type ComponentType = typeof component;

export default {
  title: "Components / ScrollyVideo",
  component,
  decorators: [scrollyContextDecorator, scrollSpacerDecorator],
  args: {
    src: "/goldengate.mp4",
    style: { height: "200vh" },
  },
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {};

export const PlayFromEntry: StoryObj<ComponentType> = {
  args: { playFromEntry: true },
};

export const PlayTillExit: StoryObj<ComponentType> = {
  args: { playTillExit: true },
};

export const PlayFromEntryTillExit: StoryObj<ComponentType> = {
  args: {
    playFromEntry: true,
    playTillExit: true,
  },
};

const positions: ScrollyVideoCaptionProps["position"][] = [
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center-center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export const Captions: StoryObj<ComponentType> = {
  args: {
    style: { height: "300vh" },
    playFromEntry: false,
    playTillExit: false,
    captions: positions.map((position, i) => ({
      position,
      children: (
        <div style={{ maxWidth: "25vw", textShadow: "0 0 4px #0008" }}>
          Long Caption text at position: {position}
        </div>
      ),
      fromTimestamp: i + 0.5,
      toTimestamp: i + 4.5,
    })),
    captionsConfig: {
      verticalPadding: "40px",
      horizontalPadding: "40px",
      style: {
        fontWeight: "bold",
        fontSize: "2em",
        color: "white",
      },
    },
  },
};
