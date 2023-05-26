import { useRef } from "react";
import { useStableLayoutEffect } from "./react-helpers.js";

/**
 * Request an animation frame and call the callback with the time and delta.
 * @param callback The callback should be stable. A new frame will be requested when callback changes.
 */
export default function useAnimationFrame(
  callback: (time: number, delta: number) => void
): void {
  const timeRef = useRef(0);

  useStableLayoutEffect(() => {
    const animationFrame = window.requestAnimationFrame((time) => {
      const delta = time - timeRef.current;
      timeRef.current = time;

      callback(time, delta);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [callback]);
}
