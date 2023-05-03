import { useCallback, useRef } from "react";

export type IntersectionObserverCallback = (
  entry: IntersectionObserverEntry
) => void;
export type IntersectionObserverSubscriber = (
  target: Element | null,
  callback: IntersectionObserverCallback
) => () => void;

export default function useElementIntersection(): IntersectionObserverSubscriber {
  const targetCallbackMapRef = useRef(
    new Map<Element, IntersectionObserverCallback>()
  );

  const intersectionObserverRef = useRef<IntersectionObserver | null>(
    typeof window !== "undefined"
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            targetCallbackMapRef.current.get(entry.target)?.(entry);
          });
        })
      : null
  );

  return useCallback((target, callback) => {
    const callbackMap = targetCallbackMapRef.current;
    const observer = intersectionObserverRef.current;

    if (!target || !observer) return () => {};

    callbackMap.set(target, callback);
    observer.observe(target);

    return () => {
      callbackMap.delete(target);
      observer.unobserve(target);
    };
  }, []);
}
