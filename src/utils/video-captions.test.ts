/* eslint-disable @typescript-eslint/ban-ts-comment */
// @vitest-environment node

import {
  calculateVideoCaptionAnimation,
  calculateVideoCaptionStyle,
} from "./video-captions.js";

describe.concurrent("calculateVideoCaptionAnimation", () => {
  const options = {
    fromTimestamp: 1,
    toTimestamp: 4,
  };

  it("should return opacity with default animation", () => {
    const points = [
      [0, 0],
      [0.75, 0],
      [0.9, 0.3],
      [1, 0.5],
      [1.1, 0.7],
      [1.25, 1],
      [2, 1],
      [3, 1],
      [3.75, 1],
      [3.9, 0.7],
      [4, 0.5],
      [4.1, 0.3],
      [4.25, 0],
      [5, 0],
    ];

    points.forEach(([currentTime, opacity]) => {
      expect(
        calculateVideoCaptionAnimation(undefined, { ...options, currentTime })
      ).toEqual({ opacity });
    });
  });

  it("should return opacity with custom fade animation with duration of 1s", () => {
    const points = [
      [0, 0],
      [0.5, 0],
      [0.75, 0.25],
      [1, 0.5],
      [1.25, 0.75],
      [1.5, 1],
      [2, 1],
      [3, 1],
      [3.5, 1],
      [3.75, 0.75],
      [4, 0.5],
      [4.25, 0.25],
      [4.5, 0],
      [5, 0],
    ];

    points.forEach(([currentTime, opacity]) => {
      expect(
        calculateVideoCaptionAnimation(
          { durationInSeconds: 1, variant: "fade" },
          { ...options, currentTime }
        )
      ).toEqual({ opacity });
    });
  });

  it("unsupported animation variant", () => {
    expect(
      calculateVideoCaptionAnimation(
        // @ts-expect-error
        { durationInSeconds: 1, variant: "unsupported" },
        { ...options, currentTime: 0 }
      )
    ).toBeUndefined();
  });
});

describe.concurrent("calculateVideoCaptionStyle", () => {
  it("default", () => {
    expect(calculateVideoCaptionStyle({})).toMatchInlineSnapshot(`
      {
        "alignItems": "center",
        "bottom": "5vh",
        "boxSizing": "border-box",
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "center",
        "left": "5vw",
        "position": "absolute",
        "right": "5vw",
        "textAlign": "center",
        "top": "5vh",
      }
    `);
  });

  it("different paddings", () => {
    expect(
      calculateVideoCaptionStyle({
        verticalPadding: "10vh",
        horizontalPadding: "20px",
      })
    ).toMatchInlineSnapshot(`
      {
        "alignItems": "center",
        "bottom": "10vh",
        "boxSizing": "border-box",
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "center",
        "left": "20px",
        "position": "absolute",
        "right": "20px",
        "textAlign": "center",
        "top": "10vh",
      }
    `);
  });

  it("different positions", () => {
    [].forEach((position) => {
      expect(calculateVideoCaptionStyle({ position })).toEqual({
        alignItems: "center",
        bottom: "5vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        left: "5vw",
        position: "absolute",
        right: "5vw",
        textAlign: "center",
        top: "5vh",
      });
    });
  });
});
