import Yup from "yup";

export let registerUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .required()
    .trim()
    .max(25, "first name must be 25 character"),
  lastName: Yup.string()
    .required()
    .trim()
    .max(25, "first name must be 25 character"),
  email: Yup.string()
    .email("must be valid")
    .required("email is required")
    .trim()
    .lowercase()
    .max(55, "email must be of 55 character"),
  password: Yup.string()
    .required("password is required")
    .trim()
    .min(4, "password must be minimum 4 character")
    .max(20, "password must be of max 20 character"),
  role: Yup.string().required().trim().lowercase().oneOf(["buyer", "seller"]),
  gender: Yup.string().trim().lowercase().oneOf(["male", "female", "other"]),
  dob: Yup.date(),
});

//login validation

export let loginUserValidationSchema = Yup.object({
  email: Yup.string()
    .email(" email must be valid")
    .required("email is required")
    .trim()
    .lowercase(),

  password: Yup.string().required("password is required").trim(),
});
