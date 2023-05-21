import Video, { type VideoTimeChangeFn } from "./components/Video.jsx";
import ScrollyElement from "./element.jsx";
import { type Styles } from "./utils/react-helpers.js";

export interface ScrollyVideoProps
  extends React.ComponentPropsWithoutRef<"div"> {
  playFromEntry?: boolean;
  playTillExit?: boolean;
  src: string;
  onVideoTimeChange?: VideoTimeChangeFn;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

const styles = {
  videoWrapper: { position: "absolute", inset: 0, zIndex: 0 },
  video: {
    position: "sticky",
    top: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
  },
} satisfies Styles;

export default function ScrollyVideo({
  children,
  playFromEntry: startOnEntry,
  playTillExit: stopOnExit,
  src,
  onVideoTimeChange,
  videoRef,
  ...rest
}: ScrollyVideoProps): JSX.Element | null {
  return (
    <ScrollyElement
      style={{ minHeight: "110vh" }}
      startAtEntryRatio={startOnEntry ? 0 : 1}
      stopAtExitRatio={stopOnExit ? 1 : 0}
      {...rest}
    >
      <div style={styles.videoWrapper} role="presentation">
        <Video
          src={src}
          style={styles.video}
          onTimeChange={onVideoTimeChange}
          ref={videoRef}
        />
      </div>

      {children}
    </ScrollyElement>
  );
}

export type {
  VideoTimeChangeFn,
  VideoTimeChangeValues,
} from "./components/Video.jsx";
