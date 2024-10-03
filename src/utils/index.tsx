//packages block
import { ReactNode } from "react";
import { Typography, colors } from "@mui/material";
//others block
import client from "../apollo";
import { AUTH_TOKEN } from "../constants";
import { Maybe, PanelistReviewStatus, PaymentWithdrawalStatus, SurveyResultStatus, SurveySource, UserRole } from "../generated";
import { ResearchDefenderReviewAPIPayload, ResearchDefenderReviewAPIResultType, stateOptionType } from "../interfaceTypes";

export const handleLogout = () => {
  removeToken();
  client.clearStore();
  window.location.reload();
};

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token: string) => {
  return localStorage.setItem(AUTH_TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const requiredMessage = (fieldName: string) => `${fieldName} is required.`;
export const exampleMessage = (e: string) => `i.e ${e}`;
export const validMessage = (fieldName: string, example?: string) => `Please enter valid ${fieldName.toLowerCase()}. ${example ? exampleMessage(example) : ""}`;
export const maxLength = (fieldName: string, length: number) => `${fieldName} can be up to ${length} characters long.`;
export const minLength = (fieldName: string, length: number) => `${fieldName} should be at least ${length} characters long.`;

export const toTitleCase = (toTransform: string) => {
  return toTransform.replace(/\b([a-z])/g, function (_, initial) {
    return initial.toUpperCase();
  });
};

export const getColorForPaymentRequestStatus = (status: PaymentWithdrawalStatus) => {
  switch (status) {
    case PaymentWithdrawalStatus.Delivered:
      return "success";
    case PaymentWithdrawalStatus.Cancelled:
      return "primary";
    case PaymentWithdrawalStatus.Requested:
      return "info";
  }
};

export const formatDate = (date: Date | string | number) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const capitalizeFirstLetter = (item: string) => item.charAt(0).toUpperCase() + item.toLowerCase().slice(1);

export const mapEnums = (role: UserRole | undefined | Maybe<PanelistReviewStatus> | SurveySource | SurveyResultStatus): string => {
  return toTitleCase(String(role || '')?.toLocaleLowerCase()?.split("_")?.join(" "));
};

export const renderUserRoleColor = (role: UserRole | undefined): string => {
  switch (role) {
    case UserRole.SuperAdmin:
      return colors.orange[400]

    case UserRole.Admin:
      return colors.green[400]

    case UserRole.Manager:
      return colors.yellow[700]

    case UserRole.Supplier:
      return colors.blue[400]

    default:
      return colors.grey[700]
  }
};

export const renderItem = (
  name: string,
  value: Maybe<string> | number | ReactNode | undefined,
  noWrap?: boolean,
) => (
  <>
    <Typography variant="body2">{name}</Typography>
    <Typography component="h5" variant="h5" noWrap={noWrap}>
      {value}
    </Typography>
  </>
);

export const sortStates = (statesArray: stateOptionType[]) => statesArray.sort((stateA, stateB) => stateA.state.localeCompare(stateB.state));

export const defenderReviewAPI = async (text: string, panelistId: string): Promise<ResearchDefenderReviewAPIResultType | undefined> => {
  try {
    const response = await fetch(`https://prod.rtymgt.com/api/v4/respondents/review/a5d5fb63-dbfe-489c-9556-40d4d3506d1a?q_id=${panelistId}&text=${text}`)
    const data: ResearchDefenderReviewAPIPayload = await response.json();
    const { results } = data
    const [resultItem] = results
    return resultItem
  }
  catch (error) {
    console.log("error", "error")
  }
};