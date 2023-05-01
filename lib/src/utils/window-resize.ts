import { useSyncExternalStore } from "react";

import { roundToDecimal } from "./math.js";
import createWindowSubscriber from "./window-subscribe.js";

const DEFAULT_HEIGHT = 500;
const DEFAULT_WIDTH = 800;

export interface WindowDimensionsOptions {
  disabled?: boolean;
  defaultHeight?: number;
  defaultWidth?: number;
  precision?: number;
}

export interface WindowDimensions {
  readonly windowHeight: number;
  readonly windowWidth: number;
}

export default function useWindowDimensions(
  options: WindowDimensionsOptions = {}
): WindowDimensions {
  const {
    disabled,
    defaultHeight = DEFAULT_HEIGHT,
    defaultWidth = DEFAULT_WIDTH,
    precision,
  } = options;

  return useSyncExternalStore(
    createWindowSubscriber("resize", disabled),
    createWindowDimensionSnapshotGetter(precision),
    () => ({ windowHeight: defaultHeight, windowWidth: defaultWidth })
  );
}

// Snapshot getters

function createWindowDimensionSnapshotGetter(
  decimalPlaces = -1
): () => WindowDimensions {
  let dimensions: WindowDimensions = {
    windowHeight: DEFAULT_HEIGHT,
    windowWidth: DEFAULT_WIDTH,
  };

  return () => {
    const windowHeight = getWindowHeight(decimalPlaces);
    const windowWidth = getWindowWidth(decimalPlaces);

    if (
      windowHeight !== dimensions.windowHeight ||
      windowWidth !== dimensions.windowWidth
    ) {
      dimensions = { windowHeight, windowWidth };
    }

    return dimensions;
  };
}

function getWindowHeight(decimalPlaces = -1): number {
  return Math.max(1, roundToDecimal(window.innerHeight, decimalPlaces));
}

function getWindowWidth(decimalPlaces = -1): number {
  return Math.max(1, roundToDecimal(window.innerWidth, decimalPlaces));
}
