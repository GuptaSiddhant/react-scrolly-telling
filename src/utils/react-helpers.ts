import { useEffect, useLayoutEffect } from "react";

export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (element: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<T>).current = element;
      }
    });
  };
}

export const useStableLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export type Styles = Record<string, React.CSSProperties>;
