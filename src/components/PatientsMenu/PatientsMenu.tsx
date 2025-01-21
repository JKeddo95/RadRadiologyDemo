// PatientList.tsx
import React, { useEffect, useState, useRef } from "react";
import { Patient, PATIENTS_LIST } from "../library/usefulConstants";

export const PatientsMenu = () => {
  localStorage.setItem(PATIENTS_LIST, `[{"name": "anna", "age": 2}, {"name": "zack", "age": 3}]`);
  const patientsString = localStorage.getItem(PATIENTS_LIST);

  if (!patientsString) {
    console.log("No patients set yet");
    return <></>;
  }

  //   const [name, setName] = useState("");
  //   const [age, setAge] = useState("");
  const [patientsList, setPatientsList] = useState([]);

  useEffect(() => {
    const patientsString = localStorage.getItem(PATIENTS_LIST);

    if (!patientsString) {
      console.log("No patients set yet");
      //result false;
    }

    let patients;
    try {
      console.log(`Patients string is the following: ${patientsString}`);
      patients = JSON.parse(String(patientsString));
      setPatientsList(patients);
    } catch (error) {
      console.warn("Parsing of patients list failed. All children destroyed. Sorry :(");
      //result false;
    }
  }, []);

  //   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  //   const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value);

  //   const dialogComponent = (
  //     <dialog id="addPatientModal" ref={dialogRef}>
  //       <div>Add Patient</div>
  //       <span>Name: </span>
  //       <input value={name} onChange={handleNameChange} />
  //       <span>Age: </span>
  //       <input value={String(age)} onChange={handleAgeChange} />
  //       <button id="addPatientSubmit" onClick={toggleDialog}>
  //         Submit
  //       </button>
  //     </dialog>
  //   );

  if (!patientsString) {
    console.log("No patients set yet");
    return <></>;
  }

  return (
    <div>
      <br />
      <br />
      <h2>List of Patients</h2>
      <div>
        {/* <div>
          <button id="addPatientButton" onClick={toggleDialog}>
            Add Patient
          </button>
        </div> */}
        {patientsList.map((patient: Patient) => (
          <div style={{ float: "left" }} key={patient.name}>
            <span>
              {" "}
              {patient.name}, age {patient.age}
            </span>
            <span> | </span>
            <span style={{ color: "yellow" }} onClick={() => console.log("edit patient")}>
              edit
            </span>
            <span> | </span>
            <span style={{ color: "red" }} onClick={() => console.log("delete patient")}>
              delete
            </span>
          </div>
        ))}
        <AddPatientPopup />
      </div>
    </div>
  );
};

const AddPatientPopup = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const toggleDialog = () => {
    if (dialogRef === null || !dialogRef?.current?.hasAttribute) {
      return false;
    }
    try {
      dialogRef.current.hasAttribute("open") ? dialogRef.current.close() : dialogRef.current.showModal();
    } catch (e) {
      console.warn("There was a problem toggling the AddPatient popup/dialog, errMessage: ", JSON.stringify(e));
    }
  };

  const submitDialog = () => {
    console.log(`Adding patient with age ${age} and name ${name}`);
    setName("");
    setAge("");
    toggleDialog();
  };

  return (
    <div>
      <button id="addPatientButton" onClick={toggleDialog}>
        Add Patient
      </button>
      <dialog id="addPatientModal" ref={dialogRef}>
        <div>Add Patient</div>
        <div>
          <span>Name: </span>
          <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          {" "}
          <span>Age: </span> <input value={String(age)} onChange={handleAgeChange} />
        </div>
        <button id="addPatientSubmit" onClick={submitDialog}>
          Submit
        </button>
      </dialog>
    </div>
  );
};
