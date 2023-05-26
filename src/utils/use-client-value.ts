import { useSyncExternalStore } from "react";

export default function useClientValue<T>(
  getValue: () => T,
  getServerValue?: () => T
): T {
  return useSyncExternalStore(subscribeOnce, getValue, getServerValue);
}

function subscribeOnce(listener: () => void) {
  listener();
  return () => {};
}
