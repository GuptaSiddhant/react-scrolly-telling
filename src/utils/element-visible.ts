import { useCallback, useEffect, useState } from "react";

import { useScrollyRootContext } from "../_root/root-context.js";

export default function useElementVisible(ref: React.RefObject<HTMLElement>) {
  const { observeElementIntersection } = useScrollyRootContext();

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
