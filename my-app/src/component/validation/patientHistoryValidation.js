import * as Yup from "yup";

export const getDynamicValidationSchema = (rowId) => {
  return Yup.object().shape({
    [`fullName_${rowId}`]: Yup.string().required("Full Name is required"),
    [`email_${rowId}`]: Yup.string().email("Invalid email").required("Email is required"),
    [`gender_${rowId}`]: Yup.string().required("Select Gender"),
    [`class_${rowId}`]: Yup.string().required("Select Class"),
    [`dob_${rowId}`]: Yup.string().required("Select Date"),
  });
};

