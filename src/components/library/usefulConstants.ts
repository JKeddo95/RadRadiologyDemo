export const PATIENTS_LIST = "PATIENTS_LIST";
export const PATIENT_FIELDS = { name: "name", age: "age", status: "status" };
export type PATIENT_HEALTH_LEVEL = "healthy" | "stable" | "sick" | "pending review";
export type Patient = { name: string; age: number; status: string };
