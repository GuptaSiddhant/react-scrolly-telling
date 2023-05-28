import { renderHook } from "@testing-library/react";

// This suppresses console.error from cluttering the test output.

export default function catchHookErrorMessage(
  ...args: Parameters<typeof renderHook>
): string {
  try {
    vi.spyOn(console, "error").mockImplementationOnce(() => {});
    renderHook(...args);
  } catch (e) {
    if (!e) return "";
    if (typeof e === "object" && "message" in e) {
      return e.message?.toString() || "";
    }
    return e.toString();
  }

  throw new Error("No error was thrown from the hook.");
}
