export type WindowListener = () => void;
export type WindowSubscriber = (listener: WindowListener) => () => void;

export default function createSubscriber(
  type: "resize" | "scroll",
  disabled?: boolean
): WindowSubscriber {
  return disabled ? subscribeToNoop : _createSubscriber(type);
}

function _createSubscriber(type: "resize" | "scroll"): WindowSubscriber {
  return (listener: WindowListener) => {
    listener();

    window.addEventListener(type, listener, { passive: true });
    return () => window.removeEventListener(type, listener);
  };
}

function subscribeToNoop(): WindowListener {
  return function () {
    return;
  };
}
