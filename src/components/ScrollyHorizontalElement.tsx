import { forwardRef, useRef } from "react";

import interpolate from "../interpolate.js";
import { mergeRefs, useStableLayoutEffect } from "../utils/react-helpers.js";
import { ScrollyElementContext } from "../utils/scrolly-context.js";
import useScrolly from "../utils/use-scrolly.js";

export interface ScrollyHorizontalElementProps {
  as?: React.ElementType;
  children: React.ReactNode;
  preChildren?: React.ReactNode;
  postChildren?: React.ReactNode;
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

const ScrollyHorizontalElement = (
  props: ScrollyHorizontalElementProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    as: Component = "div",
    children,
    preChildren,
    postChildren,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollyValues = useScrollyHorizontalElementLayout(
    containerRef,
    contentRef
  );

  return (
    <div
      ref={containerRef}
      className="scrolly-horizontal-container"
      style={styles.container}
    >
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
};

export default forwardRef(ScrollyHorizontalElement);

const CSS_PROPERTY_OVERFLOW_X = "overflow-x";

function useScrollyHorizontalElementLayout(
  containerRef: React.RefObject<HTMLDivElement>,
  contentRef: React.RefObject<HTMLDivElement>
) {
  const timeRef = useRef(0);
  const scrollyValues = useScrolly(containerRef, {
    precision: 3,
  });
  const { windowWidth, windowHeight, scrollRatio } = scrollyValues;

  // Make sure the body doesn't scroll horizontally itself
  useStableLayoutEffect(() => {
    const previousOverflowX = document.body.style.getPropertyValue(
      CSS_PROPERTY_OVERFLOW_X
    );
    document.body.style.setProperty(CSS_PROPERTY_OVERFLOW_X, "hidden");

    return () =>
      document.body.style.setProperty(
        CSS_PROPERTY_OVERFLOW_X,
        previousOverflowX
      );
  }, []);

  useStableLayoutEffect(() => {
    const contentScrollWidth = contentRef.current?.scrollWidth || 0;
    const scrollDistance = Math.max(contentScrollWidth - windowWidth, 0);

    // Make container taller to accommodate scroll distance
    const containerHeight = windowHeight + scrollDistance;
    containerRef.current?.style.setProperty("height", `${containerHeight}px`);

    const translateValue = interpolate(scrollRatio, {
      targetFrom: 0,
      targetTo: scrollDistance,
    }).toFixed(0);

    const frame = window.requestAnimationFrame((time) => {
      const delta = time - timeRef.current;
      timeRef.current = time;

      contentRef.current?.animate(
        { transform: `translateX(-${translateValue}px)` },
        {
          fill: "forwards",
          easing: "ease-in-out",
          duration: 100,
          playbackRate: 1 + delta / 100,
        }
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [windowHeight, windowWidth, scrollRatio, contentRef, containerRef]);

  return scrollyValues;
}
