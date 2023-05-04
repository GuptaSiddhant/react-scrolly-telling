import type { Meta, StoryObj } from "@storybook/react";

import {
  scrollSpacerDecorator,
  scrollyContextDecorator,
} from "./decorators.jsx";
import ScrollyVideo from "../video.jsx";

const component = ScrollyVideo;
type ComponentType = typeof component;

export default {
  title: "Components / ScrollyVideo",
  component,
  decorators: [scrollyContextDecorator, scrollSpacerDecorator],
  args: {
    src: "https://scrollyvideo.js.org/goldengate.mp4",
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
  args: { playFromEntry: true, playTillExit: true },
};
