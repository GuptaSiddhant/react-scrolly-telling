import { useSyncExternalStore } from "react";

import { minmax, roundToDecimal } from "./math";

const DEFAULT_POSITION_VALUE = 0;
const DEFAULT_SCROLL_Y = 500;

export type DOMRectKey = Exclude<keyof DOMRectReadOnly, "toJSON">;

export interface WindowScrollOptions {
  disabled?: boolean;
  defaultValue?: number;
  precision?: number;
}

export default function useElementPosition(
  elementRef: React.RefObject<HTMLElement>,
  key: DOMRectKey,
  options: WindowScrollOptions = {}
): number {
  const { disabled, defaultValue = DEFAULT_SCROLL_Y, precision } = options;
  return useSyncExternalStore(
    maybeSubscribeToWindowScroll(disabled),
    createElementDomRectValueSnapshotGetter(elementRef.current, key, precision),
    () => defaultValue
  );
}

// Snapshot getters

function createElementDomRectValueSnapshotGetter(
  element: HTMLElement | null,
  key: DOMRectKey,
  decimalPlaces = -1
) {
  return () =>
    roundToDecimal(
      element?.getBoundingClientRect()[key] || DEFAULT_POSITION_VALUE,
      decimalPlaces
    );
}

// Subscribers

function maybeSubscribeToWindowScroll(disabled?: boolean) {
  return disabled ? subscribeToNoop : subscribeToWindowScroll;
}

const subscribers = new Set<() => void>();

if (typeof window !== "undefined") {
  const scrollCallback = () => subscribers.forEach((listener) => listener());
  window.addEventListener("scroll", scrollCallback, { passive: true });

  const beforeunloadCallback = () => {
    subscribers.clear();
    window.removeEventListener("scroll", scrollCallback);
  };
  window.addEventListener("beforeunload", beforeunloadCallback);
}

function subscribeToWindowScroll(listener: () => void) {
  listener();
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

function subscribeToNoop() {
  return () => {};
}
