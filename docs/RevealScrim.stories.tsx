import type { Meta, StoryObj } from "@storybook/react";

import {
  scrollSpacerDecorator,
  scrollyContextDecorator,
} from "./decorators.js";
import ScrollyElement from "../src/_element/index.js";
import { RevealScrim } from "../src/_components/index.js";

const component = RevealScrim;
type ComponentType = typeof component;

export default {
  title: "Components / RevealScrim",
  component,
  decorators: [scrollyContextDecorator, scrollSpacerDecorator],
  argTypes: {
    backgroundColor: { control: "color", defaultValue: "black" },
    fromOpacity: {
      defaultValue: 1,
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
    toOpacity: {
      defaultValue: 0,
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
  },
  render: (args) => (
    <ScrollyElement preChildren={<RevealScrim {...args} />}>
      <div
        style={{
          height: "200vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA)`,
          backgroundSize: "cover",
        }}
      >
        <h1>Revealed Scrolly content</h1>
      </div>
    </ScrollyElement>
  ),
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {};
