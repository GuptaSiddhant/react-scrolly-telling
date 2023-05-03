import createSubscriber from "./create-subscriber.js";

describe("createSubscriber", () => {
  it("should return a NOOP function when disabled is true", () => {
    const listener = vi.fn();

    const unsubscribe = createSubscriber("resize", undefined, true)(listener);
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

  it("should return a function that subscribes to element events", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const listener = vi.fn();
    const addEventListenerSpy = vi.spyOn(element, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(element, "removeEventListener");

    const unsubscribe = createSubscriber("scroll", element)(listener);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

    element.dispatchEvent(new Event("scroll"));
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    expect(listener).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
