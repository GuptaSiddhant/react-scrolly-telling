import { useRef } from "react";

import useScrolly from "react-scrolly-telling/useScrolly";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const values = useScrolly(ref);

  return (
    <div ref={ref}>
      <h1>Vite + React</h1>
      <div className="card">
        ratio {JSON.stringify(values)}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
