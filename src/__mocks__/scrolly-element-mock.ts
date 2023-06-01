import { createElement } from "react";

import ScrollyElement from "../_element/index.js";
import { ScrollyProvider } from "../_root/index.js";
import { mockIntersectionObserver } from "./intersection-observer-mock.js";

mockIntersectionObserver();

export function mockScrollyElementWrapper(props: {
  children: React.ReactNode;
}) {
  return createElement(
    ScrollyProvider,
    null,
    createElement(ScrollyElement, props)
  );
}
