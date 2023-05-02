import { renderHook } from "@testing-library/react";
import useElementPosition, {
  type ElementPosition,
  createElementPositionSnapshotGetter,
} from "./element-position.js";

describe("useElementPosition", () => {
  it("should return default value when disabled is true", () => {
    const element = document.createElement("div");
    element.style.height = "200px";
    element.style.width = "100%";
    document.body.appendChild(element);

    const { result } = renderHook(() =>
      useElementPosition(
        { current: element },
        { disabled: true, defaultValue: 100 }
      )
    );

    expect(result.current.height).toBe(100);
    expect(result.current.top).toBe(100);
  });

  it("should return default value when default is provided", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const { result } = renderHook(() =>
      useElementPosition({ current: element }, { defaultValue: 100 })
    );

    expect(result.current.height).toBe(100);
    expect(result.current.top).toBe(100);
  });
});

describe("createElementPositionSnapshotGetter", () => {
  it("should return current bounding rect for element", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const defaultPosition: ElementPosition = { height: 0, top: 0 };
    const getPosition = createElementPositionSnapshotGetter(
      element,
      defaultPosition
    );

    const getBoundingClientRectSpy = vi.spyOn(element, "getBoundingClientRect");

    getBoundingClientRectSpy.mockImplementation(
      () => ({ height: 800.25, top: 400.5 } as DOMRect)
    );
    expect(getPosition()).toEqual({ height: 800, top: 400 });
    expect(getBoundingClientRectSpy).toHaveBeenCalledTimes(1);

    getBoundingClientRectSpy.mockImplementation(
      () => ({ height: 800.25, top: 199.5 } as DOMRect)
    );
    expect(getPosition()).toEqual({ height: 800, top: 200 });
    expect(getBoundingClientRectSpy).toHaveBeenCalledTimes(2);
  });

  it("should return same bounding rect for element if position is same", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const defaultPosition: ElementPosition = { height: 0, top: 0 };
    const getPosition = createElementPositionSnapshotGetter(
      element,
      defaultPosition
    );

    const getBoundingClientRectSpy = vi.spyOn(element, "getBoundingClientRect");

    getBoundingClientRectSpy.mockImplementation(
      () => ({ height: 800.25, top: 400.5 } as DOMRect)
    );

    const position = getPosition();
    expect(position).toEqual({ height: 800, top: 400 });
    expect(getBoundingClientRectSpy).toHaveBeenCalledTimes(1);

    getBoundingClientRectSpy.mockImplementation(
      () => ({ height: 800.25, top: 399.5 } as DOMRect)
    );
    expect(getPosition()).toEqual(position); // immutable object
    expect(getBoundingClientRectSpy).toHaveBeenCalledTimes(2);
  });
});
