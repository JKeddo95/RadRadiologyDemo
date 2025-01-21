import { useState } from "react";
import happyPatient from "/happyPatient.svg";
import healthMonitor from "/healthMonitor.svg";
import { PatientsMenu } from "./components/PatientsMenu/PatientsMenu.tsx";
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            maxWidth: "60%",
            borderWidth: "2px",
            borderColor: "red",
            marginTop: "3em",
          }}
        >
          <PatientsMenu />
        </div>
      </div>
    </>
  );
}

export default App;
