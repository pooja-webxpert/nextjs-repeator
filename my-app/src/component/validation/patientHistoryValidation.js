import * as Yup from "yup";

// Validation for Patient History form
export const PatientHistoryValidation = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().required("Email is required"),
  gender: Yup.string().required("Select Gender"),
  class: Yup.string().required("Select Class"),
  dob: Yup.string().required("Select Date"),
});
