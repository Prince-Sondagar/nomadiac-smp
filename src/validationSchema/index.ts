import * as yup from "yup";
import {
  ALPHABETS_REGEX,
  PASSWORD_REGEX,
  PASSWORD_VALIDATION_MESSAGE,
  SPACES_REGEX,
} from "../constants";
import { maxLength, minLength, requiredMessage, validMessage } from "../utils";

const emailValidationSchema = {
  email: yup.string().email().required(requiredMessage("Email")),
};

const passwordValidationSchema = {
  password: yup.string().required(requiredMessage("Password")),
};

const passwordAndRepeatPasswordSchema = {
  password: yup
    .string()
    .required(requiredMessage("Password"))
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm your Password"),
};

const firstNameSchema = {
  firstName: yup
    .string()
    .min(2, minLength("First name", 2))
    .max(100, maxLength("First name", 100))
    .matches(SPACES_REGEX, validMessage("First name"))
    .required(requiredMessage("First name")),
};

const lastNameSchema = {
  lastName: yup
    .string()
    .min(2, minLength("Last name", 2))
    .max(100, maxLength("Last name", 100))
    .matches(SPACES_REGEX, validMessage("Last name"))
    .required(requiredMessage("Last name")),
};

export const loginValidationSchema = yup.object({
  ...emailValidationSchema,
  ...passwordValidationSchema,
});

export const forgotPasswordValidationSchema = yup.object({
  ...emailValidationSchema,
});

export const resetPasswordValidationSchema = yup.object({
  ...passwordAndRepeatPasswordSchema,
});

export const updateDemographicValidationSchema = yup.object({
  text: yup
    .string()
    .matches(SPACES_REGEX, validMessage("Demographic name"))
    .min(2, minLength("Demographic name", 2))
    .max(100, maxLength("Demographic name", 100))
    .required(requiredMessage("Demographic name")),
});

export const createQuestionValidationSchema = yup.object({
  name: yup
    .string()
    .matches(SPACES_REGEX, validMessage("Question"))
    .min(2, minLength("Question", 2))
    .max(256, maxLength("Question", 256))
    .required(requiredMessage("Question")),
});

export const registerUserValidationSchema = yup.object({
  ...firstNameSchema,
  ...lastNameSchema,
  ...emailValidationSchema,
});

export const updateUserSchema = yup.object({
  firstName: yup
    .string()
    .min(2, minLength("First name", 2))
    .max(30, maxLength("First name", 30))
    .matches(ALPHABETS_REGEX, "Please add valid first name")
    .required(requiredMessage("First name")),
  lastName: yup
    .string()
    .min(2, minLength("Last name", 2))
    .max(30, maxLength("Last name", 30))
    .matches(ALPHABETS_REGEX, "Please add valid last name")
    .required(requiredMessage("Last name")),
  ...emailValidationSchema,
});

export const changePasswordValidationSchema = yup.object({
  oldPassword: yup.string().required(requiredMessage("Current Password")),
  newPassword: yup
    .string()
    .required(requiredMessage("New Password"))
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required(requiredMessage("Please confirm your password")),
});

export const updateUserRoleSchema = yup.object({
  id: yup.string().required(),
  role: yup.string().required(requiredMessage("This field")),
});

export const supplierDetailsSchema = yup.object().shape({
  surveyEntryLink: yup
    .string()
    .required("Survey Entry Link is Required")
    .matches(/^https?:\/\//, "URL must start with http or https"),
  completeLink: yup
    .string()
    .required("Complete Landing Page is Required")
    .matches(/^https?:\/\//, "URL must start with http or https"),
  terminateLink: yup
    .string()
    .required("Terminate Landing Page is Required")
    .matches(/^https?:\/\//, "URL must start with http or https"),
  quotaFullLink: yup
    .string()
    .required("Quota Landing Page is Required")
    .matches(/^https?:\/\//, "URL must start with http or https"),
  securityLink: yup
    .string()
    .required("Security Landing Page is Required")
    .matches(/^https?:\/\//, "URL must start with http or https"),
  completeCap: yup.string().required("Supplier Complete Cap is Required"),
  cpi: yup.string().required("CPI is Required"),
  offerId: yup.string().nullable().notRequired()
});

export const companyDetailsSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email(),
  clientNumber: yup.number().nullable(),
});

export const supplierUpdateSchema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  completeLink: yup
    .string()
    .test("url_check", (value) => !value || /^https?:\/\//.test(value)),
  terminateLink: yup
    .string()
    .test("url_check", (value) => !value || /^https?:\/\//.test(value)),
  quotaFullLink: yup
    .string()
    .test("url_check", (value) => !value || /^https?:\/\//.test(value)),
  securityLink: yup
    .string()
    .test("url_check", (value) => !value || /^https?:\/\//.test(value)),
});

export const PanelistUpdateSchema = yup.object().shape({
  dob: yup
    .string()
    .required("dob is required")
    .matches(
      /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      "it must be in yyyy-mm-dd format"
    ),
  phone: yup.string(),
  // .required("Phone No is required"),
  gender: yup.string(),
  // required("please select  a gender"),
  address: yup
    .string(),
    // .min(3, "should be 3 chars minimum"),
    // .required("Address is required"),
  city: yup.string(),
  // required("City is required"),
  state: yup.string(),
  // .required("State is required"),
  zipCode: yup.string(),
  // .required("Postal/ZIP is required"),
  comment: yup.string(),
});
