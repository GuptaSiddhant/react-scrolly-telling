import { useSyncExternalStore } from "react";

import { roundToDecimal } from "./math.js";
import createWindowSubscriber from "./window-subscribe.js";

const DEFAULT_VALUE = 0;

export type DOMRectKey = Exclude<keyof DOMRectReadOnly, "toJSON">;

export interface ElementPositionOptions {
  disabled?: boolean;
  defaultValue?: number;
  precision?: number;
}

export interface ElementPosition {
  readonly top: number;
  readonly height: number;
}

export default function useElementPosition(
  elementRef: React.RefObject<HTMLElement>,
  options: ElementPositionOptions = {}
): ElementPosition {
  const { disabled, defaultValue = DEFAULT_VALUE, precision } = options;

  return useSyncExternalStore(
    createWindowSubscriber("scroll", disabled),
    createElementPositionSnapshotGetter(elementRef.current, precision),
    () => ({ height: defaultValue, top: defaultValue })
  );
}

// Snapshot getters

function createElementPositionSnapshotGetter(
  element: HTMLElement | null,
  decimalPlaces = -1
): () => ElementPosition {
  let position: ElementPosition = {
    height: DEFAULT_VALUE,
    top: DEFAULT_VALUE,
  };

  return () => {
    const height = getElementDomRectValue(element, "height", decimalPlaces);
    const top = getElementDomRectValue(element, "top", decimalPlaces);

    if (height !== position.height || top !== position.top) {
      position = { height, top };
    }

    return position;
  };
}

function getElementDomRectValue(
  element: HTMLElement | null,
  key: DOMRectKey,
  decimalPlaces = -1
): number {
  return roundToDecimal(
    element?.getBoundingClientRect()[key] || DEFAULT_VALUE,
    decimalPlaces
  );
}
