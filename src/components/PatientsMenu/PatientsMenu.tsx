// PatientList.tsx
import React, { useEffect, useState, useRef } from "react";
import { Patient, PATIENTS_LIST } from "../library/usefulConstants";
import "./patientMenu.css";
import exampleScanOne from "/exampleScanOne.jpeg";
import exampleScanTwo from "/exampleScanTwo.jpeg";
import { mockPatientArrayString } from "../library/mocks";

export const PatientsMenu = () => {
  localStorage.setItem(PATIENTS_LIST, mockPatientArrayString);
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
    const newPatientsList = patientsList.filter((patient, index) => !!patient && index !== indexToDelete);
    setPatientsList(newPatientsList);
  };

  const updatePatientAge = (patientNo: number, currentAge: number) => {
    const newAge = prompt(`Update patient age to `, String(currentAge));
    const newPatientsList = [...patientsList];
    newPatientsList[patientNo].age = parseInt(String(newAge)) || currentAge;
    setPatientsList(newPatientsList);
    console.log(`patientslist[${patientNo}].age updated from ${currentAge} to ${newPatientsList[patientNo].age}`);
  };

  const updatePatientName = (patientNo: number, currentName: string) => {
    const newAge = prompt(`Update patient age to `, currentName);
    const newPatientsList = [...patientsList];
    newPatientsList[patientNo].name = newAge || currentName;
    setPatientsList(newPatientsList);
    console.log(`patientslist[${patientNo}].name updated from ${currentName} to ${newPatientsList[patientNo].name}`);
  };

  return (
    <div>
      <h2>List of Patients</h2>
      <AddPatientPopup addPatientToList={addPatientToList} />
      <div>
        {patientsList.map((patient: Patient, patientNo) => (
          <div className={"patientEntry"} key={`${patientNo}_${patient.name}_${patient.age}`}>
            <span className={"patientInfo"}>
              <span>{patientNo + 1}.</span>
              <span onClick={() => updatePatientName(patientNo, patient.name)}> {patient.name}</span>
              <span onClick={() => updatePatientAge(patientNo, patient.age)}>, age {patient.age}</span>
              <span> | </span>
            </span>
            <span onClick={() => console.log("Update Patient Details")}>
              <ManagePatientPopup currentStatus={patient.status} patientNumber={patientNo} />
            </span>
            <span> | </span>
            <span style={{ color: "salmon" }} onClick={() => deletePatient(patientNo)}>
              delete
            </span>
          </div>
        ))}
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

const AddPatientPopup = ({ addPatientToList }: any) => {
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
    addPatientToList({ name: name, age: age, status: "pending review" });
    setName("");
    setAge("");
    toggleDialog();
  };

  return (
    <div>
      <button id="addPatientButton" style={{ marginBottom: "1em" }} onClick={toggleDialog}>
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

const ManagePatientPopup = ({ currentStatus, patientNumber }: any) => {
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

  return (
    <span>
      <span style={{ color: "yellow" }} id="addPatientButton" onClick={toggleDialog}>
        status: {currentStatus}
      </span>
      <dialog id="addPatientModal" ref={dialogRef}>
        <div>
          <div>Patient Scans:</div>
          <img src={patientNumber % 2 === 0 ? exampleScanOne : exampleScanTwo} alt="Patient radiology images"></img>
        </div>
        <button id="addPatientSubmit" onClick={toggleDialog}>
          Cancel
        </button>
      </dialog>
    </span>
  );
};
