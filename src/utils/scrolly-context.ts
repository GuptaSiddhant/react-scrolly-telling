import { createContext, useContext } from "react";

export interface ScrollyContextValue {
  windowHeight: number;
  windowWidth: number;
}

export const ScrollyContext = createContext<ScrollyContextValue | undefined>(
  undefined
);

export default function useScrollyContext(): ScrollyContextValue {
  const context = useContext(ScrollyContext);
  if (context === undefined) {
    throw new Error("useScrollyContext must be used within a ScrollyProvider");
  }
  return context;
}
