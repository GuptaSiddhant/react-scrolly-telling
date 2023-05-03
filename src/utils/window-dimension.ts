import { useSyncExternalStore } from "react";

import createSubscriber from "./create-subscriber.js";
import { roundToDecimal } from "./math.js";

const FALLBACK_HEIGHT = 500;
const FALLBACK_WIDTH = 800;

export interface WindowDimensionOptions {
  disabled?: boolean;
  defaultHeight?: number;
  defaultWidth?: number;
  precision?: number;
  parentElement?: HTMLElement;
}

export interface WindowDimension {
  readonly windowHeight: number;
  readonly windowWidth: number;
}

export default function useWindowDimension(
  options: WindowDimensionOptions = {}
): WindowDimension {
  const {
    disabled,
    defaultHeight = FALLBACK_HEIGHT,
    defaultWidth = FALLBACK_WIDTH,
    precision,
    parentElement,
  } = options;
  const defaultDimension: WindowDimension = {
    windowHeight: defaultHeight,
    windowWidth: defaultWidth,
  };

  return useSyncExternalStore(
    createSubscriber("resize", parentElement, disabled),
    createWindowDimensionSnapshotGetter(defaultHeight, defaultWidth, precision),
    () => defaultDimension
  );
}

// Snapshot getters

function createWindowDimensionSnapshotGetter(
  defaultHeight: number,
  defaultWidth: number,
  decimalPlaces = -1
): () => WindowDimension {
  let dimensions: WindowDimension = {
    windowHeight: defaultHeight,
    windowWidth: defaultWidth,
  };

  return () => {
    const windowHeight = Math.max(
      1,
      roundToDecimal(window.innerHeight, decimalPlaces)
    );
    const windowWidth = Math.max(
      1,
      roundToDecimal(window.innerWidth, decimalPlaces)
    );

    if (
      windowHeight !== dimensions.windowHeight ||
      windowWidth !== dimensions.windowWidth
    ) {
      dimensions = { windowHeight, windowWidth };
    }

    return dimensions;
  };
}
