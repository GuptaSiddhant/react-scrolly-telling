import { useSyncExternalStore } from "react";

import createSubscriber from "./create-subscriber.js";
import { roundToDecimal } from "./math.js";

const DEFAULT_HEIGHT = 500;
const DEFAULT_WIDTH = 800;

export interface ParentElementDimensionOptions {
  disabled?: boolean;
  defaultHeight?: number;
  defaultWidth?: number;
  precision?: number;
  parentElement?: HTMLElement;
}

export interface ParentElementDimension {
  readonly windowHeight: number;
  readonly windowWidth: number;
}

export default function useParentElementDimension(
  options: ParentElementDimensionOptions = {}
): ParentElementDimension {
  const {
    disabled,
    defaultHeight = DEFAULT_HEIGHT,
    defaultWidth = DEFAULT_WIDTH,
    precision,
    parentElement,
  } = options;
  const defaultDimension: ParentElementDimension = {
    windowHeight: defaultHeight,
    windowWidth: defaultWidth,
  };

  return useSyncExternalStore(
    createSubscriber("resize", parentElement, disabled),
    createWindowDimensionSnapshotGetter(precision),
    () => defaultDimension
  );
}

// Snapshot getters

function createWindowDimensionSnapshotGetter(
  decimalPlaces = -1
): () => ParentElementDimension {
  let dimensions: ParentElementDimension = {
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
