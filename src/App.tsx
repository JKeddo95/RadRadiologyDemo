import { useState } from "react";
import happyPatient from "/happyPatient.svg";
import hearts from "/hearts.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={happyPatient} className="react" alt="Rad Radiology logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={hearts} className="react" alt="Rad Radiology hearts" />
        </a>
      </div>
      <h1>Rad Radiology</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          We help our providers <code>provide</code>!
        </p>
      </div>
    </>
  );
}

export default App;
