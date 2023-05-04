import { Decorator } from "@storybook/react";
import ScrollyProvider from "../provider.jsx";

export const scrollyContextDecorator: Decorator<unknown> = (Story) => (
  <ScrollyProvider>
    <Story />
  </ScrollyProvider>
);
