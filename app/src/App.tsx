import { useRef } from "react";

import useScrolly from "react-scrolly-telling/useScrolly";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const values = useScrolly(ref, { precision: 3 });

  return (
    <div ref={ref} className="app">
      <pre className="data">{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}

export default App;
