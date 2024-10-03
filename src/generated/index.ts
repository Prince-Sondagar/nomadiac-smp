import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AccessUserPayload = {
  __typename?: 'AccessUserPayload';
  access_token?: Maybe<Scalars['String']>;
  response?: Maybe<ResponsePayload>;
  roles?: Maybe<Array<Role>>;
};

export type AddQuotaGroupsToProject = {
  id: Scalars['String'];
  quotaGroup: Array<CreateProjectQuotaGroupInput>;
};

export type Attachment = {
  __typename?: 'Attachment';
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  type: AttachmentType;
  typeId: Scalars['String'];
  updatedAt: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type AttachmentMediaPayload = {
  __typename?: 'AttachmentMediaPayload';
  preSignedUrl?: Maybe<Scalars['String']>;
  response?: Maybe<ResponsePayload>;
};

export type AttachmentPayload = {
  __typename?: 'AttachmentPayload';
  attachment?: Maybe<Attachment>;
  response?: Maybe<ResponsePayload>;
};

/** The type is assigned */
export enum AttachmentType {
  Panelist = 'PANELIST'
}

export type AttachmentsPayload = {
  __typename?: 'AttachmentsPayload';
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  pagination?: Maybe<PaginationPayload>;
  response?: Maybe<ResponsePayload>;
};

export type BulkUpdatePaymentWithdrawalRequest = {
  paymentWithdrawalRequestIds: Array<InputMaybe<Scalars['String']>>;
  paymentWithdrawalRequestStatuses: Array<InputMaybe<PaymentWithdrawalStatus>>;
};

export type BulkUpdatePaymentWithdrawalsPayload = {
  __typename?: 'BulkUpdatePaymentWithdrawalsPayload';
  errors: Array<Maybe<Scalars['String']>>;
  response?: Maybe<ResponsePayload>;
};

export type Company = {
  __typename?: 'Company';
  clientNumber?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  project: Array<Maybe<Project>>;
  updatedAt: Scalars['String'];
};

export type CompanyPayload = {
  __typename?: 'CompanyPayload';
  company?: Maybe<Company>;
  response?: Maybe<ResponsePayload>;
};

export type ContinueTakingLucidSurvey = {
  panelistId: Scalars['String'];
};

/** The project lifecycle */
export enum CpiHistoryType {
  Client = 'CLIENT',
  Supplier = 'SUPPLIER'
}

export type CreateAttachmentInput = {
  description?: InputMaybe<Scalars['String']>;
  /** enum type for module type - Upload Media */
  type: AttachmentType;
  typeId: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type CreateBulkSignupSurveyResponseInput = {
  answer?: InputMaybe<Scalars['String']>;
  question: Scalars['String'];
};

export type CreateCompanyInput = {
  clientNumber?: InputMaybe<Scalars['Float']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateCpiInput = {
  cpi: Scalars['String'];
  type: CpiHistoryType;
  typeId: Scalars['String'];
};

export type CreatePaymentWithdrawalRequest = {
  panelistId: Scalars['String'];
  points: Scalars['String'];
  type?: InputMaybe<PaymentWithdrawalType>;
};

export type CreateProjectInput = {
  clientId?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  methodology?: InputMaybe<ProjectMethodology>;
  projectUsers: Array<CreateProjectUserInput>;
  quotaGroup: Array<CreateProjectQuotaGroupInput>;
  security?: InputMaybe<ProjectSecurity>;
  title: Scalars['String'];
};

export type CreateProjectQuotaGroupInput = {
  completeCap?: InputMaybe<Scalars['String']>;
  completeCapLeft?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  quotaIds: Array<Scalars['String']>;
  suppliers: Array<CreateSupplierQuotaGroupInput>;
  surveyEntryLink?: InputMaybe<Scalars['String']>;
};

export type CreateProjectUserInput = {
  isHeadManager?: InputMaybe<Scalars['Boolean']>;
  isSalesManager?: InputMaybe<Scalars['Boolean']>;
  projectId?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type CreateSignupSurveyResponse = {
  panelistId: Scalars['String'];
  responses: Array<CreateBulkSignupSurveyResponseInput>;
};

export type CreateSupplierInput = {
  companyName: Scalars['String'];
  completeLink?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  quotaFullLink?: InputMaybe<Scalars['String']>;
  securityLink?: InputMaybe<Scalars['String']>;
  terminateLink?: InputMaybe<Scalars['String']>;
};

export type CreateSupplierQuotaGroupInput = {
  completeCap?: InputMaybe<Scalars['String']>;
  completeLink?: InputMaybe<Scalars['String']>;
  cpi?: InputMaybe<Scalars['String']>;
  offerId?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['String']>;
  quotaFullLink?: InputMaybe<Scalars['String']>;
  quotaGroupId?: InputMaybe<Scalars['String']>;
  securityLink?: InputMaybe<Scalars['String']>;
  supplierCompleteCapLeft?: InputMaybe<Scalars['String']>;
  supplierId: Scalars['String'];
  surveyEntryLink?: InputMaybe<Scalars['String']>;
  terminateLink?: InputMaybe<Scalars['String']>;
};

export type FetchAllQuotaGroupsInput = {
  projectId: Scalars['String'];
};

export type FetchAllQuotasInput = {
  type: QuotaType;
};

export type FetchCompaniesInput = {
  paginationOptions: PaginationInput;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type FetchCompaniesPayload = {
  __typename?: 'FetchCompaniesPayload';
  companies: Array<Maybe<Company>>;
  pagination?: Maybe<PaginationPayload>;
  response?: Maybe<ResponsePayload>;
};

export type FetchCpiStatsPayload = {
  __typename?: 'FetchCpiStatsPayload';
  netProfit?: Maybe<Scalars['Float']>;
  response?: Maybe<ResponsePayload>;
  revenue?: Maybe<Scalars['Float']>;
};

export type FetchDashboardPayload = {
  __typename?: 'FetchDashboardPayload';
  activePanelists: Scalars['Float'];
  panelistsCountByCountryGraphData: Array<Maybe<FetchPanelistByCountry>>;
  panelistsCountByDayGraphData: Array<Maybe<FetchPanelistByDay>>;
  response?: Maybe<ResponsePayload>;
};

export type FetchFusionSurveyInput = {
  panelistId: Scalars['String'];
};

export type FetchFusionSurveyPayload = {
  __typename?: 'FetchFusionSurveyPayload';
  memberId: Scalars['String'];
  respondentId: Scalars['String'];
  response?: Maybe<ResponsePayload>;
  surveys: Array<Maybe<FusionSurveyType>>;
};

export type FetchLucidSurveyForPanelistInput = {
  paginationOptions: PaginationInput;
  panelistId: Scalars['String'];
};

export type FetchLucidSurveyPayload = {
  __typename?: 'FetchLucidSurveyPayload';
  pagination?: Maybe<PaginationPayload>;
  response?: Maybe<ResponsePayload>;
  surveys: Array<Maybe<LucidSurvey>>;
};

export type FetchPanelistByCountry = {
  __typename?: 'FetchPanelistByCountry';
  count?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export type FetchPanelistByDay = {
  __typename?: 'FetchPanelistByDay';
  count?: Maybe<Scalars['String']>;
  day?: Maybe<Scalars['DateTime']>;
};

export type FetchPanelistByUserIdInput = {
  userId: Scalars['String'];
};

export type FetchPanelistInput = {
  id: Scalars['String'];
};

export type FetchPanelistPayload = {
  __typename?: 'FetchPanelistPayload';
  pagination?: Maybe<PaginationPayload>;
  panelists: Array<Maybe<Panelist>>;
  response?: Maybe<ResponsePayload>;
};

export type FetchPanelistPointHistory = {
  paginationOptions: PaginationInput;
  panelistId?: InputMaybe<Scalars['String']>;
};

export type FetchPanelistsInput = {
  country?: InputMaybe<Scalars['String']>;
  /** format: 2023-05-04 00:00 */
  from?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<UserGender>;
  id?: InputMaybe<Scalars['String']>;
  paginationOptions: PaginationInput;
  panelistReviewStatus?: InputMaybe<PanelistReviewStatus>;
  panelistType?: InputMaybe<UserRole>;
  searchQuery?: InputMaybe<Scalars['String']>;
  signupSource?: InputMaybe<PanelistSignupSource>;
  state?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<UserStatus>;
  /** format: 2023-05-04 00:00 */
  to?: InputMaybe<Scalars['String']>;
};

export type FetchPaymentWithdrawalsInput = {
  paginationOptions: PaginationInput;
  panelistId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<PaymentWithdrawalStatus>;
};

export type FetchProjectResults = {
  paginationOptions: PaginationInput;
  panelistId?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['String']>;
  quotaGroupId?: InputMaybe<Scalars['String']>;
  supplierId?: InputMaybe<Scalars['String']>;
};

export type FetchProjectSuppliersInput = {
  projectId: Scalars['String'];
};

export type FetchProjectsInput = {
  lifecycle?: InputMaybe<ProjectLifecycle>;
  methodology?: InputMaybe<ProjectMethodology>;
  paginationOptions: PaginationInput;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type FetchQuotaGroupsPayload = {
  __typename?: 'FetchQuotaGroupsPayload';
  pagination?: Maybe<PaginationPayload>;
  quotaGroup: Array<Maybe<QuotaGroup>>;
  response?: Maybe<ResponsePayload>;
};

export type FetchQuotaPayload = {
  __typename?: 'FetchQuotaPayload';
  pagination?: Maybe<PaginationPayload>;
  quota: Array<Maybe<Quota>>;
  response?: Maybe<ResponsePayload>;
};

export type FetchSuppliersInput = {
  paginationOptions: PaginationInput;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type FetchSuppliersPayload = {
  __typename?: 'FetchSuppliersPayload';
  pagination?: Maybe<PaginationPayload>;
  response?: Maybe<ResponsePayload>;
  suppliers: Array<Maybe<Supplier>>;
};

export type FetchSurveyResultById = {
  id: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
  platform?: InputMaybe<Platform>;
};

export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  response?: Maybe<ResponsePayload>;
};

export type FusionSurveyType = {
  __typename?: 'FusionSurveyType';
  cpi: Scalars['Float'];
  entryLink: Scalars['String'];
  estimatedLoi: Scalars['Float'];
  fullOrPartialMatch: SurveyMatch;
  surveyId: Scalars['String'];
};

export type GetAttachment = {
  typeId: Scalars['String'];
};

export type GetMedia = {
  id?: InputMaybe<Scalars['String']>;
};

export type GetUser = {
  id: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LucidSurvey = {
  __typename?: 'LucidSurvey';
  conversionRate: Scalars['Float'];
  cpi: Scalars['Float'];
  createdAt: Scalars['String'];
  forCountry: Scalars['String'];
  id: Scalars['String'];
  industry?: Maybe<Scalars['String']>;
  interviewLength: Scalars['Float'];
  quotaLeft: Scalars['Float'];
  surveyId: Scalars['String'];
  surveyQualification?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateUser: UserPayload;
  addQuotaGroupsToProject: ProjectPayload;
  addSupplierToQuotaGroup: SupplierToQuotaGroupPayload;
  bulkUpdatePaymentWithdrawalRequest: BulkUpdatePaymentWithdrawalsPayload;
  continueTakingLucidSurvey: ValidateSurveyPayload;
  createAttachmentData: AttachmentPayload;
  createCompany: CompanyPayload;
  createCpi: ProjectPayload;
  createMobilePanelist: PanelistPayload;
  createPanelist: PanelistPayload;
  createProject: ProjectPayload;
  createProjectUser: ProjectUserPayload;
  createSignupSurveyResponses: PanelistPayload;
  createSupplier: SupplierPayload;
  createWithdrawalRequest: PaymentWithdrawalPayload;
  deactivateUser: UserPayload;
  forgotPassword: ForgotPasswordPayload;
  generateOtp: ResponsePayloadResponse;
  login: AccessUserPayload;
  registerUser: UserPayload;
  removeAttachmentData: AttachmentPayload;
  removeCompany: CompanyPayload;
  removePanelist: PanelistPayload;
  removePaymentWithdrawals: PaymentWithdrawalPayload;
  removeProject: ProjectPayload;
  removeProjectUser: ProjectPayload;
  removeQuotaGroup: QuotaGroupPayload;
  removeSupplier: SupplierPayload;
  removeSupplierFromQuotaGroup: SupplierToQuotaGroupPayload;
  removeSurveyResults: ProjectResultPayload;
  removeUser: UserPayload;
  resendVerificationEmail: UserPayload;
  resetPassword: UserPayload;
  updateAttachmentData: AttachmentPayload;
  updateCompany: CompanyPayload;
  updatePanelist: PanelistPayload;
  updatePassword: UserPayload;
  updatePaymentWithdrawals: PaymentWithdrawalPayload;
  updateProject: ProjectPayload;
  updateProjectUser: ProjectPayload;
  updateQuotaGroup: QuotaGroupPayload;
  updateRole: UserPayload;
  updateSupplier: SupplierPayload;
  updateSupplierQuotaGroup: SupplierToQuotaGroupPayload;
  updateSurveyResultWithIdReConciliation: ProjectResultPayload;
  updateSurveyResults: ProjectResultPayload;
  updateUser: UserPayload;
  validateLucidSurvey: ValidateSurveyPayload;
  verifyEmail: UserPayload;
  verifyEmailAndSetPassword: UserPayload;
  verifyOtp: ResponsePayloadResponse;
  verifyPanelistEmailAndSetPassword: ResponsePayloadResponse;
};


export type MutationActivateUserArgs = {
  user: UserIdInput;
};


export type MutationAddQuotaGroupsToProjectArgs = {
  projectInput: AddQuotaGroupsToProject;
};


export type MutationAddSupplierToQuotaGroupArgs = {
  createSupplierQuotaGroupInput: CreateSupplierQuotaGroupInput;
};


export type MutationBulkUpdatePaymentWithdrawalRequestArgs = {
  bulkUpdatePaymentWithdrawalRequest: BulkUpdatePaymentWithdrawalRequest;
};


export type MutationContinueTakingLucidSurveyArgs = {
  continueTakingLucidSurvey: ContinueTakingLucidSurvey;
};


export type MutationCreateAttachmentDataArgs = {
  createAttachmentInput: CreateAttachmentInput;
};


export type MutationCreateCompanyArgs = {
  companyInput: CreateCompanyInput;
};


export type MutationCreateCpiArgs = {
  cpiInput: CreateCpiInput;
};


export type MutationCreateMobilePanelistArgs = {
  registerPanelistInput: RegisterPanelistMobileInput;
};


export type MutationCreatePanelistArgs = {
  registerPanelistInput: RegisterPanelistInput;
};


export type MutationCreateProjectArgs = {
  projectInput: CreateProjectInput;
};


export type MutationCreateProjectUserArgs = {
  projectInput: CreateProjectUserInput;
};


export type MutationCreateSignupSurveyResponsesArgs = {
  createSignupSurveyResponses: CreateSignupSurveyResponse;
};


export type MutationCreateSupplierArgs = {
  supplierInput: CreateSupplierInput;
};


export type MutationCreateWithdrawalRequestArgs = {
  createPaymentWithdrawalRequest: CreatePaymentWithdrawalRequest;
};


export type MutationDeactivateUserArgs = {
  user: UserIdInput;
};


export type MutationForgotPasswordArgs = {
  forgotPassword: ForgotPasswordInput;
};


export type MutationGenerateOtpArgs = {
  generateOtpInput: SendOtpToPanelistCodeInput;
};


export type MutationLoginArgs = {
  loginUser: LoginUserInput;
};


export type MutationRegisterUserArgs = {
  user: RegisterUserInput;
};


export type MutationRemoveAttachmentDataArgs = {
  removeAttachment: RemoveAttachment;
};


export type MutationRemoveCompanyArgs = {
  companyInput: RemoveCompanyInput;
};


export type MutationRemovePanelistArgs = {
  removePanelistInput: RemovePanelistInput;
};


export type MutationRemovePaymentWithdrawalsArgs = {
  paymentWithdrawalInput: RemovePaymentWithdrawalRequest;
};


export type MutationRemoveProjectArgs = {
  project: ProjectIdInput;
};


export type MutationRemoveProjectUserArgs = {
  project: ProjectIdInput;
};


export type MutationRemoveQuotaGroupArgs = {
  removeQuotaGroupInput: RemoveQuotaGroupInput;
};


export type MutationRemoveSupplierArgs = {
  supplierInput: RemoveSupplierInput;
};


export type MutationRemoveSupplierFromQuotaGroupArgs = {
  removeSupplierToQuotaGroup: RemoveSupplierQuotaGroupInput;
};


export type MutationRemoveSurveyResultsArgs = {
  projectResult: ProjectResultIdInput;
};


export type MutationRemoveUserArgs = {
  user: UserIdInput;
};


export type MutationResendVerificationEmailArgs = {
  resendVerificationEmail: ResendVerificationEmail;
};


export type MutationResetPasswordArgs = {
  resetPassword: ResetPasswordInput;
};


export type MutationUpdateAttachmentDataArgs = {
  updateAttachmentInput: UpdateAttachmentInput;
};


export type MutationUpdateCompanyArgs = {
  companyInput: UpdateCompanyInput;
};


export type MutationUpdatePanelistArgs = {
  updatePanelistInput: UpdatePanelistInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdatePaymentWithdrawalsArgs = {
  paymentWithdrawalInput: UpdatePaymentWithdrawalRequest;
};


export type MutationUpdateProjectArgs = {
  projectInput: UpdateProjectInput;
};


export type MutationUpdateProjectUserArgs = {
  projectInput: UpdateProjectUserInput;
};


export type MutationUpdateQuotaGroupArgs = {
  updateQuotaGroupInput: UpdateQuotaGroupInput;
};


export type MutationUpdateRoleArgs = {
  user: UpdateRoleInput;
};


export type MutationUpdateSupplierArgs = {
  supplierInput: UpdateSupplierInput;
};


export type MutationUpdateSupplierQuotaGroupArgs = {
  updateSupplierQuotaGroupInput: UpdateSupplierQuotaGroupInput;
};


export type MutationUpdateSurveyResultWithIdReConciliationArgs = {
  projectResult: UpdateSurveyResultWithIdReConciliationInput;
};


export type MutationUpdateSurveyResultsArgs = {
  projectResult: UpdateProjectResultStatusInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};


export type MutationValidateLucidSurveyArgs = {
  validateLucidSurveyInput: ValidateLucidSurveyInput;
};


export type MutationVerifyEmailArgs = {
  verifyEmail: VerifyEmailInput;
};


export type MutationVerifyEmailAndSetPasswordArgs = {
  verifyEmailAndSetPassword: VerifyUserAndUpdatePasswordInput;
};


export type MutationVerifyOtpArgs = {
  verifyOtpInput: VerifyOtpInput;
};


export type MutationVerifyPanelistEmailAndSetPasswordArgs = {
  verifyPanelistEmailAndSetPasswordInput: VerifyUserAndUpdatePasswordInput;
};

/** The application platform */
export enum Platform {
  MobileApp = 'MOBILE_APP',
  Web = 'WEB'
}

export type PaginationInput = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type PaginationPayload = {
  __typename?: 'PaginationPayload';
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type Panelist = {
  __typename?: 'Panelist';
  address?: Maybe<Scalars['String']>;
  attachments: Array<Maybe<Attachment>>;
  availablePoints?: Maybe<Scalars['Float']>;
  blockPromotions?: Maybe<Scalars['Boolean']>;
  city?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  dob?: Maybe<Scalars['String']>;
  fraudScore: Scalars['Float'];
  gender?: Maybe<UserGender>;
  id: Scalars['String'];
  ipAddress?: Maybe<Scalars['String']>;
  lucidProfileCompleted: Scalars['Boolean'];
  maxMindScore?: Maybe<Scalars['Float']>;
  memberId?: Maybe<Scalars['String']>;
  panelistReviewStatus?: Maybe<PanelistReviewStatus>;
  paymentWithdrawals: Array<Maybe<PaymentWithdrawal>>;
  phone?: Maybe<Scalars['String']>;
  pointHistory: Array<Maybe<PointHistory>>;
  pointsWithdrawn?: Maybe<Scalars['Float']>;
  privacyPolicy?: Maybe<Scalars['Boolean']>;
  scamalyticsScore: Scalars['Float'];
  signupSource?: Maybe<PanelistSignupSource>;
  signupSurveyResponse: Array<Maybe<SignupSurveyResponse>>;
  state?: Maybe<Scalars['String']>;
  termsAndConditions?: Maybe<Scalars['Boolean']>;
  timezone?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['String'];
  verifyTokenExpired?: Maybe<Scalars['Boolean']>;
  zipCode?: Maybe<Scalars['String']>;
};

export type PanelistPayload = {
  __typename?: 'PanelistPayload';
  panelist?: Maybe<Panelist>;
  response?: Maybe<ResponsePayload>;
};

/** PanelistReviewStatus */
export enum PanelistReviewStatus {
  Approved = 'APPROVED',
  Blocked = 'BLOCKED',
  Pending = 'PENDING',
  UpdateNeeded = 'UPDATE_NEEDED'
}

/** PanelistSignupSource */
export enum PanelistSignupSource {
  Cake = 'CAKE',
  ClickWorks = 'CLICK_WORKS',
  Manual = 'MANUAL',
  Panthera = 'PANTHERA'
}

export type PaymentWithdrawal = {
  __typename?: 'PaymentWithdrawal';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  panelist?: Maybe<Panelist>;
  panelistId: Scalars['String'];
  points: Scalars['String'];
  status: PaymentWithdrawalStatus;
  type?: Maybe<PaymentWithdrawalType>;
  updatedAt: Scalars['String'];
};

export type PaymentWithdrawalPayload = {
  __typename?: 'PaymentWithdrawalPayload';
  paymentWithdrawal?: Maybe<PaymentWithdrawal>;
  response?: Maybe<ResponsePayload>;
};

/** Payment Withdrawal Status */
export enum PaymentWithdrawalStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  DeliveryFailed = 'DELIVERY_FAILED',
  Requested = 'REQUESTED'
}

/** Payment Withdrawal Type */
export enum PaymentWithdrawalType {
  GiftCard = 'GIFT_CARD',
  Paypal = 'PAYPAL'
}

export type PaymentWithdrawalsPayload = {
  __typename?: 'PaymentWithdrawalsPayload';
  pagination?: Maybe<PaginationPayload>;
  paymentWithdrawals: Array<Maybe<PaymentWithdrawal>>;
};

export type PointHistoriesPayload = {
  __typename?: 'PointHistoriesPayload';
  pagination?: Maybe<PaginationPayload>;
  pointHistory: Array<Maybe<PointHistory>>;
};

export type PointHistory = {
  __typename?: 'PointHistory';
  createdAt: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  panelist?: Maybe<Panelist>;
  panelistId: Scalars['String'];
  points: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  archive: Scalars['Boolean'];
  client?: Maybe<Company>;
  clientId?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  createdAt: Scalars['String'];
  dataQuality: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  lifecycle?: Maybe<ProjectLifecycle>;
  methodology?: Maybe<ProjectMethodology>;
  projectUsers: Array<Maybe<ProjectUser>>;
  quotaGroup?: Maybe<Array<Maybe<QuotaGroup>>>;
  security?: Maybe<ProjectSecurity>;
  surveyResult: Array<Maybe<SurveyResult>>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProjectIdInput = {
  id: Scalars['String'];
};

/** The project lifecycle */
export enum ProjectLifecycle {
  Closes = 'CLOSES',
  Open = 'OPEN'
}

/** The project methodology */
export enum ProjectMethodology {
  Cati = 'CATI',
  Facetoface = 'FACETOFACE',
  Online = 'ONLINE'
}

export type ProjectPayload = {
  __typename?: 'ProjectPayload';
  project?: Maybe<Project>;
  response?: Maybe<ResponsePayload>;
};

export type ProjectResultIdInput = {
  id: Scalars['String'];
};

export type ProjectResultPayload = {
  __typename?: 'ProjectResultPayload';
  projectResult?: Maybe<SurveyResult>;
  response?: Maybe<ResponsePayload>;
};

/** The project security */
export enum ProjectSecurity {
  High = 'HIGH',
  Low = 'LOW'
}

export type ProjectUser = {
  __typename?: 'ProjectUser';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  isHeadManager?: Maybe<Scalars['Boolean']>;
  isSalesManager?: Maybe<Scalars['Boolean']>;
  projectId: Scalars['String'];
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type ProjectUserPayload = {
  __typename?: 'ProjectUserPayload';
  projectUser?: Maybe<ProjectUser>;
  response?: Maybe<ResponsePayload>;
};

export type ProjectsPayload = {
  __typename?: 'ProjectsPayload';
  pagination?: Maybe<PaginationPayload>;
  projects: Array<Maybe<Project>>;
  response?: Maybe<ResponsePayload>;
};

export type ProjectsResultsPayload = {
  __typename?: 'ProjectsResultsPayload';
  pagination?: Maybe<PaginationPayload>;
  response?: Maybe<ResponsePayload>;
  results: Array<Maybe<SurveyResult>>;
};

export type Query = {
  __typename?: 'Query';
  fetchAllCompanies: FetchCompaniesPayload;
  fetchAllPanelists: FetchPanelistPayload;
  fetchAllProjects: ProjectsPayload;
  fetchAllQuotas: FetchQuotaPayload;
  fetchAllRoles: RolesPayload;
  fetchAllSuppliers: FetchSuppliersPayload;
  fetchAllUsers: UsersPayload;
  fetchCpiStats: FetchCpiStatsPayload;
  fetchDashboardData: FetchDashboardPayload;
  fetchLucidSurveys: FetchLucidSurveyPayload;
  fetchPanelist: PanelistPayload;
  fetchPanelistByUserId: PanelistPayload;
  fetchPanelistFusionSurvey: FetchFusionSurveyPayload;
  fetchPanelistPointHistory: PointHistoriesPayload;
  fetchPaymentWithdrawals: PaymentWithdrawalsPayload;
  fetchProject: ProjectPayload;
  fetchProjectQuotaGroups: FetchQuotaGroupsPayload;
  fetchProjectStats: SubmissionStatsPayload;
  fetchProjectSuppliers: FetchSuppliersPayload;
  fetchSurveyResultById: SurveyResultPayload;
  fetchSurveyResults: ProjectsResultsPayload;
  fetchUser: UserPayload;
  getAttachment: AttachmentMediaPayload;
  getAttachments: AttachmentsPayload;
  getUser: UserPayload;
  me: UserPayload;
  searchUser: UsersPayload;
};


export type QueryFetchAllCompaniesArgs = {
  companiesInput: FetchCompaniesInput;
};


export type QueryFetchAllPanelistsArgs = {
  fetchPanelistsInput: FetchPanelistsInput;
};


export type QueryFetchAllProjectsArgs = {
  projectInput: FetchProjectsInput;
};


export type QueryFetchAllQuotasArgs = {
  fetchAllQuotasInput: FetchAllQuotasInput;
};


export type QueryFetchAllSuppliersArgs = {
  suppliersInput: FetchSuppliersInput;
};


export type QueryFetchAllUsersArgs = {
  userInput: UsersInput;
};


export type QueryFetchLucidSurveysArgs = {
  fetchLucidSurveysInput: FetchLucidSurveyForPanelistInput;
};


export type QueryFetchPanelistArgs = {
  fetchPanelistInput: FetchPanelistInput;
};


export type QueryFetchPanelistByUserIdArgs = {
  fetchPanelistByUserIdInput: FetchPanelistByUserIdInput;
};


export type QueryFetchPanelistFusionSurveyArgs = {
  fetchFusionSurveyInput: FetchFusionSurveyInput;
};


export type QueryFetchPanelistPointHistoryArgs = {
  fetchPanelistPointHistory: FetchPanelistPointHistory;
};


export type QueryFetchPaymentWithdrawalsArgs = {
  paymentWithdrawalsInput: FetchPaymentWithdrawalsInput;
};


export type QueryFetchProjectArgs = {
  project: ProjectIdInput;
};


export type QueryFetchProjectQuotaGroupsArgs = {
  fetchProjectQuotaGroups: FetchAllQuotaGroupsInput;
};


export type QueryFetchProjectStatsArgs = {
  project: ProjectIdInput;
};


export type QueryFetchProjectSuppliersArgs = {
  suppliersInput: FetchProjectSuppliersInput;
};


export type QueryFetchSurveyResultByIdArgs = {
  surveyResult: FetchSurveyResultById;
};


export type QueryFetchSurveyResultsArgs = {
  projectResult: FetchProjectResults;
};


export type QueryGetAttachmentArgs = {
  getMedia: GetMedia;
};


export type QueryGetAttachmentsArgs = {
  getAttachment: GetAttachment;
};


export type QueryGetUserArgs = {
  getUser: GetUser;
};


export type QuerySearchUserArgs = {
  searchUserInput: SearchUserInput;
};

export type Quota = {
  __typename?: 'Quota';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  quotaGroup?: Maybe<Array<QuotaGroup>>;
  type: QuotaType;
  updatedAt: Scalars['String'];
};

export type QuotaGroup = {
  __typename?: 'QuotaGroup';
  completeCap?: Maybe<Scalars['String']>;
  completeCapLeft?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  projectId: Scalars['String'];
  quota: Array<Maybe<Quota>>;
  supplierQuotaGroup?: Maybe<Array<SupplierQuotaGroup>>;
  surveyEntryLink?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type QuotaGroupPayload = {
  __typename?: 'QuotaGroupPayload';
  quotaGroup?: Maybe<QuotaGroup>;
  response?: Maybe<ResponsePayload>;
};

/** QuotaType */
export enum QuotaType {
  Age = 'AGE',
  Gender = 'GENDER',
  Region = 'REGION'
}

export type RegisterPanelistInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  fraudScore?: InputMaybe<Scalars['Float']>;
  gender?: InputMaybe<UserGender>;
  lastName?: InputMaybe<Scalars['String']>;
  maxMindScore?: InputMaybe<Scalars['Float']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  platform?: InputMaybe<Platform>;
  privacyPolicy?: InputMaybe<Scalars['Boolean']>;
  responses: Array<CreateBulkSignupSurveyResponseInput>;
  /** Send Investor Type from the ENUM - Sign-up */
  roleType: UserRole;
  scamalyticsScore?: InputMaybe<Scalars['Float']>;
  signupSource?: InputMaybe<PanelistSignupSource>;
  state?: InputMaybe<Scalars['String']>;
  termsAndConditions?: InputMaybe<Scalars['Boolean']>;
  transactionId?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type RegisterPanelistMobileInput = {
  address?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  fraudScore?: InputMaybe<Scalars['Float']>;
  lastName?: InputMaybe<Scalars['String']>;
  maxMindScore?: InputMaybe<Scalars['Float']>;
  password?: InputMaybe<Scalars['String']>;
  platform?: InputMaybe<Platform>;
  privacyPolicy?: InputMaybe<Scalars['Boolean']>;
  /** Send Investor Type from the ENUM - Sign-up */
  roleType: UserRole;
  scamalyticsScore?: InputMaybe<Scalars['Float']>;
  signupSource?: InputMaybe<PanelistSignupSource>;
  termsAndConditions?: InputMaybe<Scalars['Boolean']>;
  transactionId?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  /** Send Investor Type from the ENUM - Sign-up */
  roleType: UserRole;
};

export type RemoveAttachment = {
  id?: InputMaybe<Scalars['String']>;
};

export type RemoveCompanyInput = {
  id: Scalars['String'];
};

export type RemovePanelistInput = {
  id: Scalars['String'];
};

export type RemovePaymentWithdrawalRequest = {
  id: Scalars['String'];
};

export type RemoveQuotaGroupInput = {
  id: Scalars['String'];
};

export type RemoveSupplierInput = {
  id: Scalars['String'];
};

export type RemoveSupplierQuotaGroupInput = {
  id: Scalars['String'];
};

export type ResendVerificationEmail = {
  email?: InputMaybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResponsePayload = {
  __typename?: 'ResponsePayload';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
};

export type ResponsePayloadResponse = {
  __typename?: 'ResponsePayloadResponse';
  response?: Maybe<ResponsePayload>;
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  role: UserRole;
  updatedAt: Scalars['String'];
};

export type RolesPayload = {
  __typename?: 'RolesPayload';
  response?: Maybe<ResponsePayload>;
  roles?: Maybe<Array<Maybe<Role>>>;
};

export type SearchUserInput = {
  searchTerm: Scalars['String'];
};

export type SendOtpToPanelistCodeInput = {
  phoneNumber: Scalars['String'];
};

export type SignupSurveyResponse = {
  __typename?: 'SignupSurveyResponse';
  answer: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  panelist?: Maybe<Panelist>;
  panelistId: Scalars['String'];
  question: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SubmissionStats = {
  __typename?: 'SubmissionStats';
  companyName?: Maybe<Scalars['String']>;
  completeCap?: Maybe<Scalars['String']>;
  completedResponses: Scalars['String'];
  initializedResponses: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  quotaGroupId?: Maybe<Scalars['String']>;
  quotaGroupName?: Maybe<Scalars['String']>;
  quotaResponses: Scalars['String'];
  securityTerminateResponses: Scalars['String'];
  supplierCompleteCapLeft?: Maybe<Scalars['String']>;
  terminatedResponses: Scalars['String'];
};

export type SubmissionStatsPayload = {
  __typename?: 'SubmissionStatsPayload';
  response?: Maybe<ResponsePayload>;
  stats: Array<SubmissionStats>;
};

export type Supplier = {
  __typename?: 'Supplier';
  companyName?: Maybe<Scalars['String']>;
  completeLink?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  hashEnabled: Scalars['Boolean'];
  hashPrivetKey?: Maybe<Scalars['String']>;
  hashPrivetKeyVariableName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  quotaFullLink?: Maybe<Scalars['String']>;
  securityLink?: Maybe<Scalars['String']>;
  supplierQuotaGroup?: Maybe<Array<SupplierQuotaGroup>>;
  surveyEntryLink?: Maybe<Scalars['String']>;
  terminateLink?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type SupplierPayload = {
  __typename?: 'SupplierPayload';
  response?: Maybe<ResponsePayload>;
  supplier?: Maybe<Supplier>;
};

export type SupplierQuotaGroup = {
  __typename?: 'SupplierQuotaGroup';
  completeCap?: Maybe<Scalars['String']>;
  completeLink?: Maybe<Scalars['String']>;
  cpi?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  offerId?: Maybe<Scalars['String']>;
  quotaFullLink?: Maybe<Scalars['String']>;
  quotaGroup?: Maybe<QuotaGroup>;
  quotaGroupId: Scalars['String'];
  securityLink?: Maybe<Scalars['String']>;
  supplier?: Maybe<Supplier>;
  supplierCompleteCapLeft?: Maybe<Scalars['String']>;
  supplierId: Scalars['String'];
  supplierResults?: Maybe<Array<Maybe<SurveyResult>>>;
  surveyEntryLink?: Maybe<Scalars['String']>;
  terminateLink?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type SupplierToQuotaGroupPayload = {
  __typename?: 'SupplierToQuotaGroupPayload';
  response?: Maybe<ResponsePayload>;
  supplierQuotaGroup?: Maybe<SupplierQuotaGroup>;
};

/** The Survey Match */
export enum SurveyMatch {
  Full = 'FULL',
  Partial = 'PARTIAL'
}

export type SurveyResult = {
  __typename?: 'SurveyResult';
  cpi: Scalars['Float'];
  createdAt: Scalars['String'];
  dataQualityScore: Scalars['Float'];
  defenderApiScore: Scalars['Float'];
  id: Scalars['String'];
  ipAddress?: Maybe<Scalars['String']>;
  maxMindScore: Scalars['Float'];
  panelistId: Scalars['String'];
  project?: Maybe<Project>;
  projectId: Scalars['String'];
  scamalyticsScore: Scalars['Float'];
  supplierQuotaGroup?: Maybe<SupplierQuotaGroup>;
  supplierQuotaGroupId?: Maybe<Scalars['String']>;
  surveyEndTime?: Maybe<Scalars['String']>;
  surveyId?: Maybe<Scalars['String']>;
  surveyResultStatus: SurveyResultStatus;
  surveySource: SurveySource;
  transactionId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type SurveyResultPayload = {
  __typename?: 'SurveyResultPayload';
  response?: Maybe<ResponsePayload>;
  surveyResult?: Maybe<SurveyResult>;
};

/** The survey result status */
export enum SurveyResultStatus {
  Completed = 'COMPLETED',
  DailySurveyInvite = 'DAILY_SURVEY_INVITE',
  Initialized = 'INITIALIZED',
  InternalSecurityTerminate = 'INTERNAL_SECURITY_TERMINATE',
  Quota = 'QUOTA',
  SecurityTerminate = 'SECURITY_TERMINATE',
  Terminate = 'TERMINATE'
}

/** The survey source */
export enum SurveySource {
  FusionSurvey = 'FUSION_SURVEY',
  LucidSurvey = 'LUCID_SURVEY',
  NomadicSurvey = 'NOMADIC_SURVEY'
}

export type UpdateAttachmentInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  /** enum type for module type - Upload Media */
  type?: InputMaybe<AttachmentType>;
  typeId?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateCompanyInput = {
  clientNumber?: InputMaybe<Scalars['Float']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdatePanelistInput = {
  address?: InputMaybe<Scalars['String']>;
  blockPromotions?: InputMaybe<Scalars['Boolean']>;
  city?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['String']>;
  fraudScore?: InputMaybe<Scalars['Float']>;
  gender?: InputMaybe<UserGender>;
  id: Scalars['String'];
  lucidProfileCompleted?: InputMaybe<Scalars['Boolean']>;
  maxMindScore?: InputMaybe<Scalars['Float']>;
  panelistReviewStatus?: InputMaybe<PanelistReviewStatus>;
  phone?: InputMaybe<Scalars['String']>;
  platform?: InputMaybe<Platform>;
  privacyPolicy?: InputMaybe<Scalars['Boolean']>;
  scamalyticsScore?: InputMaybe<Scalars['Float']>;
  signupSource?: InputMaybe<PanelistSignupSource>;
  state?: InputMaybe<Scalars['String']>;
  termsAndConditions?: InputMaybe<Scalars['Boolean']>;
  timezone?: InputMaybe<Scalars['String']>;
  transactionId?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type UpdatePasswordInput = {
  id: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UpdatePaymentWithdrawalRequest = {
  id: Scalars['String'];
  status: PaymentWithdrawalStatus;
};

export type UpdateProjectInput = {
  archive?: InputMaybe<Scalars['Boolean']>;
  clientId?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  dataQuality?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  lifecycle?: InputMaybe<ProjectLifecycle>;
  methodology?: InputMaybe<ProjectMethodology>;
  security?: InputMaybe<ProjectSecurity>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectResultStatusInput = {
  dataQualityScore?: InputMaybe<Scalars['Float']>;
  defenderApiScore?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  maxMindScore?: InputMaybe<Scalars['Float']>;
  scamalyticsScore?: InputMaybe<Scalars['Float']>;
  surveyResultStatus: SurveyResultStatus;
};

export type UpdateProjectUserInput = {
  id: Scalars['String'];
  isHeadManager?: InputMaybe<Scalars['Boolean']>;
  isSalesManager?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateQuotaGroupInput = {
  completeCap?: InputMaybe<Scalars['String']>;
  completeCapLeft?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  surveyEntryLink?: InputMaybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  id: Scalars['String'];
  roles: Array<UserRole>;
};

export type UpdateSupplierInput = {
  companyName?: InputMaybe<Scalars['String']>;
  completeLink?: InputMaybe<Scalars['String']>;
  hashEnabled?: InputMaybe<Scalars['Boolean']>;
  hashPrivetKey?: InputMaybe<Scalars['String']>;
  hashPrivetKeyVariableName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  quotaFullLink?: InputMaybe<Scalars['String']>;
  securityLink?: InputMaybe<Scalars['String']>;
  terminateLink?: InputMaybe<Scalars['String']>;
};

export type UpdateSupplierQuotaGroupInput = {
  completeCap?: InputMaybe<Scalars['String']>;
  completeLink?: InputMaybe<Scalars['String']>;
  cpi?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  offerId?: InputMaybe<Scalars['String']>;
  quotaFullLink?: InputMaybe<Scalars['String']>;
  quotaGroupId?: InputMaybe<Scalars['String']>;
  securityLink?: InputMaybe<Scalars['String']>;
  supplierCompleteCapLeft?: InputMaybe<Scalars['String']>;
  surveyEntryLink?: InputMaybe<Scalars['String']>;
  terminateLink?: InputMaybe<Scalars['String']>;
};

export type UpdateSurveyResultWithIdReConciliationInput = {
  resultIds: Array<Scalars['String']>;
  surveyResultStatuses: Array<SurveyResultStatus>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  roles: Array<Maybe<Role>>;
  status: UserStatus;
  updatedAt: Scalars['String'];
};

/** The user gender */
export enum UserGender {
  Decline = 'DECLINE',
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type UserIdInput = {
  userId: Scalars['String'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  response?: Maybe<ResponsePayload>;
  user?: Maybe<User>;
};

/** The user role assigned */
export enum UserRole {
  Admin = 'ADMIN',
  Client = 'CLIENT',
  Manager = 'MANAGER',
  MedPanel = 'MED_PANEL',
  Panelist = 'PANELIST',
  SuperAdmin = 'SUPER_ADMIN',
  Supplier = 'SUPPLIER'
}

/** The user status */
export enum UserStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED'
}

export type UsersInput = {
  from?: InputMaybe<Scalars['String']>;
  paginationOptions: PaginationInput;
  roles?: InputMaybe<Array<UserRole>>;
  status?: InputMaybe<UserStatus>;
  to?: InputMaybe<Scalars['String']>;
};

export type UsersPayload = {
  __typename?: 'UsersPayload';
  pagination?: Maybe<PaginationPayload>;
  response?: Maybe<ResponsePayload>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type ValidateLucidSurveyInput = {
  panelistId: Scalars['String'];
  surveyId: Scalars['String'];
};

export type ValidateSurveyPayload = {
  __typename?: 'ValidateSurveyPayload';
  local: Scalars['Boolean'];
  response?: Maybe<ResponsePayload>;
  url: Scalars['String'];
};

export type VerifyEmailInput = {
  token: Scalars['String'];
};

export type VerifyOtpInput = {
  otp: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type VerifyUserAndUpdatePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  loginUser: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessUserPayload', access_token?: string | null, response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null } | null, roles?: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string }> | null } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPassword: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null } | null } };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', me: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, emailVerified: boolean, email: string, createdAt: string, updatedAt: string, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null } };

export type AllRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRolesQuery = { __typename?: 'Query', fetchAllRoles: { __typename?: 'RolesPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null } | null, roles?: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> | null } };

export type ResetPasswordMutationVariables = Exact<{
  resetPassword: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null } | null } };

export type ResendVerificationEmailMutationVariables = Exact<{
  resendVerificationEmail: ResendVerificationEmail;
}>;


export type ResendVerificationEmailMutation = { __typename?: 'Mutation', resendVerificationEmail: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type VerifyEmailAndSetPasswordMutationVariables = Exact<{
  verifyEmailAndSetPassword: VerifyUserAndUpdatePasswordInput;
}>;


export type VerifyEmailAndSetPasswordMutation = { __typename?: 'Mutation', verifyEmailAndSetPassword: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, emailVerified: boolean, email: string, createdAt: string, updatedAt: string, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null } };

export type RegisterUserMutationVariables = Exact<{
  user: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserPayload', user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, emailVerified: boolean, email: string, createdAt: string, updatedAt: string, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null, response?: { __typename?: 'ResponsePayload', error?: string | null, status?: number | null, message?: string | null } | null } };

export type CreateCompanyMutationVariables = Exact<{
  companyInput: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'CompanyPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, company?: { __typename?: 'Company', id: string, email?: string | null, name: string, clientNumber?: number | null } | null } };

export type FetchAllCompaniesQueryVariables = Exact<{
  companiesInput: FetchCompaniesInput;
}>;


export type FetchAllCompaniesQuery = { __typename?: 'Query', fetchAllCompanies: { __typename?: 'FetchCompaniesPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, pagination?: { __typename?: 'PaginationPayload', totalPages?: number | null, totalCount?: number | null, page?: number | null, limit?: number | null } | null, companies: Array<{ __typename?: 'Company', id: string, name: string, email?: string | null, clientNumber?: number | null } | null> } };

export type RemoveCompanyMutationVariables = Exact<{
  companyInput: RemoveCompanyInput;
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutation', removeCompany: { __typename?: 'CompanyPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type UpdateCompanyMutationVariables = Exact<{
  companyInput: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'CompanyPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type FetchCpiStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCpiStatsQuery = { __typename?: 'Query', fetchCpiStats: { __typename?: 'FetchCpiStatsPayload', revenue?: number | null, netProfit?: number | null, response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null } };

export type FetchDashboardDataQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchDashboardDataQuery = { __typename?: 'Query', fetchDashboardData: { __typename?: 'FetchDashboardPayload', activePanelists: number, response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, panelistsCountByDayGraphData: Array<{ __typename?: 'FetchPanelistByDay', day?: any | null, count?: string | null } | null>, panelistsCountByCountryGraphData: Array<{ __typename?: 'FetchPanelistByCountry', country?: string | null, count?: string | null } | null> } };

export type FetchAllPanelistsQueryVariables = Exact<{
  fetchPanelistsInput: FetchPanelistsInput;
}>;


export type FetchAllPanelistsQuery = { __typename?: 'Query', fetchAllPanelists: { __typename?: 'FetchPanelistPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, pagination?: { __typename?: 'PaginationPayload', page?: number | null, limit?: number | null, totalCount?: number | null, totalPages?: number | null } | null, panelists: Array<{ __typename?: 'Panelist', id: string, phone?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, gender?: UserGender | null, dob?: string | null, country?: string | null, userId: string, blockPromotions?: boolean | null, timezone?: string | null, verifyTokenExpired?: boolean | null, panelistReviewStatus?: PanelistReviewStatus | null, fraudScore: number, scamalyticsScore: number, availablePoints?: number | null, ipAddress?: string | null, createdAt: string, updatedAt: string, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, emailVerified: boolean, email: string, roles: Array<{ __typename?: 'Role', id: string, role: UserRole } | null> } | null, attachments: Array<{ __typename?: 'Attachment', url?: string | null, typeId: string, type: AttachmentType, id: string, key?: string | null, createdAt: string, description?: string | null, updatedAt: string } | null> } | null> } };

export type FetchPanelistQueryVariables = Exact<{
  fetchPanelistInput: FetchPanelistInput;
}>;


export type FetchPanelistQuery = { __typename?: 'Query', fetchPanelist: { __typename?: 'PanelistPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, panelist?: { __typename?: 'Panelist', id: string, phone?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, gender?: UserGender | null, dob?: string | null, userId: string, blockPromotions?: boolean | null, panelistReviewStatus?: PanelistReviewStatus | null, timezone?: string | null, availablePoints?: number | null, ipAddress?: string | null, createdAt: string, updatedAt: string, attachments: Array<{ __typename?: 'Attachment', id: string, typeId: string, type: AttachmentType, description?: string | null, key?: string | null, url?: string | null, createdAt: string, updatedAt: string } | null>, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, emailVerified: boolean, email: string, roles: Array<{ __typename?: 'Role', id: string, role: UserRole } | null> } | null, signupSurveyResponse: Array<{ __typename?: 'SignupSurveyResponse', id: string, question: string, answer: string, createdAt: string, updatedAt: string } | null> } | null } };

export type RemovePanelistMutationVariables = Exact<{
  removePanelistInput: RemovePanelistInput;
}>;


export type RemovePanelistMutation = { __typename?: 'Mutation', removePanelist: { __typename?: 'PanelistPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null } };

export type UpdatePanelistMutationVariables = Exact<{
  updatePanelistInput: UpdatePanelistInput;
}>;


export type UpdatePanelistMutation = { __typename?: 'Mutation', updatePanelist: { __typename?: 'PanelistPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null } };

export type GetAttachmentQueryVariables = Exact<{
  getMedia: GetMedia;
}>;


export type GetAttachmentQuery = { __typename?: 'Query', getAttachment: { __typename?: 'AttachmentMediaPayload', preSignedUrl?: string | null, response?: { __typename?: 'ResponsePayload', error?: string | null, message?: string | null, status?: number | null } | null } };

export type FetchPanelistPointHistoryQueryVariables = Exact<{
  fetchPanelistPointHistory: FetchPanelistPointHistory;
}>;


export type FetchPanelistPointHistoryQuery = { __typename?: 'Query', fetchPanelistPointHistory: { __typename?: 'PointHistoriesPayload', pointHistory: Array<{ __typename?: 'PointHistory', id: string, details?: string | null, panelistId: string, points: string, createdAt: string, updatedAt: string } | null>, pagination?: { __typename?: 'PaginationPayload', page?: number | null, limit?: number | null, totalCount?: number | null, totalPages?: number | null } | null } };

export type FetchPaymentWithdrawalsQueryVariables = Exact<{
  paymentWithdrawalsInput: FetchPaymentWithdrawalsInput;
}>;


export type FetchPaymentWithdrawalsQuery = { __typename?: 'Query', fetchPaymentWithdrawals: { __typename?: 'PaymentWithdrawalsPayload', paymentWithdrawals: Array<{ __typename?: 'PaymentWithdrawal', id: string, status: PaymentWithdrawalStatus, panelistId: string, points: string, type?: PaymentWithdrawalType | null, createdAt: string, updatedAt: string, panelist?: { __typename?: 'Panelist', id: string, phone?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, gender?: UserGender | null, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null } | null } | null } | null>, pagination?: { __typename?: 'PaginationPayload', page?: number | null, limit?: number | null, totalCount?: number | null, totalPages?: number | null } | null } };

export type UpdatePaymentWithdrawalsMutationVariables = Exact<{
  paymentWithdrawalInput: UpdatePaymentWithdrawalRequest;
}>;


export type UpdatePaymentWithdrawalsMutation = { __typename?: 'Mutation', updatePaymentWithdrawals: { __typename?: 'PaymentWithdrawalPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, paymentWithdrawal?: { __typename?: 'PaymentWithdrawal', id: string, status: PaymentWithdrawalStatus, panelistId: string, points: string } | null } };

export type RemovePaymentWithdrawalsMutationVariables = Exact<{
  paymentWithdrawalInput: RemovePaymentWithdrawalRequest;
}>;


export type RemovePaymentWithdrawalsMutation = { __typename?: 'Mutation', removePaymentWithdrawals: { __typename?: 'PaymentWithdrawalPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, name?: string | null } | null } };

export type BulkUpdatePaymentWithdrawalRequestMutationVariables = Exact<{
  bulkUpdatePaymentWithdrawalRequest: BulkUpdatePaymentWithdrawalRequest;
}>;


export type BulkUpdatePaymentWithdrawalRequestMutation = { __typename?: 'Mutation', bulkUpdatePaymentWithdrawalRequest: { __typename?: 'BulkUpdatePaymentWithdrawalsPayload', errors: Array<string | null>, response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null, name?: string | null } | null } };

export type CreateProjectMutationVariables = Exact<{
  projectInput: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type UpdateProjectMutationVariables = Exact<{
  projectInput: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'ProjectPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type RemoveProjectMutationVariables = Exact<{
  project: ProjectIdInput;
}>;


export type RemoveProjectMutation = { __typename?: 'Mutation', removeProject: { __typename?: 'ProjectPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type CreateProjectUserMutationVariables = Exact<{
  projectInput: CreateProjectUserInput;
}>;


export type CreateProjectUserMutation = { __typename?: 'Mutation', createProjectUser: { __typename?: 'ProjectUserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, projectUser?: { __typename?: 'ProjectUser', id: string, userId: string, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, roles: Array<{ __typename?: 'Role', id: string, role: UserRole } | null> } | null } | null } };

export type UpdateProjectUserMutationVariables = Exact<{
  projectInput: UpdateProjectUserInput;
}>;


export type UpdateProjectUserMutation = { __typename?: 'Mutation', updateProjectUser: { __typename?: 'ProjectPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type RemoveProjectUserMutationVariables = Exact<{
  project: ProjectIdInput;
}>;


export type RemoveProjectUserMutation = { __typename?: 'Mutation', removeProjectUser: { __typename?: 'ProjectPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type FetchProjectStatsQueryVariables = Exact<{
  project: ProjectIdInput;
}>;


export type FetchProjectStatsQuery = { __typename?: 'Query', fetchProjectStats: { __typename?: 'SubmissionStatsPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, stats: Array<{ __typename?: 'SubmissionStats', name?: string | null, companyName?: string | null, completedResponses: string, terminatedResponses: string, quotaResponses: string, securityTerminateResponses: string, initializedResponses: string, supplierCompleteCapLeft?: string | null, completeCap?: string | null, quotaGroupId?: string | null }> } };

export type FetchProjectQueryVariables = Exact<{
  project: ProjectIdInput;
}>;


export type FetchProjectQuery = { __typename?: 'Query', fetchProject: { __typename?: 'ProjectPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, project?: { __typename?: 'Project', id: string, title: string, description?: string | null, dataQuality: boolean, projectUsers: Array<{ __typename?: 'ProjectUser', id: string, userId: string, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, roles: Array<{ __typename?: 'Role', id: string, role: UserRole } | null> } | null } | null> } | null } };

export type FetchAllProjectsQueryVariables = Exact<{
  projectInput: FetchProjectsInput;
}>;


export type FetchAllProjectsQuery = { __typename?: 'Query', fetchAllProjects: { __typename?: 'ProjectsPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, pagination?: { __typename?: 'PaginationPayload', totalPages?: number | null, totalCount?: number | null, page?: number | null, limit?: number | null } | null, projects: Array<{ __typename?: 'Project', id: string, archive: boolean, title: string, description?: string | null, code: string, email: string, lifecycle?: ProjectLifecycle | null, methodology?: ProjectMethodology | null, clientId?: string | null, security?: ProjectSecurity | null, dataQuality: boolean, client?: { __typename?: 'Company', id: string, name: string, clientNumber?: number | null } | null, projectUsers: Array<{ __typename?: 'ProjectUser', id: string, isHeadManager?: boolean | null, isSalesManager?: boolean | null, userId: string, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, roles: Array<{ __typename?: 'Role', id: string, role: UserRole } | null> } | null } | null>, quotaGroup?: Array<{ __typename?: 'QuotaGroup', id: string, name?: string | null, projectId: string, surveyEntryLink?: string | null, completeCap?: string | null, completeCapLeft?: string | null, quota: Array<{ __typename?: 'Quota', id: string, name: string, type: QuotaType } | null>, supplierQuotaGroup?: Array<{ __typename?: 'SupplierQuotaGroup', completeCap?: string | null, completeLink?: string | null, cpi?: string | null, id: string, quotaFullLink?: string | null, securityLink?: string | null, terminateLink?: string | null, quotaGroupId: string, surveyEntryLink?: string | null, supplierCompleteCapLeft?: string | null, supplierId: string, offerId?: string | null, supplier?: { __typename?: 'Supplier', id: string, name?: string | null, companyName?: string | null } | null }> | null } | null> | null } | null> } };

export type FetchAllQuotasQueryVariables = Exact<{
  fetchAllQuotasInput: FetchAllQuotasInput;
}>;


export type FetchAllQuotasQuery = { __typename?: 'Query', fetchAllQuotas: { __typename?: 'FetchQuotaPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, pagination?: { __typename?: 'PaginationPayload', totalPages?: number | null, totalCount?: number | null, page?: number | null, limit?: number | null } | null, quota: Array<{ __typename?: 'Quota', id: string, name: string, type: QuotaType } | null> } };

export type AddQuotaGroupsToProjectMutationVariables = Exact<{
  projectInput: AddQuotaGroupsToProject;
}>;


export type AddQuotaGroupsToProjectMutation = { __typename?: 'Mutation', addQuotaGroupsToProject: { __typename?: 'ProjectPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, project?: { __typename?: 'Project', id: string, quotaGroup?: Array<{ __typename?: 'QuotaGroup', id: string, name?: string | null, completeCap?: string | null, completeCapLeft?: string | null, quota: Array<{ __typename?: 'Quota', id: string, name: string, type: QuotaType } | null> } | null> | null } | null } };

export type RemoveQuotaGroupMutationVariables = Exact<{
  removeQuotaGroupInput: RemoveQuotaGroupInput;
}>;


export type RemoveQuotaGroupMutation = { __typename?: 'Mutation', removeQuotaGroup: { __typename?: 'QuotaGroupPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type RemoveSupplierFromQuotaGroupMutationVariables = Exact<{
  removeSupplierToQuotaGroup: RemoveSupplierQuotaGroupInput;
}>;


export type RemoveSupplierFromQuotaGroupMutation = { __typename?: 'Mutation', removeSupplierFromQuotaGroup: { __typename?: 'SupplierToQuotaGroupPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type UpdateSupplierQuotaGroupMutationVariables = Exact<{
  updateSupplierQuotaGroupInput: UpdateSupplierQuotaGroupInput;
}>;


export type UpdateSupplierQuotaGroupMutation = { __typename?: 'Mutation', updateSupplierQuotaGroup: { __typename?: 'SupplierToQuotaGroupPayload', response?: { __typename?: 'ResponsePayload', message?: string | null, error?: string | null, status?: number | null } | null } };

export type AddSupplierToQuotaGroupMutationVariables = Exact<{
  createSupplierQuotaGroupInput: CreateSupplierQuotaGroupInput;
}>;


export type AddSupplierToQuotaGroupMutation = { __typename?: 'Mutation', addSupplierToQuotaGroup: { __typename?: 'SupplierToQuotaGroupPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type UpdateQuotaGroupMutationVariables = Exact<{
  updateQuotaGroupInput: UpdateQuotaGroupInput;
}>;


export type UpdateQuotaGroupMutation = { __typename?: 'Mutation', updateQuotaGroup: { __typename?: 'QuotaGroupPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null } };

export type FetchAllSuppliersQueryVariables = Exact<{
  suppliersInput: FetchSuppliersInput;
}>;


export type FetchAllSuppliersQuery = { __typename?: 'Query', fetchAllSuppliers: { __typename?: 'FetchSuppliersPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, pagination?: { __typename?: 'PaginationPayload', totalPages?: number | null, totalCount?: number | null, page?: number | null, limit?: number | null } | null, suppliers: Array<{ __typename?: 'Supplier', id: string, email?: string | null, name?: string | null, companyName?: string | null, hashEnabled: boolean, hashPrivetKey?: string | null, hashPrivetKeyVariableName?: string | null, surveyEntryLink?: string | null, completeLink?: string | null, terminateLink?: string | null, quotaFullLink?: string | null, securityLink?: string | null } | null> } };

export type CreateSupplierMutationVariables = Exact<{
  supplierInput: CreateSupplierInput;
}>;


export type CreateSupplierMutation = { __typename?: 'Mutation', createSupplier: { __typename?: 'SupplierPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type UpdateSupplierMutationVariables = Exact<{
  supplierInput: UpdateSupplierInput;
}>;


export type UpdateSupplierMutation = { __typename?: 'Mutation', updateSupplier: { __typename?: 'SupplierPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type RemoveSupplierMutationVariables = Exact<{
  supplierInput: RemoveSupplierInput;
}>;


export type RemoveSupplierMutation = { __typename?: 'Mutation', removeSupplier: { __typename?: 'SupplierPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type FetchSurveyResultsQueryVariables = Exact<{
  projectResult: FetchProjectResults;
}>;


export type FetchSurveyResultsQuery = { __typename?: 'Query', fetchSurveyResults: { __typename?: 'ProjectsResultsPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, pagination?: { __typename?: 'PaginationPayload', page?: number | null, limit?: number | null, totalCount?: number | null, totalPages?: number | null } | null, results: Array<{ __typename?: 'SurveyResult', id: string, surveySource: SurveySource, supplierQuotaGroupId?: string | null, panelistId: string, projectId: string, surveyResultStatus: SurveyResultStatus, scamalyticsScore: number, defenderApiScore: number, ipAddress?: string | null, surveyEndTime?: string | null, surveyId?: string | null, transactionId?: string | null, cpi: number, dataQualityScore: number, maxMindScore: number, createdAt: string, updatedAt: string, supplierQuotaGroup?: { __typename?: 'SupplierQuotaGroup', id: string, supplierId: string, quotaGroupId: string, completeCap?: string | null, cpi?: string | null, supplierCompleteCapLeft?: string | null, createdAt: string, updatedAt: string } | null } | null> } };

export type RemoveSurveyResultsMutationVariables = Exact<{
  projectResult: ProjectResultIdInput;
}>;


export type RemoveSurveyResultsMutation = { __typename?: 'Mutation', removeSurveyResults: { __typename?: 'ProjectResultPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };

export type UpdateSurveyResultsMutationVariables = Exact<{
  projectResult: UpdateProjectResultStatusInput;
}>;


export type UpdateSurveyResultsMutation = { __typename?: 'Mutation', updateSurveyResults: { __typename?: 'ProjectResultPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, projectResult?: { __typename?: 'SurveyResult', id: string, panelistId: string, surveyResultStatus: SurveyResultStatus } | null } };

export type UpdateSurveyResultWithIdReConciliationMutationVariables = Exact<{
  projectResult: UpdateSurveyResultWithIdReConciliationInput;
}>;


export type UpdateSurveyResultWithIdReConciliationMutation = { __typename?: 'Mutation', updateSurveyResultWithIdReConciliation: { __typename?: 'ProjectResultPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null } };

export type FetchAllUsersQueryVariables = Exact<{
  usersInput: UsersInput;
}>;


export type FetchAllUsersQuery = { __typename?: 'Query', fetchAllUsers: { __typename?: 'UsersPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, users?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, email: string, createdAt: string, updatedAt: string, emailVerified: boolean, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null> | null, pagination?: { __typename?: 'PaginationPayload', page?: number | null, limit?: number | null, totalCount?: number | null, totalPages?: number | null } | null } };

export type DeactivateUserMutationVariables = Exact<{
  userInput: UserIdInput;
}>;


export type DeactivateUserMutation = { __typename?: 'Mutation', deactivateUser: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, email: string, emailVerified: boolean, createdAt: string, updatedAt: string, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null } };

export type FetchAllRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllRolesQuery = { __typename?: 'Query', fetchAllRoles: { __typename?: 'RolesPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, roles?: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> | null } };

export type ActivateUserMutationVariables = Exact<{
  userInput: UserIdInput;
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', activateUser: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, email: string, createdAt: string, updatedAt: string, emailVerified: boolean, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null } };

export type UpdateRoleMutationVariables = Exact<{
  userInput: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, email: string, createdAt: string, updatedAt: string, emailVerified: boolean, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null } };

export type UpdateUserMutationVariables = Exact<{
  userInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, email: string, createdAt: string, updatedAt: string, emailVerified: boolean, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null } };

export type GetUserQueryVariables = Exact<{
  getUser: GetUser;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, email: string, createdAt: string, updatedAt: string, emailVerified: boolean, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null } };

export type SearchUserQueryVariables = Exact<{
  searchUserInput: SearchUserInput;
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser: { __typename?: 'UsersPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null } | null, users?: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, email: string, createdAt: string, updatedAt: string, emailVerified: boolean, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null> | null } };

export type UpdatePasswordMutationVariables = Exact<{
  updatePasswordInput: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, status: UserStatus, email: string, createdAt: string, updatedAt: string, emailVerified: boolean, roles: Array<{ __typename?: 'Role', id: string, role: UserRole, createdAt: string, updatedAt: string } | null> } | null } };

export type RemoveUserMutationVariables = Exact<{
  userInput: UserIdInput;
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'UserPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, error?: string | null, message?: string | null } | null, user?: { __typename?: 'User', id: string } | null } };

export type CreateCpiMutationVariables = Exact<{
  cpiInput: CreateCpiInput;
}>;


export type CreateCpiMutation = { __typename?: 'Mutation', createCpi: { __typename?: 'ProjectPayload', response?: { __typename?: 'ResponsePayload', status?: number | null, message?: string | null, error?: string | null } | null } };


export const LoginDocument = gql`
    mutation Login($loginUser: LoginUserInput!) {
  login(loginUser: $loginUser) {
    response {
      status
      message
    }
    access_token
    roles {
      id
      role
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginUser: // value for 'loginUser'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPassword: ForgotPasswordInput!) {
  forgotPassword(forgotPassword: $forgotPassword) {
    response {
      status
      message
    }
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPassword: // value for 'forgotPassword'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoggedInUserDocument = gql`
    query LoggedInUser {
  me {
    response {
      status
      message
    }
    user {
      id
      firstName
      lastName
      status
      emailVerified
      email
      createdAt
      updatedAt
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useLoggedInUserQuery__
 *
 * To run a query within a React component, call `useLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInUserQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
      }
export function useLoggedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
        }
export type LoggedInUserQueryHookResult = ReturnType<typeof useLoggedInUserQuery>;
export type LoggedInUserLazyQueryHookResult = ReturnType<typeof useLoggedInUserLazyQuery>;
export type LoggedInUserQueryResult = Apollo.QueryResult<LoggedInUserQuery, LoggedInUserQueryVariables>;
export const AllRolesDocument = gql`
    query AllRoles {
  fetchAllRoles {
    response {
      status
      message
    }
    roles {
      id
      role
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useAllRolesQuery__
 *
 * To run a query within a React component, call `useAllRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllRolesQuery(baseOptions?: Apollo.QueryHookOptions<AllRolesQuery, AllRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllRolesQuery, AllRolesQueryVariables>(AllRolesDocument, options);
      }
export function useAllRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllRolesQuery, AllRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllRolesQuery, AllRolesQueryVariables>(AllRolesDocument, options);
        }
export type AllRolesQueryHookResult = ReturnType<typeof useAllRolesQuery>;
export type AllRolesLazyQueryHookResult = ReturnType<typeof useAllRolesLazyQuery>;
export type AllRolesQueryResult = Apollo.QueryResult<AllRolesQuery, AllRolesQueryVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($resetPassword: ResetPasswordInput!) {
  resetPassword(resetPassword: $resetPassword) {
    response {
      status
      message
    }
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      resetPassword: // value for 'resetPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResendVerificationEmailDocument = gql`
    mutation ResendVerificationEmail($resendVerificationEmail: ResendVerificationEmail!) {
  resendVerificationEmail(resendVerificationEmail: $resendVerificationEmail) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type ResendVerificationEmailMutationFn = Apollo.MutationFunction<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>;

/**
 * __useResendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useResendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationEmailMutation, { data, loading, error }] = useResendVerificationEmailMutation({
 *   variables: {
 *      resendVerificationEmail: // value for 'resendVerificationEmail'
 *   },
 * });
 */
export function useResendVerificationEmailMutation(baseOptions?: Apollo.MutationHookOptions<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>(ResendVerificationEmailDocument, options);
      }
export type ResendVerificationEmailMutationHookResult = ReturnType<typeof useResendVerificationEmailMutation>;
export type ResendVerificationEmailMutationResult = Apollo.MutationResult<ResendVerificationEmailMutation>;
export type ResendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>;
export const VerifyEmailAndSetPasswordDocument = gql`
    mutation VerifyEmailAndSetPassword($verifyEmailAndSetPassword: VerifyUserAndUpdatePasswordInput!) {
  verifyEmailAndSetPassword(verifyEmailAndSetPassword: $verifyEmailAndSetPassword) {
    response {
      status
      message
    }
    user {
      id
      firstName
      lastName
      status
      emailVerified
      email
      createdAt
      updatedAt
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export type VerifyEmailAndSetPasswordMutationFn = Apollo.MutationFunction<VerifyEmailAndSetPasswordMutation, VerifyEmailAndSetPasswordMutationVariables>;

/**
 * __useVerifyEmailAndSetPasswordMutation__
 *
 * To run a mutation, you first call `useVerifyEmailAndSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailAndSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailAndSetPasswordMutation, { data, loading, error }] = useVerifyEmailAndSetPasswordMutation({
 *   variables: {
 *      verifyEmailAndSetPassword: // value for 'verifyEmailAndSetPassword'
 *   },
 * });
 */
export function useVerifyEmailAndSetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailAndSetPasswordMutation, VerifyEmailAndSetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailAndSetPasswordMutation, VerifyEmailAndSetPasswordMutationVariables>(VerifyEmailAndSetPasswordDocument, options);
      }
export type VerifyEmailAndSetPasswordMutationHookResult = ReturnType<typeof useVerifyEmailAndSetPasswordMutation>;
export type VerifyEmailAndSetPasswordMutationResult = Apollo.MutationResult<VerifyEmailAndSetPasswordMutation>;
export type VerifyEmailAndSetPasswordMutationOptions = Apollo.BaseMutationOptions<VerifyEmailAndSetPasswordMutation, VerifyEmailAndSetPasswordMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($user: RegisterUserInput!) {
  registerUser(user: $user) {
    user {
      id
      firstName
      lastName
      status
      emailVerified
      email
      createdAt
      updatedAt
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
    response {
      error
      status
      message
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const CreateCompanyDocument = gql`
    mutation CreateCompany($companyInput: CreateCompanyInput!) {
  createCompany(companyInput: $companyInput) {
    response {
      status
      message
      error
    }
    company {
      id
      email
      name
      clientNumber
    }
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      companyInput: // value for 'companyInput'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const FetchAllCompaniesDocument = gql`
    query FetchAllCompanies($companiesInput: FetchCompaniesInput!) {
  fetchAllCompanies(companiesInput: $companiesInput) {
    response {
      status
      message
      error
    }
    pagination {
      totalPages
      totalCount
      page
      limit
    }
    companies {
      id
      name
      email
      clientNumber
    }
  }
}
    `;

/**
 * __useFetchAllCompaniesQuery__
 *
 * To run a query within a React component, call `useFetchAllCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllCompaniesQuery({
 *   variables: {
 *      companiesInput: // value for 'companiesInput'
 *   },
 * });
 */
export function useFetchAllCompaniesQuery(baseOptions: Apollo.QueryHookOptions<FetchAllCompaniesQuery, FetchAllCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllCompaniesQuery, FetchAllCompaniesQueryVariables>(FetchAllCompaniesDocument, options);
      }
export function useFetchAllCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllCompaniesQuery, FetchAllCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllCompaniesQuery, FetchAllCompaniesQueryVariables>(FetchAllCompaniesDocument, options);
        }
export type FetchAllCompaniesQueryHookResult = ReturnType<typeof useFetchAllCompaniesQuery>;
export type FetchAllCompaniesLazyQueryHookResult = ReturnType<typeof useFetchAllCompaniesLazyQuery>;
export type FetchAllCompaniesQueryResult = Apollo.QueryResult<FetchAllCompaniesQuery, FetchAllCompaniesQueryVariables>;
export const RemoveCompanyDocument = gql`
    mutation RemoveCompany($companyInput: RemoveCompanyInput!) {
  removeCompany(companyInput: $companyInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type RemoveCompanyMutationFn = Apollo.MutationFunction<RemoveCompanyMutation, RemoveCompanyMutationVariables>;

/**
 * __useRemoveCompanyMutation__
 *
 * To run a mutation, you first call `useRemoveCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCompanyMutation, { data, loading, error }] = useRemoveCompanyMutation({
 *   variables: {
 *      companyInput: // value for 'companyInput'
 *   },
 * });
 */
export function useRemoveCompanyMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCompanyMutation, RemoveCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCompanyMutation, RemoveCompanyMutationVariables>(RemoveCompanyDocument, options);
      }
export type RemoveCompanyMutationHookResult = ReturnType<typeof useRemoveCompanyMutation>;
export type RemoveCompanyMutationResult = Apollo.MutationResult<RemoveCompanyMutation>;
export type RemoveCompanyMutationOptions = Apollo.BaseMutationOptions<RemoveCompanyMutation, RemoveCompanyMutationVariables>;
export const UpdateCompanyDocument = gql`
    mutation UpdateCompany($companyInput: UpdateCompanyInput!) {
  updateCompany(companyInput: $companyInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type UpdateCompanyMutationFn = Apollo.MutationFunction<UpdateCompanyMutation, UpdateCompanyMutationVariables>;

/**
 * __useUpdateCompanyMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyMutation, { data, loading, error }] = useUpdateCompanyMutation({
 *   variables: {
 *      companyInput: // value for 'companyInput'
 *   },
 * });
 */
export function useUpdateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument, options);
      }
export type UpdateCompanyMutationHookResult = ReturnType<typeof useUpdateCompanyMutation>;
export type UpdateCompanyMutationResult = Apollo.MutationResult<UpdateCompanyMutation>;
export type UpdateCompanyMutationOptions = Apollo.BaseMutationOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const FetchCpiStatsDocument = gql`
    query FetchCpiStats {
  fetchCpiStats {
    response {
      status
      error
      message
    }
    revenue
    netProfit
  }
}
    `;

/**
 * __useFetchCpiStatsQuery__
 *
 * To run a query within a React component, call `useFetchCpiStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCpiStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCpiStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchCpiStatsQuery(baseOptions?: Apollo.QueryHookOptions<FetchCpiStatsQuery, FetchCpiStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCpiStatsQuery, FetchCpiStatsQueryVariables>(FetchCpiStatsDocument, options);
      }
export function useFetchCpiStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCpiStatsQuery, FetchCpiStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCpiStatsQuery, FetchCpiStatsQueryVariables>(FetchCpiStatsDocument, options);
        }
export type FetchCpiStatsQueryHookResult = ReturnType<typeof useFetchCpiStatsQuery>;
export type FetchCpiStatsLazyQueryHookResult = ReturnType<typeof useFetchCpiStatsLazyQuery>;
export type FetchCpiStatsQueryResult = Apollo.QueryResult<FetchCpiStatsQuery, FetchCpiStatsQueryVariables>;
export const FetchDashboardDataDocument = gql`
    query FetchDashboardData {
  fetchDashboardData {
    response {
      status
      error
      message
    }
    panelistsCountByDayGraphData {
      day
      count
    }
    panelistsCountByCountryGraphData {
      country
      count
    }
    activePanelists
  }
}
    `;

/**
 * __useFetchDashboardDataQuery__
 *
 * To run a query within a React component, call `useFetchDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDashboardDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchDashboardDataQuery(baseOptions?: Apollo.QueryHookOptions<FetchDashboardDataQuery, FetchDashboardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchDashboardDataQuery, FetchDashboardDataQueryVariables>(FetchDashboardDataDocument, options);
      }
export function useFetchDashboardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchDashboardDataQuery, FetchDashboardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchDashboardDataQuery, FetchDashboardDataQueryVariables>(FetchDashboardDataDocument, options);
        }
export type FetchDashboardDataQueryHookResult = ReturnType<typeof useFetchDashboardDataQuery>;
export type FetchDashboardDataLazyQueryHookResult = ReturnType<typeof useFetchDashboardDataLazyQuery>;
export type FetchDashboardDataQueryResult = Apollo.QueryResult<FetchDashboardDataQuery, FetchDashboardDataQueryVariables>;
export const FetchAllPanelistsDocument = gql`
    query FetchAllPanelists($fetchPanelistsInput: FetchPanelistsInput!) {
  fetchAllPanelists(fetchPanelistsInput: $fetchPanelistsInput) {
    response {
      status
      error
      message
    }
    pagination {
      page
      limit
      totalCount
      totalPages
    }
    panelists {
      id
      phone
      address
      city
      state
      zipCode
      gender
      dob
      country
      userId
      blockPromotions
      timezone
      verifyTokenExpired
      panelistReviewStatus
      fraudScore
      scamalyticsScore
      availablePoints
      ipAddress
      user {
        id
        firstName
        lastName
        status
        emailVerified
        email
        roles {
          id
          role
        }
      }
      attachments {
        url
        typeId
        type
        id
        key
        createdAt
        description
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useFetchAllPanelistsQuery__
 *
 * To run a query within a React component, call `useFetchAllPanelistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllPanelistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllPanelistsQuery({
 *   variables: {
 *      fetchPanelistsInput: // value for 'fetchPanelistsInput'
 *   },
 * });
 */
export function useFetchAllPanelistsQuery(baseOptions: Apollo.QueryHookOptions<FetchAllPanelistsQuery, FetchAllPanelistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllPanelistsQuery, FetchAllPanelistsQueryVariables>(FetchAllPanelistsDocument, options);
      }
export function useFetchAllPanelistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllPanelistsQuery, FetchAllPanelistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllPanelistsQuery, FetchAllPanelistsQueryVariables>(FetchAllPanelistsDocument, options);
        }
export type FetchAllPanelistsQueryHookResult = ReturnType<typeof useFetchAllPanelistsQuery>;
export type FetchAllPanelistsLazyQueryHookResult = ReturnType<typeof useFetchAllPanelistsLazyQuery>;
export type FetchAllPanelistsQueryResult = Apollo.QueryResult<FetchAllPanelistsQuery, FetchAllPanelistsQueryVariables>;
export const FetchPanelistDocument = gql`
    query FetchPanelist($fetchPanelistInput: FetchPanelistInput!) {
  fetchPanelist(fetchPanelistInput: $fetchPanelistInput) {
    response {
      status
      error
      message
    }
    panelist {
      id
      phone
      address
      city
      state
      zipCode
      gender
      dob
      userId
      blockPromotions
      panelistReviewStatus
      timezone
      availablePoints
      ipAddress
      attachments {
        id
        typeId
        type
        description
        key
        url
        createdAt
        updatedAt
      }
      user {
        id
        firstName
        lastName
        status
        emailVerified
        email
        roles {
          id
          role
        }
      }
      signupSurveyResponse {
        id
        question
        answer
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useFetchPanelistQuery__
 *
 * To run a query within a React component, call `useFetchPanelistQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPanelistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPanelistQuery({
 *   variables: {
 *      fetchPanelistInput: // value for 'fetchPanelistInput'
 *   },
 * });
 */
export function useFetchPanelistQuery(baseOptions: Apollo.QueryHookOptions<FetchPanelistQuery, FetchPanelistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPanelistQuery, FetchPanelistQueryVariables>(FetchPanelistDocument, options);
      }
export function useFetchPanelistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPanelistQuery, FetchPanelistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPanelistQuery, FetchPanelistQueryVariables>(FetchPanelistDocument, options);
        }
export type FetchPanelistQueryHookResult = ReturnType<typeof useFetchPanelistQuery>;
export type FetchPanelistLazyQueryHookResult = ReturnType<typeof useFetchPanelistLazyQuery>;
export type FetchPanelistQueryResult = Apollo.QueryResult<FetchPanelistQuery, FetchPanelistQueryVariables>;
export const RemovePanelistDocument = gql`
    mutation RemovePanelist($removePanelistInput: RemovePanelistInput!) {
  removePanelist(removePanelistInput: $removePanelistInput) {
    response {
      status
      error
      message
    }
  }
}
    `;
export type RemovePanelistMutationFn = Apollo.MutationFunction<RemovePanelistMutation, RemovePanelistMutationVariables>;

/**
 * __useRemovePanelistMutation__
 *
 * To run a mutation, you first call `useRemovePanelistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePanelistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePanelistMutation, { data, loading, error }] = useRemovePanelistMutation({
 *   variables: {
 *      removePanelistInput: // value for 'removePanelistInput'
 *   },
 * });
 */
export function useRemovePanelistMutation(baseOptions?: Apollo.MutationHookOptions<RemovePanelistMutation, RemovePanelistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePanelistMutation, RemovePanelistMutationVariables>(RemovePanelistDocument, options);
      }
export type RemovePanelistMutationHookResult = ReturnType<typeof useRemovePanelistMutation>;
export type RemovePanelistMutationResult = Apollo.MutationResult<RemovePanelistMutation>;
export type RemovePanelistMutationOptions = Apollo.BaseMutationOptions<RemovePanelistMutation, RemovePanelistMutationVariables>;
export const UpdatePanelistDocument = gql`
    mutation UpdatePanelist($updatePanelistInput: UpdatePanelistInput!) {
  updatePanelist(updatePanelistInput: $updatePanelistInput) {
    response {
      status
      error
      message
    }
  }
}
    `;
export type UpdatePanelistMutationFn = Apollo.MutationFunction<UpdatePanelistMutation, UpdatePanelistMutationVariables>;

/**
 * __useUpdatePanelistMutation__
 *
 * To run a mutation, you first call `useUpdatePanelistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePanelistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePanelistMutation, { data, loading, error }] = useUpdatePanelistMutation({
 *   variables: {
 *      updatePanelistInput: // value for 'updatePanelistInput'
 *   },
 * });
 */
export function useUpdatePanelistMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePanelistMutation, UpdatePanelistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePanelistMutation, UpdatePanelistMutationVariables>(UpdatePanelistDocument, options);
      }
export type UpdatePanelistMutationHookResult = ReturnType<typeof useUpdatePanelistMutation>;
export type UpdatePanelistMutationResult = Apollo.MutationResult<UpdatePanelistMutation>;
export type UpdatePanelistMutationOptions = Apollo.BaseMutationOptions<UpdatePanelistMutation, UpdatePanelistMutationVariables>;
export const GetAttachmentDocument = gql`
    query GetAttachment($getMedia: GetMedia!) {
  getAttachment(getMedia: $getMedia) {
    preSignedUrl
    response {
      error
      message
      status
    }
  }
}
    `;

/**
 * __useGetAttachmentQuery__
 *
 * To run a query within a React component, call `useGetAttachmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttachmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttachmentQuery({
 *   variables: {
 *      getMedia: // value for 'getMedia'
 *   },
 * });
 */
export function useGetAttachmentQuery(baseOptions: Apollo.QueryHookOptions<GetAttachmentQuery, GetAttachmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttachmentQuery, GetAttachmentQueryVariables>(GetAttachmentDocument, options);
      }
export function useGetAttachmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttachmentQuery, GetAttachmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttachmentQuery, GetAttachmentQueryVariables>(GetAttachmentDocument, options);
        }
export type GetAttachmentQueryHookResult = ReturnType<typeof useGetAttachmentQuery>;
export type GetAttachmentLazyQueryHookResult = ReturnType<typeof useGetAttachmentLazyQuery>;
export type GetAttachmentQueryResult = Apollo.QueryResult<GetAttachmentQuery, GetAttachmentQueryVariables>;
export const FetchPanelistPointHistoryDocument = gql`
    query FetchPanelistPointHistory($fetchPanelistPointHistory: FetchPanelistPointHistory!) {
  fetchPanelistPointHistory(fetchPanelistPointHistory: $fetchPanelistPointHistory) {
    pointHistory {
      id
      details
      panelistId
      points
      createdAt
      updatedAt
    }
    pagination {
      page
      limit
      totalCount
      totalPages
    }
  }
}
    `;

/**
 * __useFetchPanelistPointHistoryQuery__
 *
 * To run a query within a React component, call `useFetchPanelistPointHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPanelistPointHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPanelistPointHistoryQuery({
 *   variables: {
 *      fetchPanelistPointHistory: // value for 'fetchPanelistPointHistory'
 *   },
 * });
 */
export function useFetchPanelistPointHistoryQuery(baseOptions: Apollo.QueryHookOptions<FetchPanelistPointHistoryQuery, FetchPanelistPointHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPanelistPointHistoryQuery, FetchPanelistPointHistoryQueryVariables>(FetchPanelistPointHistoryDocument, options);
      }
export function useFetchPanelistPointHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPanelistPointHistoryQuery, FetchPanelistPointHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPanelistPointHistoryQuery, FetchPanelistPointHistoryQueryVariables>(FetchPanelistPointHistoryDocument, options);
        }
export type FetchPanelistPointHistoryQueryHookResult = ReturnType<typeof useFetchPanelistPointHistoryQuery>;
export type FetchPanelistPointHistoryLazyQueryHookResult = ReturnType<typeof useFetchPanelistPointHistoryLazyQuery>;
export type FetchPanelistPointHistoryQueryResult = Apollo.QueryResult<FetchPanelistPointHistoryQuery, FetchPanelistPointHistoryQueryVariables>;
export const FetchPaymentWithdrawalsDocument = gql`
    query FetchPaymentWithdrawals($paymentWithdrawalsInput: FetchPaymentWithdrawalsInput!) {
  fetchPaymentWithdrawals(paymentWithdrawalsInput: $paymentWithdrawalsInput) {
    paymentWithdrawals {
      id
      status
      panelistId
      points
      type
      panelist {
        id
        phone
        address
        city
        state
        zipCode
        gender
        user {
          firstName
          lastName
        }
      }
      createdAt
      updatedAt
    }
    pagination {
      page
      limit
      totalCount
      totalPages
    }
  }
}
    `;

/**
 * __useFetchPaymentWithdrawalsQuery__
 *
 * To run a query within a React component, call `useFetchPaymentWithdrawalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPaymentWithdrawalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPaymentWithdrawalsQuery({
 *   variables: {
 *      paymentWithdrawalsInput: // value for 'paymentWithdrawalsInput'
 *   },
 * });
 */
export function useFetchPaymentWithdrawalsQuery(baseOptions: Apollo.QueryHookOptions<FetchPaymentWithdrawalsQuery, FetchPaymentWithdrawalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPaymentWithdrawalsQuery, FetchPaymentWithdrawalsQueryVariables>(FetchPaymentWithdrawalsDocument, options);
      }
export function useFetchPaymentWithdrawalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPaymentWithdrawalsQuery, FetchPaymentWithdrawalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPaymentWithdrawalsQuery, FetchPaymentWithdrawalsQueryVariables>(FetchPaymentWithdrawalsDocument, options);
        }
export type FetchPaymentWithdrawalsQueryHookResult = ReturnType<typeof useFetchPaymentWithdrawalsQuery>;
export type FetchPaymentWithdrawalsLazyQueryHookResult = ReturnType<typeof useFetchPaymentWithdrawalsLazyQuery>;
export type FetchPaymentWithdrawalsQueryResult = Apollo.QueryResult<FetchPaymentWithdrawalsQuery, FetchPaymentWithdrawalsQueryVariables>;
export const UpdatePaymentWithdrawalsDocument = gql`
    mutation UpdatePaymentWithdrawals($paymentWithdrawalInput: UpdatePaymentWithdrawalRequest!) {
  updatePaymentWithdrawals(paymentWithdrawalInput: $paymentWithdrawalInput) {
    response {
      status
      error
      message
    }
    paymentWithdrawal {
      id
      status
      panelistId
      points
    }
  }
}
    `;
export type UpdatePaymentWithdrawalsMutationFn = Apollo.MutationFunction<UpdatePaymentWithdrawalsMutation, UpdatePaymentWithdrawalsMutationVariables>;

/**
 * __useUpdatePaymentWithdrawalsMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentWithdrawalsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentWithdrawalsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentWithdrawalsMutation, { data, loading, error }] = useUpdatePaymentWithdrawalsMutation({
 *   variables: {
 *      paymentWithdrawalInput: // value for 'paymentWithdrawalInput'
 *   },
 * });
 */
export function useUpdatePaymentWithdrawalsMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentWithdrawalsMutation, UpdatePaymentWithdrawalsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentWithdrawalsMutation, UpdatePaymentWithdrawalsMutationVariables>(UpdatePaymentWithdrawalsDocument, options);
      }
export type UpdatePaymentWithdrawalsMutationHookResult = ReturnType<typeof useUpdatePaymentWithdrawalsMutation>;
export type UpdatePaymentWithdrawalsMutationResult = Apollo.MutationResult<UpdatePaymentWithdrawalsMutation>;
export type UpdatePaymentWithdrawalsMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentWithdrawalsMutation, UpdatePaymentWithdrawalsMutationVariables>;
export const RemovePaymentWithdrawalsDocument = gql`
    mutation RemovePaymentWithdrawals($paymentWithdrawalInput: RemovePaymentWithdrawalRequest!) {
  removePaymentWithdrawals(paymentWithdrawalInput: $paymentWithdrawalInput) {
    response {
      status
      message
      name
    }
  }
}
    `;
export type RemovePaymentWithdrawalsMutationFn = Apollo.MutationFunction<RemovePaymentWithdrawalsMutation, RemovePaymentWithdrawalsMutationVariables>;

/**
 * __useRemovePaymentWithdrawalsMutation__
 *
 * To run a mutation, you first call `useRemovePaymentWithdrawalsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePaymentWithdrawalsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePaymentWithdrawalsMutation, { data, loading, error }] = useRemovePaymentWithdrawalsMutation({
 *   variables: {
 *      paymentWithdrawalInput: // value for 'paymentWithdrawalInput'
 *   },
 * });
 */
export function useRemovePaymentWithdrawalsMutation(baseOptions?: Apollo.MutationHookOptions<RemovePaymentWithdrawalsMutation, RemovePaymentWithdrawalsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePaymentWithdrawalsMutation, RemovePaymentWithdrawalsMutationVariables>(RemovePaymentWithdrawalsDocument, options);
      }
export type RemovePaymentWithdrawalsMutationHookResult = ReturnType<typeof useRemovePaymentWithdrawalsMutation>;
export type RemovePaymentWithdrawalsMutationResult = Apollo.MutationResult<RemovePaymentWithdrawalsMutation>;
export type RemovePaymentWithdrawalsMutationOptions = Apollo.BaseMutationOptions<RemovePaymentWithdrawalsMutation, RemovePaymentWithdrawalsMutationVariables>;
export const BulkUpdatePaymentWithdrawalRequestDocument = gql`
    mutation BulkUpdatePaymentWithdrawalRequest($bulkUpdatePaymentWithdrawalRequest: BulkUpdatePaymentWithdrawalRequest!) {
  bulkUpdatePaymentWithdrawalRequest(
    bulkUpdatePaymentWithdrawalRequest: $bulkUpdatePaymentWithdrawalRequest
  ) {
    response {
      status
      error
      message
      name
    }
    errors
  }
}
    `;
export type BulkUpdatePaymentWithdrawalRequestMutationFn = Apollo.MutationFunction<BulkUpdatePaymentWithdrawalRequestMutation, BulkUpdatePaymentWithdrawalRequestMutationVariables>;

/**
 * __useBulkUpdatePaymentWithdrawalRequestMutation__
 *
 * To run a mutation, you first call `useBulkUpdatePaymentWithdrawalRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkUpdatePaymentWithdrawalRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkUpdatePaymentWithdrawalRequestMutation, { data, loading, error }] = useBulkUpdatePaymentWithdrawalRequestMutation({
 *   variables: {
 *      bulkUpdatePaymentWithdrawalRequest: // value for 'bulkUpdatePaymentWithdrawalRequest'
 *   },
 * });
 */
export function useBulkUpdatePaymentWithdrawalRequestMutation(baseOptions?: Apollo.MutationHookOptions<BulkUpdatePaymentWithdrawalRequestMutation, BulkUpdatePaymentWithdrawalRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkUpdatePaymentWithdrawalRequestMutation, BulkUpdatePaymentWithdrawalRequestMutationVariables>(BulkUpdatePaymentWithdrawalRequestDocument, options);
      }
export type BulkUpdatePaymentWithdrawalRequestMutationHookResult = ReturnType<typeof useBulkUpdatePaymentWithdrawalRequestMutation>;
export type BulkUpdatePaymentWithdrawalRequestMutationResult = Apollo.MutationResult<BulkUpdatePaymentWithdrawalRequestMutation>;
export type BulkUpdatePaymentWithdrawalRequestMutationOptions = Apollo.BaseMutationOptions<BulkUpdatePaymentWithdrawalRequestMutation, BulkUpdatePaymentWithdrawalRequestMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($projectInput: CreateProjectInput!) {
  createProject(projectInput: $projectInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      projectInput: // value for 'projectInput'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($projectInput: UpdateProjectInput!) {
  updateProject(projectInput: $projectInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      projectInput: // value for 'projectInput'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const RemoveProjectDocument = gql`
    mutation RemoveProject($project: ProjectIdInput!) {
  removeProject(project: $project) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type RemoveProjectMutationFn = Apollo.MutationFunction<RemoveProjectMutation, RemoveProjectMutationVariables>;

/**
 * __useRemoveProjectMutation__
 *
 * To run a mutation, you first call `useRemoveProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectMutation, { data, loading, error }] = useRemoveProjectMutation({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useRemoveProjectMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectMutation, RemoveProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectMutation, RemoveProjectMutationVariables>(RemoveProjectDocument, options);
      }
export type RemoveProjectMutationHookResult = ReturnType<typeof useRemoveProjectMutation>;
export type RemoveProjectMutationResult = Apollo.MutationResult<RemoveProjectMutation>;
export type RemoveProjectMutationOptions = Apollo.BaseMutationOptions<RemoveProjectMutation, RemoveProjectMutationVariables>;
export const CreateProjectUserDocument = gql`
    mutation CreateProjectUser($projectInput: CreateProjectUserInput!) {
  createProjectUser(projectInput: $projectInput) {
    response {
      status
      message
      error
    }
    projectUser {
      id
      userId
      user {
        id
        firstName
        lastName
        roles {
          id
          role
        }
      }
    }
  }
}
    `;
export type CreateProjectUserMutationFn = Apollo.MutationFunction<CreateProjectUserMutation, CreateProjectUserMutationVariables>;

/**
 * __useCreateProjectUserMutation__
 *
 * To run a mutation, you first call `useCreateProjectUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectUserMutation, { data, loading, error }] = useCreateProjectUserMutation({
 *   variables: {
 *      projectInput: // value for 'projectInput'
 *   },
 * });
 */
export function useCreateProjectUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectUserMutation, CreateProjectUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectUserMutation, CreateProjectUserMutationVariables>(CreateProjectUserDocument, options);
      }
export type CreateProjectUserMutationHookResult = ReturnType<typeof useCreateProjectUserMutation>;
export type CreateProjectUserMutationResult = Apollo.MutationResult<CreateProjectUserMutation>;
export type CreateProjectUserMutationOptions = Apollo.BaseMutationOptions<CreateProjectUserMutation, CreateProjectUserMutationVariables>;
export const UpdateProjectUserDocument = gql`
    mutation UpdateProjectUser($projectInput: UpdateProjectUserInput!) {
  updateProjectUser(projectInput: $projectInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type UpdateProjectUserMutationFn = Apollo.MutationFunction<UpdateProjectUserMutation, UpdateProjectUserMutationVariables>;

/**
 * __useUpdateProjectUserMutation__
 *
 * To run a mutation, you first call `useUpdateProjectUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectUserMutation, { data, loading, error }] = useUpdateProjectUserMutation({
 *   variables: {
 *      projectInput: // value for 'projectInput'
 *   },
 * });
 */
export function useUpdateProjectUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectUserMutation, UpdateProjectUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectUserMutation, UpdateProjectUserMutationVariables>(UpdateProjectUserDocument, options);
      }
export type UpdateProjectUserMutationHookResult = ReturnType<typeof useUpdateProjectUserMutation>;
export type UpdateProjectUserMutationResult = Apollo.MutationResult<UpdateProjectUserMutation>;
export type UpdateProjectUserMutationOptions = Apollo.BaseMutationOptions<UpdateProjectUserMutation, UpdateProjectUserMutationVariables>;
export const RemoveProjectUserDocument = gql`
    mutation RemoveProjectUser($project: ProjectIdInput!) {
  removeProjectUser(project: $project) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type RemoveProjectUserMutationFn = Apollo.MutationFunction<RemoveProjectUserMutation, RemoveProjectUserMutationVariables>;

/**
 * __useRemoveProjectUserMutation__
 *
 * To run a mutation, you first call `useRemoveProjectUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectUserMutation, { data, loading, error }] = useRemoveProjectUserMutation({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useRemoveProjectUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectUserMutation, RemoveProjectUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectUserMutation, RemoveProjectUserMutationVariables>(RemoveProjectUserDocument, options);
      }
export type RemoveProjectUserMutationHookResult = ReturnType<typeof useRemoveProjectUserMutation>;
export type RemoveProjectUserMutationResult = Apollo.MutationResult<RemoveProjectUserMutation>;
export type RemoveProjectUserMutationOptions = Apollo.BaseMutationOptions<RemoveProjectUserMutation, RemoveProjectUserMutationVariables>;
export const FetchProjectStatsDocument = gql`
    query FetchProjectStats($project: ProjectIdInput!) {
  fetchProjectStats(project: $project) {
    response {
      status
      message
      error
    }
    stats {
      name
      companyName
      completedResponses
      terminatedResponses
      quotaResponses
      securityTerminateResponses
      initializedResponses
      supplierCompleteCapLeft
      completeCap
      quotaGroupId
    }
  }
}
    `;

/**
 * __useFetchProjectStatsQuery__
 *
 * To run a query within a React component, call `useFetchProjectStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectStatsQuery({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useFetchProjectStatsQuery(baseOptions: Apollo.QueryHookOptions<FetchProjectStatsQuery, FetchProjectStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchProjectStatsQuery, FetchProjectStatsQueryVariables>(FetchProjectStatsDocument, options);
      }
export function useFetchProjectStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchProjectStatsQuery, FetchProjectStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchProjectStatsQuery, FetchProjectStatsQueryVariables>(FetchProjectStatsDocument, options);
        }
export type FetchProjectStatsQueryHookResult = ReturnType<typeof useFetchProjectStatsQuery>;
export type FetchProjectStatsLazyQueryHookResult = ReturnType<typeof useFetchProjectStatsLazyQuery>;
export type FetchProjectStatsQueryResult = Apollo.QueryResult<FetchProjectStatsQuery, FetchProjectStatsQueryVariables>;
export const FetchProjectDocument = gql`
    query FetchProject($project: ProjectIdInput!) {
  fetchProject(project: $project) {
    response {
      status
      message
      error
    }
    project {
      id
      title
      description
      dataQuality
      projectUsers {
        id
        userId
        user {
          firstName
          lastName
          roles {
            id
            role
          }
        }
      }
    }
  }
}
    `;

/**
 * __useFetchProjectQuery__
 *
 * To run a query within a React component, call `useFetchProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectQuery({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useFetchProjectQuery(baseOptions: Apollo.QueryHookOptions<FetchProjectQuery, FetchProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchProjectQuery, FetchProjectQueryVariables>(FetchProjectDocument, options);
      }
export function useFetchProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchProjectQuery, FetchProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchProjectQuery, FetchProjectQueryVariables>(FetchProjectDocument, options);
        }
export type FetchProjectQueryHookResult = ReturnType<typeof useFetchProjectQuery>;
export type FetchProjectLazyQueryHookResult = ReturnType<typeof useFetchProjectLazyQuery>;
export type FetchProjectQueryResult = Apollo.QueryResult<FetchProjectQuery, FetchProjectQueryVariables>;
export const FetchAllProjectsDocument = gql`
    query FetchAllProjects($projectInput: FetchProjectsInput!) {
  fetchAllProjects(projectInput: $projectInput) {
    response {
      status
      message
      error
    }
    pagination {
      totalPages
      totalCount
      page
      limit
    }
    projects {
      id
      archive
      title
      description
      code
      email
      lifecycle
      methodology
      clientId
      security
      dataQuality
      client {
        id
        name
        clientNumber
      }
      projectUsers {
        id
        isHeadManager
        isSalesManager
        userId
        user {
          id
          firstName
          lastName
          roles {
            id
            role
          }
        }
      }
      quotaGroup {
        id
        name
        projectId
        surveyEntryLink
        completeCap
        completeCapLeft
        quota {
          id
          name
          type
        }
        supplierQuotaGroup {
          completeCap
          completeLink
          cpi
          id
          quotaFullLink
          securityLink
          terminateLink
          quotaGroupId
          securityLink
          surveyEntryLink
          supplierCompleteCapLeft
          completeCap
          supplierId
          offerId
          supplier {
            id
            name
            companyName
          }
        }
      }
    }
  }
}
    `;

/**
 * __useFetchAllProjectsQuery__
 *
 * To run a query within a React component, call `useFetchAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllProjectsQuery({
 *   variables: {
 *      projectInput: // value for 'projectInput'
 *   },
 * });
 */
export function useFetchAllProjectsQuery(baseOptions: Apollo.QueryHookOptions<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>(FetchAllProjectsDocument, options);
      }
export function useFetchAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>(FetchAllProjectsDocument, options);
        }
export type FetchAllProjectsQueryHookResult = ReturnType<typeof useFetchAllProjectsQuery>;
export type FetchAllProjectsLazyQueryHookResult = ReturnType<typeof useFetchAllProjectsLazyQuery>;
export type FetchAllProjectsQueryResult = Apollo.QueryResult<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>;
export const FetchAllQuotasDocument = gql`
    query FetchAllQuotas($fetchAllQuotasInput: FetchAllQuotasInput!) {
  fetchAllQuotas(fetchAllQuotasInput: $fetchAllQuotasInput) {
    response {
      status
      message
      error
    }
    pagination {
      totalPages
      totalCount
      page
      limit
    }
    quota {
      id
      name
      type
    }
  }
}
    `;

/**
 * __useFetchAllQuotasQuery__
 *
 * To run a query within a React component, call `useFetchAllQuotasQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllQuotasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllQuotasQuery({
 *   variables: {
 *      fetchAllQuotasInput: // value for 'fetchAllQuotasInput'
 *   },
 * });
 */
export function useFetchAllQuotasQuery(baseOptions: Apollo.QueryHookOptions<FetchAllQuotasQuery, FetchAllQuotasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllQuotasQuery, FetchAllQuotasQueryVariables>(FetchAllQuotasDocument, options);
      }
export function useFetchAllQuotasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllQuotasQuery, FetchAllQuotasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllQuotasQuery, FetchAllQuotasQueryVariables>(FetchAllQuotasDocument, options);
        }
export type FetchAllQuotasQueryHookResult = ReturnType<typeof useFetchAllQuotasQuery>;
export type FetchAllQuotasLazyQueryHookResult = ReturnType<typeof useFetchAllQuotasLazyQuery>;
export type FetchAllQuotasQueryResult = Apollo.QueryResult<FetchAllQuotasQuery, FetchAllQuotasQueryVariables>;
export const AddQuotaGroupsToProjectDocument = gql`
    mutation AddQuotaGroupsToProject($projectInput: AddQuotaGroupsToProject!) {
  addQuotaGroupsToProject(projectInput: $projectInput) {
    response {
      status
      message
      error
    }
    project {
      id
      quotaGroup {
        id
        name
        completeCap
        completeCapLeft
        quota {
          id
          name
          type
        }
      }
    }
  }
}
    `;
export type AddQuotaGroupsToProjectMutationFn = Apollo.MutationFunction<AddQuotaGroupsToProjectMutation, AddQuotaGroupsToProjectMutationVariables>;

/**
 * __useAddQuotaGroupsToProjectMutation__
 *
 * To run a mutation, you first call `useAddQuotaGroupsToProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddQuotaGroupsToProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addQuotaGroupsToProjectMutation, { data, loading, error }] = useAddQuotaGroupsToProjectMutation({
 *   variables: {
 *      projectInput: // value for 'projectInput'
 *   },
 * });
 */
export function useAddQuotaGroupsToProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddQuotaGroupsToProjectMutation, AddQuotaGroupsToProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddQuotaGroupsToProjectMutation, AddQuotaGroupsToProjectMutationVariables>(AddQuotaGroupsToProjectDocument, options);
      }
export type AddQuotaGroupsToProjectMutationHookResult = ReturnType<typeof useAddQuotaGroupsToProjectMutation>;
export type AddQuotaGroupsToProjectMutationResult = Apollo.MutationResult<AddQuotaGroupsToProjectMutation>;
export type AddQuotaGroupsToProjectMutationOptions = Apollo.BaseMutationOptions<AddQuotaGroupsToProjectMutation, AddQuotaGroupsToProjectMutationVariables>;
export const RemoveQuotaGroupDocument = gql`
    mutation RemoveQuotaGroup($removeQuotaGroupInput: RemoveQuotaGroupInput!) {
  removeQuotaGroup(removeQuotaGroupInput: $removeQuotaGroupInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type RemoveQuotaGroupMutationFn = Apollo.MutationFunction<RemoveQuotaGroupMutation, RemoveQuotaGroupMutationVariables>;

/**
 * __useRemoveQuotaGroupMutation__
 *
 * To run a mutation, you first call `useRemoveQuotaGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveQuotaGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeQuotaGroupMutation, { data, loading, error }] = useRemoveQuotaGroupMutation({
 *   variables: {
 *      removeQuotaGroupInput: // value for 'removeQuotaGroupInput'
 *   },
 * });
 */
export function useRemoveQuotaGroupMutation(baseOptions?: Apollo.MutationHookOptions<RemoveQuotaGroupMutation, RemoveQuotaGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveQuotaGroupMutation, RemoveQuotaGroupMutationVariables>(RemoveQuotaGroupDocument, options);
      }
export type RemoveQuotaGroupMutationHookResult = ReturnType<typeof useRemoveQuotaGroupMutation>;
export type RemoveQuotaGroupMutationResult = Apollo.MutationResult<RemoveQuotaGroupMutation>;
export type RemoveQuotaGroupMutationOptions = Apollo.BaseMutationOptions<RemoveQuotaGroupMutation, RemoveQuotaGroupMutationVariables>;
export const RemoveSupplierFromQuotaGroupDocument = gql`
    mutation RemoveSupplierFromQuotaGroup($removeSupplierToQuotaGroup: RemoveSupplierQuotaGroupInput!) {
  removeSupplierFromQuotaGroup(
    removeSupplierToQuotaGroup: $removeSupplierToQuotaGroup
  ) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type RemoveSupplierFromQuotaGroupMutationFn = Apollo.MutationFunction<RemoveSupplierFromQuotaGroupMutation, RemoveSupplierFromQuotaGroupMutationVariables>;

/**
 * __useRemoveSupplierFromQuotaGroupMutation__
 *
 * To run a mutation, you first call `useRemoveSupplierFromQuotaGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSupplierFromQuotaGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSupplierFromQuotaGroupMutation, { data, loading, error }] = useRemoveSupplierFromQuotaGroupMutation({
 *   variables: {
 *      removeSupplierToQuotaGroup: // value for 'removeSupplierToQuotaGroup'
 *   },
 * });
 */
export function useRemoveSupplierFromQuotaGroupMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSupplierFromQuotaGroupMutation, RemoveSupplierFromQuotaGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSupplierFromQuotaGroupMutation, RemoveSupplierFromQuotaGroupMutationVariables>(RemoveSupplierFromQuotaGroupDocument, options);
      }
export type RemoveSupplierFromQuotaGroupMutationHookResult = ReturnType<typeof useRemoveSupplierFromQuotaGroupMutation>;
export type RemoveSupplierFromQuotaGroupMutationResult = Apollo.MutationResult<RemoveSupplierFromQuotaGroupMutation>;
export type RemoveSupplierFromQuotaGroupMutationOptions = Apollo.BaseMutationOptions<RemoveSupplierFromQuotaGroupMutation, RemoveSupplierFromQuotaGroupMutationVariables>;
export const UpdateSupplierQuotaGroupDocument = gql`
    mutation UpdateSupplierQuotaGroup($updateSupplierQuotaGroupInput: UpdateSupplierQuotaGroupInput!) {
  updateSupplierQuotaGroup(
    updateSupplierQuotaGroupInput: $updateSupplierQuotaGroupInput
  ) {
    response {
      message
      error
      status
    }
  }
}
    `;
export type UpdateSupplierQuotaGroupMutationFn = Apollo.MutationFunction<UpdateSupplierQuotaGroupMutation, UpdateSupplierQuotaGroupMutationVariables>;

/**
 * __useUpdateSupplierQuotaGroupMutation__
 *
 * To run a mutation, you first call `useUpdateSupplierQuotaGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSupplierQuotaGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSupplierQuotaGroupMutation, { data, loading, error }] = useUpdateSupplierQuotaGroupMutation({
 *   variables: {
 *      updateSupplierQuotaGroupInput: // value for 'updateSupplierQuotaGroupInput'
 *   },
 * });
 */
export function useUpdateSupplierQuotaGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSupplierQuotaGroupMutation, UpdateSupplierQuotaGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSupplierQuotaGroupMutation, UpdateSupplierQuotaGroupMutationVariables>(UpdateSupplierQuotaGroupDocument, options);
      }
export type UpdateSupplierQuotaGroupMutationHookResult = ReturnType<typeof useUpdateSupplierQuotaGroupMutation>;
export type UpdateSupplierQuotaGroupMutationResult = Apollo.MutationResult<UpdateSupplierQuotaGroupMutation>;
export type UpdateSupplierQuotaGroupMutationOptions = Apollo.BaseMutationOptions<UpdateSupplierQuotaGroupMutation, UpdateSupplierQuotaGroupMutationVariables>;
export const AddSupplierToQuotaGroupDocument = gql`
    mutation AddSupplierToQuotaGroup($createSupplierQuotaGroupInput: CreateSupplierQuotaGroupInput!) {
  addSupplierToQuotaGroup(
    createSupplierQuotaGroupInput: $createSupplierQuotaGroupInput
  ) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type AddSupplierToQuotaGroupMutationFn = Apollo.MutationFunction<AddSupplierToQuotaGroupMutation, AddSupplierToQuotaGroupMutationVariables>;

/**
 * __useAddSupplierToQuotaGroupMutation__
 *
 * To run a mutation, you first call `useAddSupplierToQuotaGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSupplierToQuotaGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSupplierToQuotaGroupMutation, { data, loading, error }] = useAddSupplierToQuotaGroupMutation({
 *   variables: {
 *      createSupplierQuotaGroupInput: // value for 'createSupplierQuotaGroupInput'
 *   },
 * });
 */
export function useAddSupplierToQuotaGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddSupplierToQuotaGroupMutation, AddSupplierToQuotaGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSupplierToQuotaGroupMutation, AddSupplierToQuotaGroupMutationVariables>(AddSupplierToQuotaGroupDocument, options);
      }
export type AddSupplierToQuotaGroupMutationHookResult = ReturnType<typeof useAddSupplierToQuotaGroupMutation>;
export type AddSupplierToQuotaGroupMutationResult = Apollo.MutationResult<AddSupplierToQuotaGroupMutation>;
export type AddSupplierToQuotaGroupMutationOptions = Apollo.BaseMutationOptions<AddSupplierToQuotaGroupMutation, AddSupplierToQuotaGroupMutationVariables>;
export const UpdateQuotaGroupDocument = gql`
    mutation UpdateQuotaGroup($updateQuotaGroupInput: UpdateQuotaGroupInput!) {
  updateQuotaGroup(updateQuotaGroupInput: $updateQuotaGroupInput) {
    response {
      status
      error
      message
    }
  }
}
    `;
export type UpdateQuotaGroupMutationFn = Apollo.MutationFunction<UpdateQuotaGroupMutation, UpdateQuotaGroupMutationVariables>;

/**
 * __useUpdateQuotaGroupMutation__
 *
 * To run a mutation, you first call `useUpdateQuotaGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuotaGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuotaGroupMutation, { data, loading, error }] = useUpdateQuotaGroupMutation({
 *   variables: {
 *      updateQuotaGroupInput: // value for 'updateQuotaGroupInput'
 *   },
 * });
 */
export function useUpdateQuotaGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuotaGroupMutation, UpdateQuotaGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuotaGroupMutation, UpdateQuotaGroupMutationVariables>(UpdateQuotaGroupDocument, options);
      }
export type UpdateQuotaGroupMutationHookResult = ReturnType<typeof useUpdateQuotaGroupMutation>;
export type UpdateQuotaGroupMutationResult = Apollo.MutationResult<UpdateQuotaGroupMutation>;
export type UpdateQuotaGroupMutationOptions = Apollo.BaseMutationOptions<UpdateQuotaGroupMutation, UpdateQuotaGroupMutationVariables>;
export const FetchAllSuppliersDocument = gql`
    query FetchAllSuppliers($suppliersInput: FetchSuppliersInput!) {
  fetchAllSuppliers(suppliersInput: $suppliersInput) {
    response {
      status
      message
      error
    }
    pagination {
      totalPages
      totalCount
      page
      limit
    }
    suppliers {
      id
      email
      name
      companyName
      hashEnabled
      hashPrivetKey
      hashPrivetKeyVariableName
      surveyEntryLink
      completeLink
      terminateLink
      quotaFullLink
      securityLink
    }
  }
}
    `;

/**
 * __useFetchAllSuppliersQuery__
 *
 * To run a query within a React component, call `useFetchAllSuppliersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllSuppliersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllSuppliersQuery({
 *   variables: {
 *      suppliersInput: // value for 'suppliersInput'
 *   },
 * });
 */
export function useFetchAllSuppliersQuery(baseOptions: Apollo.QueryHookOptions<FetchAllSuppliersQuery, FetchAllSuppliersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllSuppliersQuery, FetchAllSuppliersQueryVariables>(FetchAllSuppliersDocument, options);
      }
export function useFetchAllSuppliersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllSuppliersQuery, FetchAllSuppliersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllSuppliersQuery, FetchAllSuppliersQueryVariables>(FetchAllSuppliersDocument, options);
        }
export type FetchAllSuppliersQueryHookResult = ReturnType<typeof useFetchAllSuppliersQuery>;
export type FetchAllSuppliersLazyQueryHookResult = ReturnType<typeof useFetchAllSuppliersLazyQuery>;
export type FetchAllSuppliersQueryResult = Apollo.QueryResult<FetchAllSuppliersQuery, FetchAllSuppliersQueryVariables>;
export const CreateSupplierDocument = gql`
    mutation CreateSupplier($supplierInput: CreateSupplierInput!) {
  createSupplier(supplierInput: $supplierInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type CreateSupplierMutationFn = Apollo.MutationFunction<CreateSupplierMutation, CreateSupplierMutationVariables>;

/**
 * __useCreateSupplierMutation__
 *
 * To run a mutation, you first call `useCreateSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSupplierMutation, { data, loading, error }] = useCreateSupplierMutation({
 *   variables: {
 *      supplierInput: // value for 'supplierInput'
 *   },
 * });
 */
export function useCreateSupplierMutation(baseOptions?: Apollo.MutationHookOptions<CreateSupplierMutation, CreateSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSupplierMutation, CreateSupplierMutationVariables>(CreateSupplierDocument, options);
      }
export type CreateSupplierMutationHookResult = ReturnType<typeof useCreateSupplierMutation>;
export type CreateSupplierMutationResult = Apollo.MutationResult<CreateSupplierMutation>;
export type CreateSupplierMutationOptions = Apollo.BaseMutationOptions<CreateSupplierMutation, CreateSupplierMutationVariables>;
export const UpdateSupplierDocument = gql`
    mutation UpdateSupplier($supplierInput: UpdateSupplierInput!) {
  updateSupplier(supplierInput: $supplierInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type UpdateSupplierMutationFn = Apollo.MutationFunction<UpdateSupplierMutation, UpdateSupplierMutationVariables>;

/**
 * __useUpdateSupplierMutation__
 *
 * To run a mutation, you first call `useUpdateSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSupplierMutation, { data, loading, error }] = useUpdateSupplierMutation({
 *   variables: {
 *      supplierInput: // value for 'supplierInput'
 *   },
 * });
 */
export function useUpdateSupplierMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSupplierMutation, UpdateSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSupplierMutation, UpdateSupplierMutationVariables>(UpdateSupplierDocument, options);
      }
export type UpdateSupplierMutationHookResult = ReturnType<typeof useUpdateSupplierMutation>;
export type UpdateSupplierMutationResult = Apollo.MutationResult<UpdateSupplierMutation>;
export type UpdateSupplierMutationOptions = Apollo.BaseMutationOptions<UpdateSupplierMutation, UpdateSupplierMutationVariables>;
export const RemoveSupplierDocument = gql`
    mutation RemoveSupplier($supplierInput: RemoveSupplierInput!) {
  removeSupplier(supplierInput: $supplierInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type RemoveSupplierMutationFn = Apollo.MutationFunction<RemoveSupplierMutation, RemoveSupplierMutationVariables>;

/**
 * __useRemoveSupplierMutation__
 *
 * To run a mutation, you first call `useRemoveSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSupplierMutation, { data, loading, error }] = useRemoveSupplierMutation({
 *   variables: {
 *      supplierInput: // value for 'supplierInput'
 *   },
 * });
 */
export function useRemoveSupplierMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSupplierMutation, RemoveSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSupplierMutation, RemoveSupplierMutationVariables>(RemoveSupplierDocument, options);
      }
export type RemoveSupplierMutationHookResult = ReturnType<typeof useRemoveSupplierMutation>;
export type RemoveSupplierMutationResult = Apollo.MutationResult<RemoveSupplierMutation>;
export type RemoveSupplierMutationOptions = Apollo.BaseMutationOptions<RemoveSupplierMutation, RemoveSupplierMutationVariables>;
export const FetchSurveyResultsDocument = gql`
    query FetchSurveyResults($projectResult: FetchProjectResults!) {
  fetchSurveyResults(projectResult: $projectResult) {
    response {
      status
      error
      message
    }
    pagination {
      page
      limit
      totalCount
      totalPages
    }
    results {
      id
      supplierQuotaGroup {
        id
        supplierId
        quotaGroupId
        completeCap
        cpi
        supplierCompleteCapLeft
        createdAt
        updatedAt
      }
      surveySource
      supplierQuotaGroupId
      panelistId
      projectId
      surveyResultStatus
      scamalyticsScore
      defenderApiScore
      ipAddress
      surveyEndTime
      surveyId
      surveyId
      transactionId
      cpi
      dataQualityScore
      maxMindScore
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useFetchSurveyResultsQuery__
 *
 * To run a query within a React component, call `useFetchSurveyResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchSurveyResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchSurveyResultsQuery({
 *   variables: {
 *      projectResult: // value for 'projectResult'
 *   },
 * });
 */
export function useFetchSurveyResultsQuery(baseOptions: Apollo.QueryHookOptions<FetchSurveyResultsQuery, FetchSurveyResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchSurveyResultsQuery, FetchSurveyResultsQueryVariables>(FetchSurveyResultsDocument, options);
      }
export function useFetchSurveyResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchSurveyResultsQuery, FetchSurveyResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchSurveyResultsQuery, FetchSurveyResultsQueryVariables>(FetchSurveyResultsDocument, options);
        }
export type FetchSurveyResultsQueryHookResult = ReturnType<typeof useFetchSurveyResultsQuery>;
export type FetchSurveyResultsLazyQueryHookResult = ReturnType<typeof useFetchSurveyResultsLazyQuery>;
export type FetchSurveyResultsQueryResult = Apollo.QueryResult<FetchSurveyResultsQuery, FetchSurveyResultsQueryVariables>;
export const RemoveSurveyResultsDocument = gql`
    mutation RemoveSurveyResults($projectResult: ProjectResultIdInput!) {
  removeSurveyResults(projectResult: $projectResult) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type RemoveSurveyResultsMutationFn = Apollo.MutationFunction<RemoveSurveyResultsMutation, RemoveSurveyResultsMutationVariables>;

/**
 * __useRemoveSurveyResultsMutation__
 *
 * To run a mutation, you first call `useRemoveSurveyResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSurveyResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSurveyResultsMutation, { data, loading, error }] = useRemoveSurveyResultsMutation({
 *   variables: {
 *      projectResult: // value for 'projectResult'
 *   },
 * });
 */
export function useRemoveSurveyResultsMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSurveyResultsMutation, RemoveSurveyResultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSurveyResultsMutation, RemoveSurveyResultsMutationVariables>(RemoveSurveyResultsDocument, options);
      }
export type RemoveSurveyResultsMutationHookResult = ReturnType<typeof useRemoveSurveyResultsMutation>;
export type RemoveSurveyResultsMutationResult = Apollo.MutationResult<RemoveSurveyResultsMutation>;
export type RemoveSurveyResultsMutationOptions = Apollo.BaseMutationOptions<RemoveSurveyResultsMutation, RemoveSurveyResultsMutationVariables>;
export const UpdateSurveyResultsDocument = gql`
    mutation UpdateSurveyResults($projectResult: UpdateProjectResultStatusInput!) {
  updateSurveyResults(projectResult: $projectResult) {
    response {
      status
      message
      error
    }
    projectResult {
      id
      panelistId
      surveyResultStatus
    }
  }
}
    `;
export type UpdateSurveyResultsMutationFn = Apollo.MutationFunction<UpdateSurveyResultsMutation, UpdateSurveyResultsMutationVariables>;

/**
 * __useUpdateSurveyResultsMutation__
 *
 * To run a mutation, you first call `useUpdateSurveyResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSurveyResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSurveyResultsMutation, { data, loading, error }] = useUpdateSurveyResultsMutation({
 *   variables: {
 *      projectResult: // value for 'projectResult'
 *   },
 * });
 */
export function useUpdateSurveyResultsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSurveyResultsMutation, UpdateSurveyResultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSurveyResultsMutation, UpdateSurveyResultsMutationVariables>(UpdateSurveyResultsDocument, options);
      }
export type UpdateSurveyResultsMutationHookResult = ReturnType<typeof useUpdateSurveyResultsMutation>;
export type UpdateSurveyResultsMutationResult = Apollo.MutationResult<UpdateSurveyResultsMutation>;
export type UpdateSurveyResultsMutationOptions = Apollo.BaseMutationOptions<UpdateSurveyResultsMutation, UpdateSurveyResultsMutationVariables>;
export const UpdateSurveyResultWithIdReConciliationDocument = gql`
    mutation UpdateSurveyResultWithIdReConciliation($projectResult: UpdateSurveyResultWithIdReConciliationInput!) {
  updateSurveyResultWithIdReConciliation(projectResult: $projectResult) {
    response {
      status
      error
      message
    }
  }
}
    `;
export type UpdateSurveyResultWithIdReConciliationMutationFn = Apollo.MutationFunction<UpdateSurveyResultWithIdReConciliationMutation, UpdateSurveyResultWithIdReConciliationMutationVariables>;

/**
 * __useUpdateSurveyResultWithIdReConciliationMutation__
 *
 * To run a mutation, you first call `useUpdateSurveyResultWithIdReConciliationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSurveyResultWithIdReConciliationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSurveyResultWithIdReConciliationMutation, { data, loading, error }] = useUpdateSurveyResultWithIdReConciliationMutation({
 *   variables: {
 *      projectResult: // value for 'projectResult'
 *   },
 * });
 */
export function useUpdateSurveyResultWithIdReConciliationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSurveyResultWithIdReConciliationMutation, UpdateSurveyResultWithIdReConciliationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSurveyResultWithIdReConciliationMutation, UpdateSurveyResultWithIdReConciliationMutationVariables>(UpdateSurveyResultWithIdReConciliationDocument, options);
      }
export type UpdateSurveyResultWithIdReConciliationMutationHookResult = ReturnType<typeof useUpdateSurveyResultWithIdReConciliationMutation>;
export type UpdateSurveyResultWithIdReConciliationMutationResult = Apollo.MutationResult<UpdateSurveyResultWithIdReConciliationMutation>;
export type UpdateSurveyResultWithIdReConciliationMutationOptions = Apollo.BaseMutationOptions<UpdateSurveyResultWithIdReConciliationMutation, UpdateSurveyResultWithIdReConciliationMutationVariables>;
export const FetchAllUsersDocument = gql`
    query FetchAllUsers($usersInput: UsersInput!) {
  fetchAllUsers(userInput: $usersInput) {
    response {
      status
      message
      error
    }
    users {
      id
      firstName
      lastName
      status
      email
      createdAt
      updatedAt
      emailVerified
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
    pagination {
      page
      limit
      totalCount
      totalPages
    }
  }
}
    `;

/**
 * __useFetchAllUsersQuery__
 *
 * To run a query within a React component, call `useFetchAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllUsersQuery({
 *   variables: {
 *      usersInput: // value for 'usersInput'
 *   },
 * });
 */
export function useFetchAllUsersQuery(baseOptions: Apollo.QueryHookOptions<FetchAllUsersQuery, FetchAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(FetchAllUsersDocument, options);
      }
export function useFetchAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllUsersQuery, FetchAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(FetchAllUsersDocument, options);
        }
export type FetchAllUsersQueryHookResult = ReturnType<typeof useFetchAllUsersQuery>;
export type FetchAllUsersLazyQueryHookResult = ReturnType<typeof useFetchAllUsersLazyQuery>;
export type FetchAllUsersQueryResult = Apollo.QueryResult<FetchAllUsersQuery, FetchAllUsersQueryVariables>;
export const DeactivateUserDocument = gql`
    mutation DeactivateUser($userInput: UserIdInput!) {
  deactivateUser(user: $userInput) {
    response {
      status
      message
      error
    }
    user {
      id
      firstName
      lastName
      status
      email
      emailVerified
      createdAt
      updatedAt
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export type DeactivateUserMutationFn = Apollo.MutationFunction<DeactivateUserMutation, DeactivateUserMutationVariables>;

/**
 * __useDeactivateUserMutation__
 *
 * To run a mutation, you first call `useDeactivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateUserMutation, { data, loading, error }] = useDeactivateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useDeactivateUserMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateUserMutation, DeactivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateUserMutation, DeactivateUserMutationVariables>(DeactivateUserDocument, options);
      }
export type DeactivateUserMutationHookResult = ReturnType<typeof useDeactivateUserMutation>;
export type DeactivateUserMutationResult = Apollo.MutationResult<DeactivateUserMutation>;
export type DeactivateUserMutationOptions = Apollo.BaseMutationOptions<DeactivateUserMutation, DeactivateUserMutationVariables>;
export const FetchAllRolesDocument = gql`
    query FetchAllRoles {
  fetchAllRoles {
    response {
      status
      error
      message
    }
    roles {
      id
      role
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useFetchAllRolesQuery__
 *
 * To run a query within a React component, call `useFetchAllRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllRolesQuery(baseOptions?: Apollo.QueryHookOptions<FetchAllRolesQuery, FetchAllRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllRolesQuery, FetchAllRolesQueryVariables>(FetchAllRolesDocument, options);
      }
export function useFetchAllRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllRolesQuery, FetchAllRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllRolesQuery, FetchAllRolesQueryVariables>(FetchAllRolesDocument, options);
        }
export type FetchAllRolesQueryHookResult = ReturnType<typeof useFetchAllRolesQuery>;
export type FetchAllRolesLazyQueryHookResult = ReturnType<typeof useFetchAllRolesLazyQuery>;
export type FetchAllRolesQueryResult = Apollo.QueryResult<FetchAllRolesQuery, FetchAllRolesQueryVariables>;
export const ActivateUserDocument = gql`
    mutation ActivateUser($userInput: UserIdInput!) {
  activateUser(user: $userInput) {
    response {
      status
      message
      error
    }
    user {
      id
      firstName
      lastName
      status
      email
      createdAt
      updatedAt
      emailVerified
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export type ActivateUserMutationFn = Apollo.MutationFunction<ActivateUserMutation, ActivateUserMutationVariables>;

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUserMutation, { data, loading, error }] = useActivateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useActivateUserMutation(baseOptions?: Apollo.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ActivateUserDocument, options);
      }
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>;
export type ActivateUserMutationResult = Apollo.MutationResult<ActivateUserMutation>;
export type ActivateUserMutationOptions = Apollo.BaseMutationOptions<ActivateUserMutation, ActivateUserMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($userInput: UpdateRoleInput!) {
  updateRole(user: $userInput) {
    response {
      status
      message
      error
    }
    user {
      id
      firstName
      lastName
      status
      email
      createdAt
      updatedAt
      emailVerified
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userInput: UpdateUserInput!) {
  updateUser(user: $userInput) {
    response {
      status
      error
      message
    }
    user {
      id
      firstName
      lastName
      status
      email
      createdAt
      updatedAt
      emailVerified
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($getUser: GetUser!) {
  getUser(getUser: $getUser) {
    response {
      status
      error
      message
    }
    user {
      id
      firstName
      lastName
      status
      email
      createdAt
      updatedAt
      emailVerified
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      getUser: // value for 'getUser'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const SearchUserDocument = gql`
    query SearchUser($searchUserInput: SearchUserInput!) {
  searchUser(searchUserInput: $searchUserInput) {
    response {
      status
      message
    }
    users {
      id
      firstName
      lastName
      status
      email
      createdAt
      updatedAt
      emailVerified
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      searchUserInput: // value for 'searchUserInput'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions: Apollo.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
      }
export function useSearchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = Apollo.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($updatePasswordInput: UpdatePasswordInput!) {
  updatePassword(updatePasswordInput: $updatePasswordInput) {
    response {
      status
      error
      message
    }
    user {
      id
      firstName
      lastName
      status
      email
      createdAt
      updatedAt
      emailVerified
      roles {
        id
        role
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      updatePasswordInput: // value for 'updatePasswordInput'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($userInput: UserIdInput!) {
  removeUser(user: $userInput) {
    response {
      status
      error
      message
    }
    user {
      id
    }
  }
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const CreateCpiDocument = gql`
    mutation CreateCpi($cpiInput: CreateCpiInput!) {
  createCpi(cpiInput: $cpiInput) {
    response {
      status
      message
      error
    }
  }
}
    `;
export type CreateCpiMutationFn = Apollo.MutationFunction<CreateCpiMutation, CreateCpiMutationVariables>;

/**
 * __useCreateCpiMutation__
 *
 * To run a mutation, you first call `useCreateCpiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCpiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCpiMutation, { data, loading, error }] = useCreateCpiMutation({
 *   variables: {
 *      cpiInput: // value for 'cpiInput'
 *   },
 * });
 */
export function useCreateCpiMutation(baseOptions?: Apollo.MutationHookOptions<CreateCpiMutation, CreateCpiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCpiMutation, CreateCpiMutationVariables>(CreateCpiDocument, options);
      }
export type CreateCpiMutationHookResult = ReturnType<typeof useCreateCpiMutation>;
export type CreateCpiMutationResult = Apollo.MutationResult<CreateCpiMutation>;
export type CreateCpiMutationOptions = Apollo.BaseMutationOptions<CreateCpiMutation, CreateCpiMutationVariables>;