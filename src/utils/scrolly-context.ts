import { createContext, useContext } from "react";

import type { IntersectionObserverSubscriber } from "./element-intersection.js";
import type { ScrollyValues } from "./types.js";

// Root context
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

// Element context

export const ScrollyElementContext = createContext<ScrollyValues | undefined>(
  undefined
);

export function useScrollyElementContext() {
  const context = useContext(ScrollyElementContext);
  if (context === undefined) {
    throw new Error("useScrollyContext must be used within a ScrollyElement");
  }
  return context;
}
