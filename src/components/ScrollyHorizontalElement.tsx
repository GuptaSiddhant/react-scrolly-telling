import { forwardRef, useRef } from "react";

import { interpolate } from "../utils/math.js";
import { mergeRefs, useStableLayoutEffect } from "../utils/react-helpers.js";
import { ScrollyElementContext } from "../utils/scrolly-context.js";
import useScrolly from "../utils/use-scrolly.js";

export interface ScrollyHorizontalElementProps {
  as?: React.ElementType;
  children: React.ReactNode;
  preChildren?: React.ReactNode;
  postChildren?: React.ReactNode;
  precision?: number;

  style?: React.CSSProperties;
}

const styles = {
  container: {
    boxSizing: "border-box",
    position: "static",
    width: "100vw",
    minHeight: "100vh",
    pointerEvents: "none",
  },
  sticky: {
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "inline-block",
    overflow: "hidden",
  },
  content: {
    boxSizing: "border-box",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    willChange: "transform",
    pointerEvents: "auto",
  },
} satisfies Record<string, React.CSSProperties>;

const ScrollyHorizontalElement = forwardRef<
  HTMLDivElement,
  ScrollyHorizontalElementProps
>((props, forwardedRef) => {
  const {
    as: Component = "div",
    children,
    preChildren,
    postChildren,
    precision,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollyValues = useScrollyHorizontalElementLayout(
    containerRef,
    contentRef,
    precision
  );

  return (
    <div className="scrolly-horizontal-container" style={styles.container}>
      <div className="scrolly-horizontal-sticky" style={styles.sticky}>
        <ScrollyElementContext.Provider value={scrollyValues}>
          {preChildren}

          <Component
            {...rest}
            style={{ ...rest.style, ...styles.content }}
            ref={mergeRefs(forwardedRef, contentRef)}
          >
            {children}
          </Component>

          {postChildren}
        </ScrollyElementContext.Provider>
      </div>
    </div>
  );
});

export default ScrollyHorizontalElement;

function useScrollyHorizontalElementLayout(
  containerRef: React.RefObject<HTMLDivElement>,
  contentRef: React.RefObject<HTMLDivElement>,
  precision?: number
) {
  const scrollyValues = useScrolly(contentRef, {
    precision,
    startAtEntryRatio: 1,
    stopAtExitRatio: 0,
  });
  const { windowWidth, windowHeight, scrollRatio } = scrollyValues;

  useStableLayoutEffect(() => {
    const contentScrollWidth = contentRef.current?.scrollWidth || 0;
    const scrollDistance = Math.max(contentScrollWidth - windowWidth, 0);

    // Make container taller to accommodate scroll distance
    const containerHeight = windowHeight + scrollDistance;
    containerRef.current?.style.setProperty("height", `${containerHeight}px`);

    const translateValue = interpolate(scrollRatio, {
      targetStart: 0,
      targetEnd: scrollDistance,
    }).toFixed(0);

    contentRef.current?.style.setProperty(
      "transform",
      `translateX(-${translateValue}px)`
    );
  }, [windowHeight, windowWidth, scrollRatio, contentRef, containerRef]);

  return scrollyValues;
}
