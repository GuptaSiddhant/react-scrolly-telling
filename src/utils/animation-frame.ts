import { useRef } from "react";
import { useStableLayoutEffect } from "./react-helpers.js";

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
  }, [callback, cancelAnimationFrame]);
}
