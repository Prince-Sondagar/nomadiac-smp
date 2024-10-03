//packages block
import { QueryOptions } from "@apollo/client";
import {
  AccountTree,
  Pages,
  Person,
  Payment,
  Dashboard,
} from "@mui/icons-material";
import { UserRole } from "../generated";
import { mapEnums } from "../utils";
//export
export * from "./countries-states";
// Regex
export const NUMBER_REGEX = /^[0-9]+$/;
export const ALPHABETS_REGEX = /^\b(?!.*?\s{2})[A-Za-z ]{1,}\b$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#=+%&/,><':;|_~`])\S{8,99}$/;
export const NAME_REGEX =
  /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const SPACES_REGEX = /^\S+(?: \S+)*$/;
export const SSN_REGEX = /^\d{3}-\d{2}-\d{4}$/;
export const SSN_REGEX_TYPE_2 = /^\d{2}-\d{7}$/;

//forces the name to be two words long with only one space between
export const FULL_NAME_REGEX = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;

// Apollo messages
export const INVALID_OR_EXPIRED_TOKEN_MESSAGE =
  "Sorry! Your token is expired or invalid";
export const NOT_FOUND_EXCEPTION = "Not Found Exception";
export const CONFLICT_EXCEPTION = "conflict exception";
export const SOMETHING_WENT_WRONG = "Something went wrong";
export const DIMENSION_ALREADY_EXIST = "Dimension already exists";
export const USER_ALREADY_EXIST = "User already exists";
export const PRECONDITION_FAILED_EXCEPTION = "Precondition Failed Exception";
export const REQUEST_NOT_FOUND = "Requests not found for current user";
export const NOT_ACCEPTABLE_EXCEPTION = "not acceptable exception";
export const TOKEN_INVALID = "Token Invalid";
export const TOKEN_NOT_FOUND = "Token not found";
export const UNAUTHORIZED = "Unauthorized";
export const NOMADIC_NETWORK = "nomadic network"
//Token
export const AUTH_TOKEN = "portal_token";
export const PASSWORD = "password";
export const TEXT = "text";
export const RESET_PASSWORD = "Reset password";

//routes
export const LOGIN_ROUTE = "/login";
export const FORGET_PASSWORD_ROUTE = "/forgetPassword";
export const RESET_PASSWORD_ROUTE = "/reset-password";
export const SET_PASSWORD_ROUTE = "/set-password";
export const NETWORK_PAGE_ROUTE = "/network";
export const PAGE_NOT_FOUND_ROUTE = "/page-not-found";
export const PROJECT_ROUTE = "/projects";
export const PROJECT_CREATE_ROUTE = "/project/create";
export const ROOT_ROUTE = "/";
export const USER_ROUTE = "/user";
export const PANEL_ROUTE = "/panels";
export const PAYMENT_REQUEST = "/payment-request";
export const SUPPLIER_ROUTE = "/supplier";
export const COMPLETE_ROUTE = "/complete";
export const TERMINATE_ROUTE = "/terminate";
export const QUOTA_ROUTE = "/quota";
export const SECURITY_ROUTE = "/security-terminate";
export const DASHBOARD_ROUTE = "/dashboard";
export const SURVEY_VERIFY_ROUTE = "/survey/verify";
export const DEFENDER_REVIEW_ROUTE = "/defender-review";
export const SURVEY_HISTORY_ROUTE = "/survey-history"
export const POINT_HISTORY_ROUTE = "/point-history";
//messages
export const INVALID_EMAIL = "Invalid email address";
export const RESET_PASSWORD_SUCCESS = "Password reset successfully";
export const EMAIL_CHANGED_OR_NOT_VERIFIED_MESSAGE =
  "Email changed or not verified, please verify your email";
export const FORBIDDEN_EXCEPTION = "forbidden exception";
export const WRONG_EMAIL_OR_PASSWORD =
  "You have entered wrong email or password";
export const FORGET_PASSWORD_SUCCESS =
  "An email has been sent to your registered email address";
export const NOT_FOUND_EMAIL_MESSAGE = "No user found with this email";
export const RESET_PASSWORD_FAILURE = "Reset password failed";
export const FOLLOW_INSTRUCTIONS =
  "Please follow provided link in email to reset your password";
export const PAGE_NOT_FOUND = "Page Not Found";
export const RESET_FILTERS = "Reset Filters";
export const PASSWORD_VALIDATION_MESSAGE =
  "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character";
export const LOOKS_LIKE_AN_EMPTY_SPACE =
  "Looks like an empty space. You can go back to homepage by clicking the button below";
export const FOUR_O_FOUR = "404";
export const PROJECT = "Projects";
export const OVERVIEW = "Overview";
export const DASHBOARD_TITLE = "Dashboard";
export const USER_TITLE = "Users";
export const PANEL_TITLE = "Panels";
export const PAYMENT_REQUEST_TITLE = "Payment Requests";
export const PAGE_LIMIT = 10;
export const ROLE_EVENT = "role";
export const STATUS_EVENT = "status";
export const USER_STATUS_PLACEHOLDER = "User Status";
export const NONE = "None";
export const USER_ROLE_PLACEHOLDER = "User Role";
export const CANT_DELETE_USER = "This user can't be deleted.";

export const GRAPHQL_QUERY_POLICY = {
  fetchPolicy: "network-only",
  nextFetchPolicy: "no-cache",
  notifyOnNetworkStatusChange: true,
} as unknown as QueryOptions;

export const DRAWER_WIDTH = 300;

export const NAV_LIST_ITEMS = [
  {
    title: DASHBOARD_TITLE,
    link: DASHBOARD_ROUTE,
    Icon: Dashboard,
  },
  {
    title: USER_TITLE,
    link: USER_ROUTE,
    Icon: Person,
  },
  {
    title: PANEL_TITLE,
    link: PANEL_ROUTE,
    Icon: Pages,
  },
  {
    title: PAYMENT_REQUEST_TITLE,
    link: PAYMENT_REQUEST,
    Icon: Payment,
  },
  {
    title: PROJECT,
    Icon: AccountTree,
    link: PROJECT_ROUTE,
  },
];

export const USER_ROLE_OPTION = Object.values(UserRole)
  .filter(
    (value) =>
      ![
        UserRole.SuperAdmin,
        UserRole.Panelist,
        UserRole.Supplier,
        UserRole.Client,
      ].includes(value)
  )
  .map((value) => ({ label: mapEnums(value as UserRole), value }));
