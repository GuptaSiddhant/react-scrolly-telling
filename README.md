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
  / [NPM](https://www.npmjs.com/package/react-scrolly-telling)
  / [Bundlephobia](https://bundlephobia.com/package/react-scrolly-telling)

Currently this library uses modern JS API like **Intersection Observer** and optimised React hooks like `useSyncExternalStore` to keep track of element's position on the screen.
In future, once [ScrollTimeline API](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline) is finalised and well-supported, this library will be updated to use it.

> Note: For Next 13 app router, the exports of these library can be imported by client-components only.

## Installation

Install from NPM:

```sh
yarn add react-scrolly-telling
# or
npm install react-scrolly-telling
# or
pnpm add react-scrolly-telling
```

> Note: The NPM unpacked size might show a huge number around ~200 kB. This is the install size of the package as it ships with both ESM and CJS versions, plus their respective source-maps (heavy files).
> The actual bundle size is quite less (few kBs). To see the effective bundle size, check [Bundlephobia](https://bundlephobia.com/package/react-scrolly-telling).

## Features

- Track scroll position of an element with respect to the viewport using the `useScrolly` hook.
- element: Create `ScrollyElement` that are tracked automatically.
  - Bonus: `ScrollyElement` can be used to create Horizontal Scrolling effect. See [Storybook](https://react-scrolly-telling.vercel.app/?path=/story/components-scrollyelement--horizontal) for demo.
- video: Create Element with video background that plays/pauses/rewinds automatically based on scroll position.
  - Place any content on top of the video element.
  - Bonus: Provide a list of captions that are shown over the video based on video timestamp (in seconds). See [Storybook](https://react-scrolly-telling.vercel.app/?path=/story/components-scrollyvideo--captions) for demo.
- components: Add a `RevealScrim` to any ScrollyElement to reveal (fade from black) the element as the user scrolls.

---

## `useScrolly` hook

The core hook tracks the position of an element while is scrolls with respect to the viewport (or other parent element). It returns the following values: `scrollRatio`, `entryRatio`, `exitRatio` and more. These values can be used to calculate styles for animations or time for video playback.

[Learn more at official docs](https://react-scrolly-telling.vercel.app/?path=/docs/helpers-usescrolly-docs--docs).

### Usage

```tsx
import { ScrollyProvider, useScrolly } from "react-scrolly-telling";

function MyComponent () {
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

function App () {
  return (
    <ScrollyProvider>
      <MyComponent>
    </ScrollyProvider>
  );
}
```
