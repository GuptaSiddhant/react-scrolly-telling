import { forwardRef } from "react";

import ScrollyHorizontalElement, {
  type ScrollyHorizontalElementProps,
} from "./components/ScrollyHorizontalElement.jsx";
import ScrollyVerticalElement, {
  type ScrollyVerticalElementProps,
} from "./components/ScrollyVerticalElement.jsx";

type ScrollyElementBaseProps =
  | ({ horizontal: true } & ScrollyHorizontalElementProps)
  | ({ horizontal?: false } & ScrollyVerticalElementProps);

export type ScrollyElementProps<T extends React.ElementType> = {
  as?: T;
} & ScrollyElementBaseProps &
  Omit<React.ComponentPropsWithRef<T>, keyof ScrollyElementBaseProps>;

/**
 * A component that can be used to create a scrolly-telling element.
 */
const ScrollyElement = forwardRef<HTMLDivElement, ScrollyElementProps<"div">>(
  ({ horizontal, ...props }, ref): JSX.Element | null => {
    if (!horizontal) {
      return <ScrollyVerticalElement {...props} ref={ref} />;
    }

    return <ScrollyHorizontalElement {...props} ref={ref} />;
  }
) as ScrollyElementComponentType;

// Type casting is required due to limitations of `forwardRef` with respect to generics.
type ScrollyElementComponentType = <T extends React.ElementType = "div">(
  props: ScrollyElementProps<T>
) => JSX.Element;

export default ScrollyElement;

export { useScrollyElementContext } from "./utils/scrolly-context.js";
