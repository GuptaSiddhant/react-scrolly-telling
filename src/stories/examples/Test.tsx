import { ScrollyProvider } from "../../index.js";
import ScrollyElement, { useScrollyElementContext } from "../../element.jsx";

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

function Container({ id }: { id: string }) {
  return (
    <ScrollyElement
      id={id}
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
      <ContainerContent />
      <ContainerContent />
      <ContainerContent />
    </ScrollyElement>
  );
}

function ContainerContent() {
  const result = useScrollyElementContext();

  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
