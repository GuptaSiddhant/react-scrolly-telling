# React ScrollyTelling

Create scrolly-telling animations in React with ease.

[![Release](https://badgen.net/npm/v/react-scrolly-telling)](https://www.npmjs.com/package/react-scrolly-telling)
[![Types](https://badgen.net/npm/types/react-scrolly-telling)](https://www.npmjs.com/package/react-scrolly-telling)
[![License](https://badgen.net/github/license/guptasiddhant/react-scrolly-telling)](https://github.com/GuptaSiddhant/react-scrolly-telling/blob/main/LICENSE)
[![Total downloads](https://badgen.net/npm/dt/react-scrolly-telling)](https://www.npmjs.com/package/react-scrolly-telling)
[![Releases](https://badgen.net/github/releases/guptasiddhant/react-scrolly-telling)](https://github.com/GuptaSiddhant/react-scrolly-telling/releases)

[![Minified GZip](https://badgen.net/bundlephobia/minzip/react-scrolly-telling)](https://bundlephobia.com/package/react-scrolly-telling)
[![Dependency count](https://badgen.net/bundlephobia/dependency-count/react-scrolly-telling)](https://bundlephobia.com/package/react-scrolly-telling)
[![Tree shaking](https://badgen.net/bundlephobia/tree-shaking/react-scrolly-telling)](https://bundlephobia.com/package/react-scrolly-telling)

`react-scrolly-telling` is a helper library to track the position of an element on the screen with respect to the viewport (or other parent element). It is optimised to work well with React, SSR, and Suspense.

- **[Docs/Demo - Storybook](https:///react-scrolly-telling.vercel.app/)**
- [GitHub](https://www.github.com/GuptaSiddhant/react-scrolly-telling)
- [NPM](https://www.npmjs.com/package/react-scrolly-telling)
- [Bundlephobia](https://bundlephobia.com/package/react-scrolly-telling)

## Installation

Install from NPM:

```sh
yarn add react-scrolly-telling
# or
npm install react-scrolly-telling
# or
pnpm add react-scrolly-telling
```

## Features

- Track scroll position of an element with respect to the viewport using the `useScrolly` hook.
- Create `ScrollyElement` that are tracked automatically.
  - Bonus: `ScrollyElement` can be used to create Horizontal Scrolling effect. See [Storybook](https://react-scrolly-telling.vercel.app/?path=/story/components-scrollyelement--horizontal) for demo.
- Create Element with video background that plays/pauses/rewinds automatically based on scroll position.
  - Place any content on top of the video element.
  - Bonus: Provide a list of captions that are shown over the video based on video timestamp (in seconds). See [Storybook](https://react-scrolly-telling.vercel.app/?path=/story/components-scrollyvideo--captions) for demo.
- Add a `RevealScrim` to any ScrollyElement to reveal (fade from black) the element as the user scrolls.

## `useScrolly` hook

The core hook tracks the position of an element while is scrolls with respect to the viewport (or other parent element). It returns the following values: `scrollRatio`, `entryRatio`, `exitRatio` and more. These values can be used to calculate styles for animations or time for video playback.

### Usage

> Note: For Next 13 app router, the exports of these library can be imported by client-components only.

```tsx
import { useScrolly } from "react-scrolly-telling";

const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollRatio, entryRatio, exitRatio } = useScrolly(ref);

  return (
    <>
      <div style={{ height: "100vh" }} />
      <div ref={ref} style={{ height: "200vh" }}>
        <p>Entry: {entryRatio}</p>
        <p>Scroll: {scrollRatio}</p>
        <p>Exit: {exitRatio}</p>
      </div>
      <div style={{ height: "100vh" }} />
    </>
  );
};
```

### API

The hook accepts a `ref` to the element to track and an optional `options` object. It returns an object with the useful scrolly-values.

```tsx
function useScrolly(
  ref: React.RefObject<HTMLElement>,
  options?: ScrollyOptions
): ScrollyValues;

interface ScrollyOptions {
  /**  Disable the scrolly effect. Always returns 0 as scroll ratio value. */
  disabled?: boolean;

  /**
   * Value: 0 - 1 (default: 1)
   * 0: start counting when the element enters the viewport (entryRatio = 0).
   * 0.5: start counting when the top of the element is at the middle of the viewport (entryRatio = 0.5).
   * 1: start counting when top of element is at the top of the viewport (entryRatio = 1).
   */
  startAtEntryRatio?: number;

  /**
   * Value: 0 - 1 (default: 0)
   * 0: stop counting when the bottom of the element is at the bottom of the viewport (exitRatio = 0).
   * 0.5: stop counting when the bottom of the element is at the middle of the viewport (exitRatio = 0.5).
   * 1: stop counting when the element leaves the viewport (exitRatio = 1).
   */
  stopAtExitRatio?: number;

  /**
   * The number of decimal places (1-5) to round to for returned values. Default: 2.
   *
   * Warning: Increasing the precision will cause the calculations depending
   * scroll ratio to be recalculated more often by a multiple of 10.
   */
  precision?: number;

  /**
   * The parent element to use for calculating the scroll ratio. Defaults to 'window'.
   */
  parentElement?: HTMLElement;
}

interface ScrollyValues {
  /** The ratio of element's scroll that has taken place. The numeric value ranges from 0 to 1. */
  readonly scrollRatio: number;

  /** The ratio of element's entry in the viewport. The number value ranges from 0 to 1. */
  readonly entryRatio: number;

  /** The ratio of element's exit from the viewport. The number value ranges from 0 to 1. */
  readonly exitRatio: number;

  /** Current height of window/viewport in px. */
  readonly windowHeight: number;

  /** Current width of window/viewport in px. */
  readonly windowWidth: number;
}
```
