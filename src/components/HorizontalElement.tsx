import { forwardRef, useRef } from "react";

import { ScrollyElementContext } from "../contexts/element-context.js";
import { mergeRefs, type Styles } from "../utils/react-helpers.js";
import useScrolly from "../utils/use-scrolly.js";
import {
  useHorizontalElementLayoutEffect,
  useHorizontalElementScrollDistance,
} from "../utils/horizontal-element.js";

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
  const scrollDistance = useHorizontalElementScrollDistance(
    containerRef,
    contentRef,
    scrollyValues.windowHeight,
    scrollyValues.windowWidth
  );
  useHorizontalElementLayoutEffect(
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
