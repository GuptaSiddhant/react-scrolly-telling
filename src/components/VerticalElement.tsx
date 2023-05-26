import { forwardRef, useRef } from "react";

import { ScrollyElementContext } from "../contexts/element-context.js";
import useScrolly from "../utils/use-scrolly.js";
import type { ScrollyOptions } from "../utils/types.js";
import { mergeRefs, type Styles } from "../utils/react-helpers.js";

export interface ScrollyVerticalElementProps
  extends Omit<ScrollyOptions, "disabled"> {
  as?: React.ElementType;
  children: React.ReactNode;
  preChildren?: React.ReactNode;
  postChildren?: React.ReactNode;

  style?: React.CSSProperties;
}

const styles = {
  wrapper: {
    boxSizing: "border-box",
    position: "relative",
    width: "100%",
  },
  base: {
    boxSizing: "border-box",
    position: "relative",
    width: "100%",
    minHeight: "100vh",
  },
} satisfies Styles;

const ScrollyVerticalElement = forwardRef<
  HTMLDivElement,
  ScrollyVerticalElementProps
>((props, forwardedRef) => {
  const {
    as: Component = "div",
    children,
    preChildren,
    postChildren,
    precision,
    startAtEntryRatio,
    stopAtExitRatio,
    ...rest
  } = props;

  const innerRef = useRef<HTMLDivElement>(null);
  const scrollyValues = useScrolly(innerRef, {
    precision,
    startAtEntryRatio,
    stopAtExitRatio,
  });

  return (
    <ScrollyElementContext.Provider value={scrollyValues}>
      <Component
        {...rest}
        style={{ ...styles.base, ...rest.style }}
        ref={mergeRefs(forwardedRef, innerRef)}
      >
        {preChildren}
        {children}
        {postChildren}
      </Component>
    </ScrollyElementContext.Provider>
  );
});

export default ScrollyVerticalElement;
