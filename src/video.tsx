import ScrollyElement from "./element.jsx";
import Video, { type VideoProps } from "./components/Video.jsx";

export interface ScrollyVideoProps
  extends VideoProps,
    React.ComponentPropsWithoutRef<"div"> {
  playFromEntry?: boolean;
  playTillExit?: boolean;
}

export default function ScrollyVideo({
  children,
  playFromEntry: startOnEntry,
  playTillExit: stopOnExit,
  src,
  ...rest
}: ScrollyVideoProps): JSX.Element | null {
  return (
    <ScrollyElement
      style={{ minHeight: "110vh" }}
      startAtEntryRatio={startOnEntry ? 0 : 1}
      stopAtExitRatio={stopOnExit ? 1 : 0}
      {...rest}
    >
      <Video src={src} />

      {children}
    </ScrollyElement>
  );
}
