import { forwardRef, useCallback, useMemo, useRef } from "react";

import { ScrollyElementContext } from "../contexts/element-context.js";
import interpolate from "../interpolate.js";
import useAnimationFrame from "../utils/animation-frame.js";
import {
  mergeRefs,
  useStableLayoutEffect,
  type Styles,
} from "../utils/react-helpers.js";
import useClientValue from "../utils/use-client-value.js";
import useScrolly from "../utils/use-scrolly.js";

export interface ScrollyHorizontalElementProps {
  as?: React.ElementType;
  children: React.ReactNode;
  preChildren?: React.ReactNode;
  postChildren?: React.ReactNode;
  style?: React.CSSProperties;
  precision?: number;
}

const DEFAULT_PRECISION = 3;
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
    width: "100vw",
    overflow: "hidden",
  },
  content: {
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    willChange: "transform",
    pointerEvents: "auto",
  },
} satisfies Styles;

const ScrollyHorizontalElement = (
  props: ScrollyHorizontalElementProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    as: Component = "div",
    children,
    preChildren,
    postChildren,
    precision = DEFAULT_PRECISION,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollyValues = useScrolly(containerRef, { precision });
  const scrollDistance = useScrollDistance(
    containerRef,
    contentRef,
    scrollyValues.windowHeight,
    scrollyValues.windowWidth
  );
  useScrollyHorizontalElementLayout(
    contentRef,
    scrollyValues.scrollRatio,
    scrollDistance
  );

  return (
    <div
      ref={containerRef}
      className="scrolly-horizontal-container"
      style={styles.container}
    >
      <div className="scrolly-horizontal-sticky" style={styles.sticky}>
        <ScrollyElementContext.Provider
          value={{ ...scrollyValues, scrollDistance }}
        >
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

function useScrollDistance(
  containerRef: React.RefObject<HTMLDivElement>,
  contentRef: React.RefObject<HTMLDivElement>,
  windowHeight: number,
  windowWidth: number
) {
  const contentScrollWidth: number = useClientValue(
    () => contentRef.current?.scrollWidth || 0,
    () => 0
  );

  const scrollDistance: number = useMemo(
    () => Math.max(contentScrollWidth - windowWidth, 0),
    [contentScrollWidth, windowWidth]
  );

  // Make container taller to accommodate scroll distance
  useStableLayoutEffect(() => {
    const containerHeight = windowHeight + scrollDistance;
    containerRef.current?.style.setProperty("height", `${containerHeight}px`);
  }, [containerRef, scrollDistance, windowHeight]);

  return scrollDistance;
}

function useScrollyHorizontalElementLayout(
  contentRef: React.RefObject<HTMLDivElement>,
  scrollRatio: number,
  scrollDistance: number
): void {
  const translateValue: string = useMemo(
    () =>
      interpolate(scrollRatio, {
        targetFrom: 0,
        targetTo: scrollDistance,
      }).toFixed(0),
    [scrollDistance, scrollRatio]
  );

  const handleAnimationFrame = useCallback(
    (_time: number, delta: number) => {
      contentRef.current?.animate(
        { transform: `translateX(-${translateValue}px)` },
        {
          fill: "forwards",
          easing: "ease-in-out",
          duration: 100,
          playbackRate: 1 + delta / 100,
        }
      );
    },
    [contentRef, translateValue]
  );

  useAnimationFrame(handleAnimationFrame);
}
