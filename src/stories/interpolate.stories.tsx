import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import interpolate, {
  Easing,
  type EasingFn,
  type InterpolateOptions,
} from "../interpolate.js";

const component = Form;
type ComponentType = typeof component;

export default {
  title: "Helpers / interpolate",
  component,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    easing: {
      control: { type: "inline-radio" },
      options: Object.keys(Easing),
      mapping: Easing,
    },
  },
  args: {
    easing: Easing.linear,
  },
} satisfies Meta<ComponentType>;

export const Playground: StoryObj<ComponentType> = {
  args: { easing: Easing.linear },
};

// Form

const interpolateOptions: InterpolateOptions = {
  sourceFrom: 0,
  sourceTo: 100,
  targetFrom: 0,
  targetTo: 100,
  precision: 2,
};

function Form({ easing }: { easing: EasingFn }): JSX.Element {
  const [input, setInput] = useState(0);
  const output = interpolate(input, { ...interpolateOptions, easing });

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <div>
        <h4>Easing: {easing.name}</h4>
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          onChange={(e) => setInput(e.currentTarget.valueAsNumber)}
          value={input}
        />
        <br />
        <output>
          <code style={{ display: "flex", justifyContent: "space-between" }}>
            Input: <span>{input}</span>
          </code>
          <code style={{ display: "flex", justifyContent: "space-between" }}>
            Output: <span>{output}</span>
          </code>
        </output>
      </div>
      <LineChart easing={easing} input={input} output={output} />
    </div>
  );
}

function LineChart({
  easing,
  input,
  output,
}: {
  easing: EasingFn;
  input: number;
  output: number;
}) {
  const scale = 3;
  const inputs = Array.from({ length: 100 }, (_, i) => i);

  return (
    <div
      style={{
        width: scale * 100,
        height: scale * 100,
        position: "relative",
        borderLeft: "1px solid black",
        borderBottom: "1px solid black",
      }}
    >
      <span style={{ position: "absolute", left: -10, bottom: -20 }}>0</span>
      <span style={{ position: "absolute", left: -20, top: -20 }}>Output</span>
      <span style={{ position: "absolute", right: -10, bottom: -20 }}>
        Input
      </span>

      {inputs.map((input) => {
        const output = interpolate(input, { ...interpolateOptions, easing });

        return (
          <div
            key={input}
            style={{
              position: "absolute",
              width: scale,
              height: scale,
              background: "cyan",
              left: input * scale,
              bottom: output * scale,
              borderRadius: scale,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          width: scale * 2,
          height: scale * 2,
          background: "red",
          left: input * scale,
          bottom: output * scale,
          borderRadius: scale,
        }}
      />
    </div>
  );
}
