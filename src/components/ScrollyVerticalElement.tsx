import { forwardRef, useRef } from "react";

import useScrolly from "../utils/use-scrolly.js";
import { ScrollyElementContext } from "../utils/scrolly-context.js";
import type { ScrollyOptions } from "../utils/types.js";
import { mergeRefs } from "../utils/react-helpers.js";

export interface ScrollyVerticalElementProps
  extends Omit<ScrollyOptions, "disabled"> {
  as?: React.ElementType;
  children: React.ReactNode;
  preChildren?: React.ReactNode;
  postChildren?: React.ReactNode;

  style?: React.CSSProperties;
}

const styles = {
  base: {
    boxSizing: "border-box",
    position: "relative",
    width: "100%",
  },
} satisfies Record<string, React.CSSProperties>;

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
      {preChildren}

      <Component
        {...rest}
        style={{ ...styles.base, ...rest.style }}
        ref={mergeRefs(forwardedRef, innerRef)}
      >
        {children}
      </Component>

      {postChildren}
    </ScrollyElementContext.Provider>
  );
});

export default ScrollyVerticalElement;
