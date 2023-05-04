import { useRef } from "react";
import { ScrollyProvider, useScrolly } from "../../index.js";

function Container({ id }: { id: string }) {
  const ref = useRef(null);
  const result = useScrolly(ref);

  return (
    <div
      id={id}
      ref={ref}
      style={{
        height: "150vh",
        padding: "20px",
        border: "2px solid gray",
        borderTop: "4px solid red",
        borderBottom: "4px solid blue",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export function App() {
  return (
    <ScrollyProvider>
      <div style={{ height: "50vh" }} />
      <Container id={"c1"} />
      <Container id={"c2"} />
      <Container id={"c3"} />
      <Container id={"c4"} />
      <Container id={"c5"} />
      <div style={{ height: "50vh" }} />
    </ScrollyProvider>
  );
}