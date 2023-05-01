export type WindowListener = () => void;
export type WindowSubscriber = (listener: WindowListener) => () => void;

export default function createSubscriber(
  type: "resize" | "scroll",
  element?: HTMLElement,
  disabled?: boolean
): WindowSubscriber {
  return disabled ? subscribeToNoop : _createSubscriber(type, element);
}

function _createSubscriber(
  type: "resize" | "scroll",
  element?: HTMLElement
): WindowSubscriber {
  return (listener: WindowListener) => {
    listener();

    if (element) {
      element.addEventListener(type, listener, { passive: true });
      return () => element.removeEventListener(type, listener);
    }

    window.addEventListener(type, listener, { passive: true });
    return () => window.removeEventListener(type, listener);
  };
}

function subscribeToNoop(): WindowListener {
  return function () {
    return;
  };
}
