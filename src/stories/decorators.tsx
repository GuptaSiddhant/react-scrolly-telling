import { Decorator } from "@storybook/react";
import ScrollyProvider from "../ScrollyProvider.jsx";

export const scrollyContextDecorator: Decorator<unknown> = (Story) => (
  <ScrollyProvider>
    <Story />
  </ScrollyProvider>
);
