import { forwardRef, useMemo } from "react";
import interpolate from "../interpolate.js";
import { minmax } from "../utils/math.js";
import { useScrollyElementContext } from "../utils/scrolly-context.js";

export interface IRevealScrimProps extends React.ComponentPropsWithRef<"div"> {
  fromOpacity?: number;
  toOpacity?: number;
  backgroundColor?: string;
}

/**
 * A scrim that reveals the content as the user scrolls.
 * Can be used as preChildren for ScrollyElement.
 */
const RevealScrim = forwardRef<HTMLDivElement, IRevealScrimProps>(
  (props, ref) => {
    const { backgroundColor, fromOpacity, toOpacity, ...rest } = props;
    const { entryRatio, exitRatio } = useScrollyElementContext();

    const opacity = useMemo(
      () =>
        calculateOpacityFromEntryExitPercent({
          entryRatio,
          exitRatio,
          fromOpacity,
          toOpacity,
        }),
      [entryRatio, exitRatio, fromOpacity, toOpacity]
    );

    const style = useMemo((): React.CSSProperties => {
      const zIndex = opacity === 0 ? -1 : 1; // hide scrim when opacity is 0
      const bgColor =
        backgroundColor ??
        rest.style?.backgroundColor ??
        rest.style?.background ??
        "black";

      return {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundColor: String(bgColor),
        opacity,
        zIndex,
      };
    }, [
      opacity,
      backgroundColor,
      rest.style?.backgroundColor,
      rest.style?.background,
    ]);

    return <div role="presentation" {...rest} style={style} ref={ref} />;
  }
);

export default RevealScrim;

const DEFAULT_FROM_OPACITY = 1;
const DEFAULT_TO_OPACITY = 0;

interface CalculateOpacityOptions {
  fromOpacity?: number;
  toOpacity?: number;
  entryRatio: number;
  exitRatio: number;
}

/**
 * | entry  -> opacity     |
 * | --------------------- |
 * | 0.00   -> 1.00 (from) |
 * | interpolate values    |
 * | 1.00   -> 0.00 (to)   |
 *
 * | exit   -> opacity     |
 * | --------------------- |
 * | 0.00   -> 0.00 (to)   |
 * | interpolate values    |
 * | 1.00   -> 1.00 (from) |
 */
function calculateOpacityFromEntryExitPercent(
  options: CalculateOpacityOptions
) {
  const { fromOpacity, toOpacity, entryRatio, exitRatio } = options;
  const isEntryComplete = entryRatio === 1;

  // clamp fromOpacity between 0 and 1
  const from = minmax(fromOpacity ?? DEFAULT_FROM_OPACITY, 0, 1);
  const to = minmax(toOpacity ?? DEFAULT_TO_OPACITY, 0, 1);

  // For changing opacity from 0 to 1,
  // the entryRatio and exitRatio can be used directly
  if (from === 1 && to === 0) {
    return isEntryComplete ? exitRatio : 1 - entryRatio;
  }

  if (isEntryComplete) {
    // Reverse the interpolation when exiting
    return interpolate(exitRatio, {
      targetFrom: to,
      targetTo: from,
      precision: 2,
    });
  }

  return interpolate(entryRatio, {
    targetFrom: from,
    targetTo: to,
    precision: 2,
  });
}
