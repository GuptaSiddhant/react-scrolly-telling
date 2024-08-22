import { expect, describe, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useClientValue from "./use-client-value.js";

describe("useClientValue", () => {
  it("should return same value on client", () => {
    const { result } = renderHook(() => useClientValue(() => 0));

    expect(result.current).toBe(0);
  });
});
