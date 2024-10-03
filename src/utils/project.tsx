import { RemovePaymentWithdrawalRequest } from "../generated";
import { Company, CreateCompanyInput, CreateProjectInput, CreateSupplierInput, CreateProjectUserInput, Maybe, Project, ProjectUser, Role, FetchProjectResults, PaginationInput, CreateCpiInput, UpdateProjectResultStatusInput, SurveyResultStatus, UserRole, ProjectResultIdInput, UpdateSupplierInput, CreateProjectQuotaGroupInput, CreateSupplierQuotaGroupInput, UpdateSupplierQuotaGroupInput, AddQuotaGroupsToProject, UpdateProjectUserInput, UpdateSurveyResultWithIdReConciliationInput, QuotaGroup, UpdatePanelistInput, UpdateQuotaGroupInput, UpdatePaymentWithdrawalRequest, PaymentWithdrawalStatus } from "../generated";
import { TNewProjectState } from "../pages/main/projects/projectCreate";

export const createProjectStateHandler = (project: TNewProjectState | any): { projectInput: CreateProjectInput } => {

  return {
    "projectInput": {
      "title": project.projectName,
      "code": project.clientProjectCode,
      "description": project.description,
      "methodology": project.projectMethodology,
      "clientId": project.clientCompany,
      "quotaGroup": [],
      "projectUsers": project.projectManagers?.map((manager: { name: String, value: string }): CreateProjectUserInput => ({
        "userId": manager.value,
        "isHeadManager": project.leadProjectManager === manager.value ? true : false,
        "isSalesManager": project.leadSalesManager === manager.value ? true : false,
      }))
    }
  }
};

export const updateProjectHandler = (project: Project) => {
  return {
    projectInput: {
      "id": project.id,
      "title": project.title,
      "archive": project.archive,
      "code": project.code,
      "clientId": project.clientId,
      "description": project.description,
      "methodology": project.methodology,
      "lifecycle": project.lifecycle,
      "security": project.security,
      "dataQuality": project.dataQuality
    }
  }
};

export const removeProjectHandler = (projectId: string) => {
  return {
    "project": {
      "id": projectId
    }
  }
};

export const createProjectUserHandler = (panel: { isHeadManager: boolean, isSalesManager: boolean }, userId: string, projectId: string): { projectInput: CreateProjectUserInput } => {
  return {
    "projectInput": {
      "userId": userId,
      "projectId": projectId,
      "isHeadManager": panel?.isHeadManager,
      "isSalesManager": panel?.isSalesManager
    }
  }
};

export const updateProjectUserHandler = (panel: { isHeadManager: boolean, isSalesManager: boolean }, userId: string): { projectInput: UpdateProjectUserInput } => {
  return {
    "projectInput": {
      "id": userId,
      "isHeadManager": panel?.isHeadManager,
      "isSalesManager": panel?.isSalesManager
    }
  }
};


export const removeProjectUserHandler = (userId: string) => {
  return {
    "project": {
      "id": userId
    }
  }
};

export const fetchSurveyResultsHandler = (projectId: string, filterSelection: { selectedSupplier: string | 0, selectedQuotaGroup: string | 0 }, paginationState: PaginationInput): { projectResult: FetchProjectResults } => {
  return {
    "projectResult": {
      "projectId": projectId,
      "supplierId": filterSelection.selectedSupplier ? filterSelection.selectedSupplier : "",
      "quotaGroupId": filterSelection.selectedQuotaGroup ? filterSelection.selectedQuotaGroup : "",
      "paginationOptions": {
        "page": paginationState.page,
        "limit": paginationState.limit
      }
    }
  }
};

export const removeSurveyResultHandler = (resultId: string): { projectResult: ProjectResultIdInput } => {
  return {
    "projectResult": {
      "id": resultId
    }
  }
};

export const updateSurveyResultHandler = (resultId: string, resultStatus: string): { projectResult: UpdateProjectResultStatusInput } => {
  return {
    "projectResult": {
      "id": resultId,
      "surveyResultStatus": resultStatus as SurveyResultStatus
    }
  }
};

export const createCpiHandler = (supplier: Maybe<ProjectUser>, cpi: string): { cpiInput: CreateCpiInput } => {
  const type: UserRole | any = (supplier?.user?.roles?.find((role: Maybe<Role>) => role?.role === "SUPPLIER" && role.role))?.role;
  return {
    "cpiInput": {
      "cpi": cpi,
      "type": type,
      "typeId": supplier?.id as string
    }
  }
};

export const createCompanyHandler = (company: CreateCompanyInput) => {
  return {
    "companyInput": {
      "name": company?.name,
      "email": company?.email,
      "clientNumber": company?.clientNumber
    }
  }
};

export const updateCompanyHandler = (company: Company) => {
  return {
    "companyInput": {
      "id": company?.id,
      "name": company?.name,
      "email": company?.email,
      "clientNumber": company?.clientNumber
    }
  }
};

export const createSupplierHandler = (supplier: CreateSupplierInput): { supplierInput: CreateSupplierInput } => {
  return {
    "supplierInput": {
      "name": supplier.name,
      "companyName": supplier.companyName,
      "email": supplier.email,
      "completeLink": supplier.completeLink,
      "terminateLink": supplier?.terminateLink,
      "securityLink": supplier?.securityLink,
      "quotaFullLink": supplier?.quotaFullLink,
    }
  }
};

export const updateSupplierHandler = (supplier: UpdateSupplierInput) => {

  return {
    "supplierInput": {
      "id": supplier?.id,
      "companyName": supplier.companyName,
      "name": supplier.name,
      "completeLink": supplier.completeLink,
      "terminateLink": supplier?.terminateLink,
      "securityLink": supplier?.securityLink,
      "quotaFullLink": supplier?.quotaFullLink,
      "hashPrivetKey": supplier?.hashPrivetKey,
      "hashPrivetKeyVariableName": supplier?.hashPrivetKeyVariableName,
      "hashEnabled": supplier?.hashEnabled
    }
  }
};

export const AddQuotaGroupsToProjectHandler = (quotaGroupInput: { projectId?: string, quotaGroup?: CreateProjectQuotaGroupInput }): { projectInput: AddQuotaGroupsToProject } => {
  return {
    "projectInput": {
      "id": quotaGroupInput?.projectId ?? "",
      "quotaGroup": [
        {
          "name": quotaGroupInput?.quotaGroup?.name ?? "",
          "quotaIds": quotaGroupInput?.quotaGroup?.quotaIds ?? [],
          "completeCap": quotaGroupInput?.quotaGroup?.completeCap || "",
          "surveyEntryLink": quotaGroupInput?.quotaGroup?.surveyEntryLink,
          "completeCapLeft": quotaGroupInput?.quotaGroup?.completeCap || "",
          "suppliers": quotaGroupInput?.quotaGroup?.suppliers?.map((user) => ({
            "completeLink": user.completeLink,
            "cpi": user.cpi,
            "projectId": quotaGroupInput?.projectId,
            "quotaFullLink": user.quotaFullLink,
            "quotaGroupId": quotaGroupInput?.quotaGroup?.quotaIds[0],
            "securityLink": user.securityLink,
            "completeCap": user.completeCap,
            "supplierCompleteCapLeft": user.supplierCompleteCapLeft,
            "surveyEntryLink": user.surveyEntryLink,
            "supplierId": user.supplierId,
            "terminateLink": user.terminateLink,
            "offerId": user?.offerId || ""
          })) ?? []
        }
      ]
    }
  }
};

export const updateSupplierQuotaGroupHandler = (data: UpdateSupplierQuotaGroupInput): { updateSupplierQuotaGroupInput: UpdateSupplierQuotaGroupInput } => {
  return {
    "updateSupplierQuotaGroupInput": {
      "completeCap": data?.completeCap,
      "quotaGroupId": data?.quotaGroupId,
      "surveyEntryLink": data?.surveyEntryLink,
      "completeLink": data?.completeLink,
      "terminateLink": data?.terminateLink,
      "quotaFullLink": data?.quotaFullLink,
      "securityLink": data?.securityLink,
      "cpi": data?.cpi,
      "supplierCompleteCapLeft": data?.supplierCompleteCapLeft,
      "id": data?.id,
      "offerId": data?.offerId || ""
    }
  }
};

export const addSupplierToQuotaGroupHandler = (data: CreateSupplierQuotaGroupInput): { createSupplierQuotaGroupInput: CreateSupplierQuotaGroupInput } => {
  return {
    "createSupplierQuotaGroupInput": {
      "completeCap": data?.completeCap,
      "completeLink": data?.completeLink,
      "cpi": data?.cpi,
      "projectId": data?.projectId,
      "quotaFullLink": data?.quotaFullLink,
      "quotaGroupId": data?.quotaGroupId,
      "securityLink": data?.securityLink,
      "supplierCompleteCapLeft": data?.supplierCompleteCapLeft,
      "supplierId": data?.supplierId,
      "surveyEntryLink": data?.surveyEntryLink,
      "terminateLink": data?.terminateLink
    }
  }
};

export const updateSupplierResultWithIdReconsiliatinHandler = ({ newsupplierId, newsupplierResult }: { newsupplierId: Array<string>, newsupplierResult: Array<SurveyResultStatus> | any }): { projectResult: UpdateSurveyResultWithIdReConciliationInput } => {
  return {
    "projectResult": {
      "resultIds": newsupplierId,
      "surveyResultStatuses": newsupplierResult
    }
  }
};

export const updateQuotaGroupHandler = (quotaGroup: Maybe<QuotaGroup>): { updateQuotaGroupInput: UpdateQuotaGroupInput } => {
  const { completeCapLeft } = quotaGroup || {}
  return {
    "updateQuotaGroupInput": {
      "id": quotaGroup?.id as string,
      "name": quotaGroup?.name,
      "surveyEntryLink": quotaGroup?.surveyEntryLink,
      "completeCap": quotaGroup?.completeCap,
      ...(completeCapLeft ? { completeCapLeft } : {})
    }
  }
};

export const updatePanelistHandler = (data: UpdatePanelistInput): { updatePanelistInput: UpdatePanelistInput } => {
  return {
    "updatePanelistInput": {
      "id": data?.id,
      "gender": data?.gender,
      "dob": data?.dob,
      "phone": data?.phone,
      "address": data?.address,
      "city": data?.city,
      "state": data?.state,
      "zipCode": data?.zipCode,
      "panelistReviewStatus": data?.panelistReviewStatus,
      "comment":data?.comment
    }
  }
};

export const updatePaymentWithdrawalHandler = (id: string, status: PaymentWithdrawalStatus): { paymentWithdrawalInput: UpdatePaymentWithdrawalRequest } => {
  return {
    "paymentWithdrawalInput": {
      "id": id,
      "status": status
    }
  }
};

export const removePaymentWithdrawalHandler = (id: string): { paymentWithdrawalInput: RemovePaymentWithdrawalRequest } => {
  return {
    "paymentWithdrawalInput": {
      "id": id
    }
  }
};

export const resendVerificationEmailHandler = (email: string) => {
  return {
    "resendVerificationEmail": {
      "email": email
    }
  }
};

export const bulkUpdatePaymentWithdrawalRequestHandler = (paymentWithdrawalRequestIds: any, paymentWithdrawalRequestStatuses: any) => {
  return {
    "bulkUpdatePaymentWithdrawalRequest": {
      paymentWithdrawalRequestIds: paymentWithdrawalRequestIds,
      paymentWithdrawalRequestStatuses: paymentWithdrawalRequestStatuses
    }
  }
}