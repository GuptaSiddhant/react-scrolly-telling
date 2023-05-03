import { ScrollyContext } from "./utils/scrolly-context.js";
import useWindowDimension from "./utils/window-dimension.js";

export interface ScrollyProviderProps {
  /**
   * Content of the application.
   * @default null
   */
  children: React.ReactNode;

  /**
   * Default values for the window dimension. Used in server-side rendering.
   */
  defaultWindowDimension?: {
    windowHeight: number;
    windowWidth: number;
  };
}

/**
 * React context provider that provides the window height and width to the scrolly elements.
 */
export default function ScrollyProvider({
  children,
  defaultWindowDimension,
}: ScrollyProviderProps): JSX.Element {
  const windowDimension = useWindowDimension({
    defaultHeight: defaultWindowDimension?.windowHeight,
    defaultWidth: defaultWindowDimension?.windowWidth,
  });

  return (
    <ScrollyContext.Provider value={windowDimension}>
      {children}
    </ScrollyContext.Provider>
  );
}
