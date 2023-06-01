import { createContext, useContext } from "react";

import type { IntersectionObserverSubscriber } from "../utils/element-intersection.js";

export interface ScrollyRootContextValue {
  windowHeight: number;
  windowWidth: number;
  observeElementIntersection: IntersectionObserverSubscriber;
}

export const ScrollyRootContext = createContext<
  ScrollyRootContextValue | undefined
>(undefined);

export function useScrollyRootContext(): ScrollyRootContextValue {
  const context = useContext(ScrollyRootContext);
  if (context === undefined) {
    throw new Error(
      "useScrollyRootContext must be used within a ScrollyProvider"
    );
  }
  return context;
}
