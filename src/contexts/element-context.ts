import { createContext, useContext } from "react";

import type { ScrollyValues } from "../utils/types.js";

export const ScrollyElementContext = createContext<ScrollyValues | undefined>(
  undefined
);

export default function useScrollyElementContext() {
  const context = useContext(ScrollyElementContext);
  if (context === undefined) {
    throw new Error("useScrollyContext must be used within a ScrollyElement");
  }
  return context;
}
