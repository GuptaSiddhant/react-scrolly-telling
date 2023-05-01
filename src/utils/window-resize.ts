import { useSyncExternalStore } from "react";

import { roundToDecimal } from "./math";

const DEFAULT_HEIGHT = 500;
const DEFAULT_WIDTH = 800;

export interface WindowDimensionsOptions {
  disabled?: boolean;
  defaultHeight?: number;
  defaultWidth?: number;
  precision?: number;
}

export interface WindowDimensions {
  windowHeight: number;
  windowWidth: number;
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
    maybeSubscribeToWindowResize(disabled),
    () => ({
      windowHeight: createWindowHeightSnapshotGetter(precision)(),
      windowWidth: createWindowWidthSnapshotGetter(precision)(),
    }),
    () => ({ windowHeight: defaultHeight, windowWidth: defaultWidth })
  );
}

// Snapshot getters

function createWindowHeightSnapshotGetter(decimalPlaces = -1) {
  return () => Math.max(1, roundToDecimal(window.innerHeight, decimalPlaces));
}

function createWindowWidthSnapshotGetter(decimalPlaces = -1) {
  return () => Math.max(1, roundToDecimal(window.innerWidth, decimalPlaces));
}

// Subscribers

function maybeSubscribeToWindowResize(disabled?: boolean) {
  return disabled ? subscribeToNoop : subscribeToWindowResize;
}

const subscribers = new Set<() => void>();

if (typeof window !== "undefined") {
  const resizeCallback = () => subscribers.forEach((listener) => listener());
  window.addEventListener("resize", resizeCallback, { passive: true });

  const beforeunloadCallback = () => {
    subscribers.clear();
    window.removeEventListener("resize", resizeCallback);
  };
  window.addEventListener("beforeunload", beforeunloadCallback);
}

function subscribeToWindowResize(listener: () => void) {
  listener();
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

function subscribeToNoop() {
  return () => {};
}
