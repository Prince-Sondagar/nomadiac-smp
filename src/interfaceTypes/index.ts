import { Dispatch, ReactNode, SetStateAction } from "react";
import { GridSize, StandardTextFieldProps, TypographyProps } from "@mui/material";
import { GraphQLErrorExtensions } from "graphql";
import { Maybe, User } from "../generated";

export interface ErrorResponseType {
  error: string;
  message: string;
  status: number;
}

export interface ErrorException extends GraphQLErrorExtensions {
  message: string;
  name: string;

  response: {
    error: string;
    message: string;
    status: number;
    response: ErrorResponseType;
  };
}

interface ControlLabelProps {
  controllerLabel: string;
  fieldType?: string;
  error?: string;
  isPassword?: boolean;
  isDisabled?: boolean;
}

export interface CustomControlProps extends ControlLabelProps {
  controllerName: string;
  isMultiLine?: boolean;
  variant?: StandardTextFieldProps['variant'];
  maxLength?: number
}

export type PasswordType = "password" | "text";
type Key = string | number | undefined;

export interface CloseSnackbarProps {
  id: Key;
}
export interface ShowPasswordProps {
  passwordType: string;
  isPassword: boolean | undefined;
  handleShowPassword: () => void;
}
export type multiOptionType = {
  value: string,
  label: string
}

export type stateOptionType = {
  value: string,
  state: string
}

export interface SelectorInterface extends CustomControlProps {
  optionsArray: multiOptionType[],
}
export interface ChildrenType {
  children?: ReactNode;
  setToggle?: Dispatch<SetStateAction<boolean>>
}
export interface AuthContextProps {
  currentUser: User | null;
  setCurrentUser: Dispatch<React.SetStateAction<Maybe<User>>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
  isLoggedIn: boolean
  isLoading: boolean
}
export interface LayoutProps extends ChildrenType {
  title: string;
  subTitle?: string;
  loading?: boolean;
}

export interface ForgotPasswordFormProps {
  emailSent: boolean;
  setEmailSent: Dispatch<SetStateAction<boolean>>;
}

export type ResetPasswordInput = {
  password: string;
  repeatPassword: string;
};

export interface CustomAppBarPropsType {
  appbarshift: string;
}

export interface HeaderPropsType {
  setToggle?: Dispatch<SetStateAction<boolean>>;
  openCustomDrawer: string;
}

export interface DialogTypes {
  isEdit?: boolean;
  refetch?: Function;
  handleClose?: Function;
  isOpen: boolean;
  setOpen?: Function;
}

export interface ModalTypes {
  open?: any;
  handleClos?: Function;
  handleClickOpen: Function;
}
export interface ConfirmationTypes extends DialogTypes {
  isLoading?: boolean;
  title?: string;
  success?: boolean;
  actionText?: string;
  description?: string;
  handleDelete: () => void;
}

export interface EditPaymentRequestTypes extends ModalTypes {
  isLoading?: boolean;
  title?: string;
  open?: any;
  actionText?: string;
  description?: string;
  handleClickOpen: (id: string) => void;
  refreshTable: Function
  setOpenUpdateModal: Dispatch<SetStateAction<string | null>>;
  openUpdateModal: string | null;
}
export interface TableLoaderType {
  numberOfRows: number;
  numberOfColumns: number;
}

export type StatusBoxProps = TypographyProps & {
  borderColor?: string;
}

export interface UserTableProps {
  users: User[];
  isLoading: boolean;
  refreshTable: Function;
}

export interface UserFormPropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refreshList: Function | any;
  name: string;
}

export type ParamsType = {
  id: string;
}

export interface CardComponentType extends ChildrenType {
  cardTitle: string;
  isEdit?: boolean;
  hideSaveIcon?: boolean;
  disableSaveIcon?: boolean;
  disableEditIcon?: boolean;
  hasEdit?: boolean;
  onEditClick?: () => void;
}

export interface ActionLayoutType extends ChildrenType {
  hasBorder: boolean;
}

export interface UpdateRoleInputInterface {
  id: string;
  role: string;
}

export interface UserRoleComponentProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export interface UserStatusInputType {
  userStatus: boolean;
}

export interface DataLoaderInterface {
  rows: number,
  hasMedia: boolean;
  columns: GridSize;
}

export interface ValidateSurveyPayload {
  url: string;
  local: boolean;
}

export interface ResearchDefenderReviewAPIResultType {
  input: {
    similarity_text_length: string,
    text: string,
    q_id: string
  },
  score: {
    similarity_text: number,
    profanity_check: number,
    page_view_time: number,
    engagement_score: number,
    typed_response_time: number,
    pasted_response: number,
    language_detected_score: number,
    composite_score: number,
    garbage_words: number,
    pasted_response_score: number,
    language_detected: string,
    profanity_check_score: number,
    garbage_words_score: number
  }
}

export interface ResearchDefenderReviewAPIPayload {
  results: ResearchDefenderReviewAPIResultType[]
}