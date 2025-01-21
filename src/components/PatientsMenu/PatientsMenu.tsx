// PatientList.tsx
import React, { useEffect, useState, useRef } from "react";
import { Patient, PATIENTS_LIST } from "../library/usefulConstants";
import "./patientMenu.css";

export const PatientsMenu = () => {
  localStorage.setItem(PATIENTS_LIST, `[{"name": "anna", "age": 29}, {"name": "zack", "age": 35}]`);
  const patientsString = localStorage.getItem(PATIENTS_LIST);

  if (!patientsString) {
    console.log("No patients set yet");
    return <></>;
  }

  const [patientsList, setPatientsList] = useState<Patient[]>([]);

  //Initial load+parse is from localStorage, but subsequent values come from "patientsList" react state
  useEffect(() => {
    let patients = parsePatientsList();
    setPatientsList(patients);
  }, []);

  if (!patientsString) {
    console.log("No patients set yet");
    return <></>;
  }

  const addPatientToList = (newPatient: Patient) => {
    const newPatientsList = [...patientsList, newPatient];
    setPatientsList(newPatientsList);
  };

  const deletePatient = (indexToDelete: number) => {
    const newPatientsList = patientsList.filter((patient, index) => index !== indexToDelete);
    setPatientsList(newPatientsList);
  };

  return (
    <div>
      <br />
      <br />
      <h2>List of Patients</h2>
      <div>
        {patientsList.map((patient: Patient, patientNo) => (
          <div className={"patientEntry"} key={`${patientNo}_${patient.name}_${patient.age}`}>
            <span>{patientNo + 1}.</span>
            <span>
              {" "}
              {patient.name}, age {patient.age}
            </span>
            <span> | </span>
            <span style={{ color: "yellow" }} onClick={() => console.log("edit patient")}>
              edit
            </span>
            <span> | </span>
            <span style={{ color: "red" }} onClick={() => deletePatient(patientNo)}>
              delete
            </span>
          </div>
        ))}
        <AddPatientPopup addPatientToList={addPatientToList} deletePatient={deletePatient} />
      </div>
    </div>
  );
};

const parsePatientsList = () => {
  const patientsString = localStorage.getItem(PATIENTS_LIST);
  if (!patientsString) {
    console.log("No patients set yet");
    return false;
  }

  try {
    console.log(`Patients string is the following: ${patientsString}`);
    const parsedList = JSON.parse(String(patientsString));
    console.log(`Parsed list succesfully, type was of ${typeof parsedList}`);
    return parsedList;
  } catch (error) {
    console.warn("Parsing of patients list failed. All children destroyed. Sorry :(");
    return false;
  }
};

const AddPatientPopup = ({ addPatientToList, deletePatient }) => {
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
    addPatientToList({ name: name, age: age });
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
