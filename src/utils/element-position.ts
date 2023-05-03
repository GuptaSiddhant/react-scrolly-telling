import { useSyncExternalStore } from "react";

import createSubscriber from "./create-subscriber.js";
import { roundToDecimal } from "./math.js";

const FALLBACK_VALUE = 0;

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
  const { disabled, defaultValue = FALLBACK_VALUE, precision } = options;
  const defaultPosition: ElementPosition = {
    height: defaultValue,
    top: defaultValue,
  };

  return useSyncExternalStore(
    createSubscriber("scroll", disabled),
    createElementPositionSnapshotGetter(elementRef, defaultPosition, precision),
    () => defaultPosition
  );
}

// Snapshot getters

export function createElementPositionSnapshotGetter(
  elementRef: React.RefObject<HTMLElement>,
  defaultPosition: ElementPosition,
  decimalPlaces = -1
): () => ElementPosition {
  let position: ElementPosition = defaultPosition;

  return () => {
    const domRect = elementRef.current?.getBoundingClientRect();
    const height = roundToDecimal(
      domRect?.height || position.height,
      decimalPlaces
    );
    const top = roundToDecimal(domRect?.top || position.top, decimalPlaces);

    if (height !== position.height || top !== position.top) {
      position = { height, top };
    }

    return position;
  };
}
