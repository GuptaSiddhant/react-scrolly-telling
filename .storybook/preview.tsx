import React from "react";
import type { Preview } from "@storybook/react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgTypes,
} from "@storybook/blocks";

const preview: Preview = {
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
};

export default preview;
