import createSubscriber from "./create-subscriber.js";

describe("createSubscriber", () => {
  it("should return a NOOP function when disabled is true", () => {
    const listener = vi.fn();

    const unsubscribe = createSubscriber("resize", true)(listener);
    expect(listener).toHaveBeenCalledTimes(0);

    unsubscribe();
    expect(listener).toHaveBeenCalledTimes(0);
  });

  it("should return a function that subscribes to window events", () => {
    const listener = vi.fn();
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const unsubscribe = createSubscriber("resize")(listener);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event("resize"));
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    expect(listener).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
