import { getToken } from ".";
import { PanelistReviewStatus, PanelistSignupSource, PaymentWithdrawalStatus, UserGender, UserStatus } from "../generated";
import { stateOptionType } from "../interfaceTypes";

type ISearchState = {
  searchQuery: string;
  id: string;
  gender: UserGender | "all";
  state: stateOptionType | { value: "all"; state: "All" };
  country: string;
  status: UserStatus | "all";
  panelistReviewStatus: PanelistReviewStatus | "all";
  signupSource?: PanelistSignupSource | "all"
}

export const exportCsv = async (id: string = "", selectedSupplier?: string, selectedQuotaGroup?: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/survey/export`, {
      method: "post",
      body: JSON.stringify({ projectId: id, ...selectedSupplier ? { supplierId: selectedSupplier } : {}, ...selectedQuotaGroup ? { quotaGroupId: selectedQuotaGroup } : {} }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`
      }
    });
    const data = await response.blob();
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'suppliers-result.csv');
    document.body.appendChild(link);
    link.click();

  } catch (err) {
    console.error(err);
  }
};

export const exportCsvPanelPaymentRequest = async (id?: string, status?: PaymentWithdrawalStatus) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/paymentWithdrawalRequest/export`, {
      method: "post",
      body: JSON.stringify({
        ...id ? { panelistId: id } : {}
        // , ...status ? { status } : {}
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`
      }
    });
    const data = await response.blob();
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'suppliers-result.csv');
    document.body.appendChild(link);
    link.click();

  } catch (err) {
    console.error(err);
  }
}

export const exportCsvPanelist = async (searchState: ISearchState, startDate?: string, endDate?: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/panelist/export`, {
      method: "post",
      body: JSON.stringify({
        ...(searchState.searchQuery
          ? { searchQuery: searchState.searchQuery as string }
          : {}),
        ...(searchState.id ? { id: searchState.id as string } : {}),
        ...(searchState.gender !== "all"
          ? { gender: searchState.gender as UserGender }
          : {}),
        ...(searchState.state.value !== "all"
          ? { state: searchState.state.value as string }
          : {}),
        ...(searchState.country !== "all"
          ? { country: searchState.country as string }
          : {}),
        ...(searchState.status !== "all"
          ? { status: searchState.status as UserStatus }
          : {}),
        ...(searchState.panelistReviewStatus !== "all"
          ? {
            panelistReviewStatus:
              searchState.panelistReviewStatus as PanelistReviewStatus,
          }
          : {}),

        ...(searchState.signupSource !== 'all' ? { signupSource: searchState.signupSource } : {}),

        from: startDate ? `${startDate} 00:00` : null,
        to: endDate ? `${endDate} 23:59` : null,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`
      }
    })

    const data = await response.blob();
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'panelists.csv');
    link.click();

  } catch (error) {
    console.log(error)
  }
}