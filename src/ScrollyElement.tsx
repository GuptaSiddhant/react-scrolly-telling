import { forwardRef, useRef } from "react";

import useScrolly from "./utils/use-scrolly.js";
import { ScrollyElementContext } from "./utils/scrolly-context.js";
import type { ScrollyOptions } from "./utils/types.js";

interface ScrollyElementBaseProps<T extends React.ElementType>
  extends Omit<ScrollyOptions, "disabled"> {
  as?: T;
  children: React.ReactNode;
  horizontal?: boolean;
}

export type ScrollyElementProps<T extends React.ElementType> =
  ScrollyElementBaseProps<T> &
    Omit<React.ComponentPropsWithRef<T>, keyof ScrollyElementBaseProps<T>>;

type ScrollyElementComponentType = <T extends React.ElementType = "div">(
  props: ScrollyElementProps<T>
) => JSX.Element;

const ScrollyElement = forwardRef<HTMLDivElement, ScrollyElementProps<"div">>(
  (props, ref): JSX.Element | null => {
    const {
      as: Component = "div",
      children,
      horizontal = false,
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

    if (!horizontal) {
      return (
        <ScrollyElementContext.Provider value={scrollyValues}>
          <Component {...rest} ref={ref}>
            {children}
          </Component>
        </ScrollyElementContext.Provider>
      );
    }

    return null;
  }
) as ScrollyElementComponentType;

export default ScrollyElement;
