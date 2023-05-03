import { useCallback, useEffect, useState } from "react";

import useScrollyContext from "./scrolly-context.js";

export default function useElementVisible(ref: React.RefObject<HTMLElement>) {
  const { observeElementIntersection } = useScrollyContext();

  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback(
    (entry: IntersectionObserverEntry) => setIsVisible(entry.isIntersecting),
    []
  );

  useEffect(
    () => observeElementIntersection(ref.current, handleIntersection),
    [handleIntersection, observeElementIntersection, ref]
  );

  return isVisible;
}
