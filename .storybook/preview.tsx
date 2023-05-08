import React from "react";
import type { Preview } from "@storybook/react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgTypes,
} from "@storybook/blocks";

export default {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "fullscreen",
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgTypes />
        </>
      ),
    },
  },
} satisfies Preview;
