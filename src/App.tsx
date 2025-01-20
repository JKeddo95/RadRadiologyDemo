import { useState } from "react";
import happyPatient from "/happyPatient.svg";
import healthMonitor from "/healthMonitor.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={happyPatient} className="logo" alt="Rad Radiology logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={healthMonitor} className="logo" alt="Rad Radiology healthMonitor" />
        </a>
      </div>
      <h1>Rad Radiology</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          <code>Providers</code> and patients first -- Period!
        </p>
      </div>
    </>
  );
}

export default App;
