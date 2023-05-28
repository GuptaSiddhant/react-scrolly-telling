import { createElement } from "react";

import ScrollyElement from "../element.js";
import ScrollyProvider from "../components/Provider.js";
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
