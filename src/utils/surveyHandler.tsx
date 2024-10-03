import { FetchPanelistPointHistory, PaginationInput } from "../generated"

export const fetchPointHistoryHandler = (id: string, paginationState: PaginationInput): { fetchPanelistPointHistory: FetchPanelistPointHistory } => {
    return {
      "fetchPanelistPointHistory": {
        "panelistId": id,
        "paginationOptions": {
          "limit": paginationState?.limit,
          "page": paginationState?.page
        }
      }
    }
}