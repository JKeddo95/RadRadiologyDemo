import happyPatient from "/happyPatient.svg";
import healthMonitor from "/healthMonitor.svg";
import { PatientsMenu } from "./components/PatientsMenu/PatientsMenu.tsx";
import "./App.css";

function App() {
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
        <p>
          Providers and patients first -- <code>Period</code>!
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
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
