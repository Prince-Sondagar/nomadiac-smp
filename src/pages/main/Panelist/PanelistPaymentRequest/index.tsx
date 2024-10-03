import {
  Box,
  CardHeader,
  Tooltip,
  Button,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import PaymentRequestTable from "./PaymentRequestTable";
import { GRAPHQL_QUERY_POLICY } from "../../../../constants";
import { FC, useEffect, useState } from "react";
import {
  PaginationInput,
  PaginationPayload,
  PaymentWithdrawal,
  PaymentWithdrawalStatus,
  useFetchPaymentWithdrawalsLazyQuery,
  useBulkUpdatePaymentWithdrawalRequestMutation
} from "../../../../generated";
import Pagination from "../../../../components/pagination/Pagination";
import { useLocation, useParams } from "react-router-dom";
import { Download } from "@mui/icons-material";
import { exportCsvPanelPaymentRequest } from "../../../../utils/CsvDownload";
import { Alert } from "../../../../components/common/Alert";
import PanelistPointHistory from "../PanelistPointHistory";
import PanelistSurveyResult from "../PanelistSurveyResult";

interface Props {
  isNavTab?: boolean;
}

export const PanelistPaymentRequest: FC<Props> = ({ isNavTab }) => {
  const location = useLocation();
  const { id: panelistId = "" } = useParams();
  const { state: userDetail } = location;

  const [status, setStatus] = useState<string>("idle");
  const [panelistPaymentRequests, setPanelistPaymentRequests] = useState<PaymentWithdrawal[]>([]);
  const [paginationState, setPaginationState] = useState<PaginationInput>({ page: 1, limit: 50 });

  const [pagination, setPagination] = useState<PaginationPayload>({});
  const [filterStatus, setFilterStatus] = useState<PaymentWithdrawalStatus | "all">(isNavTab ? PaymentWithdrawalStatus.Requested : "all");
  const [selectedSupplierForUpdate, setSelectedSupplierForUpdate] = useState<{ ids: string[], status?: PaymentWithdrawalStatus }>({ ids: [] });
  const [fetchPaymentWithdrawals, { loading, refetch }] = useFetchPaymentWithdrawalsLazyQuery({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted({ fetchPaymentWithdrawals }) {
      if (fetchPaymentWithdrawals) {
        const list = fetchPaymentWithdrawals?.paymentWithdrawals;
        setPanelistPaymentRequests(list as PaymentWithdrawal[]);
        const paginationData = fetchPaymentWithdrawals?.pagination;
        if (paginationData) setPagination(paginationData);
        else setPagination({});
      } else setPanelistPaymentRequests([]);
    }
  });

  const handleFetchPaymentWithdrawals = () => {
    fetchPaymentWithdrawals({
      variables: {
        paymentWithdrawalsInput: {
          panelistId,
          paginationOptions: {
            limit: paginationState?.limit,
            page: paginationState?.page,
          },
          ...(isNavTab ? { status: PaymentWithdrawalStatus.Requested } : filterStatus !== "all" ? { status: filterStatus } : {}),
        },
      },
    });
  };

  useEffect(() => {
    handleFetchPaymentWithdrawals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationState, filterStatus, isNavTab]);

  const onDownload = () => {
    setStatus("loading");
    exportCsvPanelPaymentRequest(panelistId, filterStatus !== "all" ? filterStatus : undefined);
    setStatus("success");
  };

  const [bulkUpdatePaymentMutation, { loading: updatePaymentLoading }] =
    useBulkUpdatePaymentWithdrawalRequestMutation({
      ...(GRAPHQL_QUERY_POLICY as any),
      onError(error) {
        Alert.error(error?.message ?? "Updated Successfully");
      },
      onCompleted({ bulkUpdatePaymentWithdrawalRequest }) {
        const { response } = bulkUpdatePaymentWithdrawalRequest;
        if (response) {
          const { message, status } = response;
          if (status === 200) {
            Alert.success(message ?? "Updated Successfully");
            setSelectedSupplierForUpdate({ ids: [] });
            refetch();
          }
        }
      },
    });

  const handleBulkUpdate = async () => {
    await bulkUpdatePaymentMutation({
      variables: {
        bulkUpdatePaymentWithdrawalRequest: {
          paymentWithdrawalRequestIds: selectedSupplierForUpdate.ids ?? [],
          paymentWithdrawalRequestStatuses: Array(selectedSupplierForUpdate.ids.length).fill(selectedSupplierForUpdate.status) ?? [],
        }
      },
    });
  }

  return (
    <Box>
      <CardHeader title={<Typography variant="h6" fontWeight={600}>{panelistId ? `${userDetail} (Payment Request)` : "All Payment Requests"}</Typography>} />
      <Box width={"100%"} sx={{ display: "flex", justifyContent: "end" }}>
        {!isNavTab && (
          <FormControl sx={{ mr: 2, width: "250px" }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              label="Status"
              name="status"
              value={filterStatus}
              onChange={({ target }) => setFilterStatus(target.value as PaymentWithdrawalStatus)}>
              <MenuItem value={"all"}>All</MenuItem>
              {Object.keys(PaymentWithdrawalStatus).map((status, i) => (<MenuItem key={i} value={(PaymentWithdrawalStatus as any)[status]}>{status}</MenuItem>))}
            </Select>
          </FormControl>
        )}
        {selectedSupplierForUpdate.ids.length ? (
          <Box width={"100%"} sx={{ display: "flex", justifyContent: "right" }}>
            <FormControl sx={{ width: "250px" }}>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                label="Status"
                name="status"
                value={selectedSupplierForUpdate.status}
                onChange={({ target }) => setSelectedSupplierForUpdate({ ...selectedSupplierForUpdate, status: target.value as any })}
              >
                {Object.keys(PaymentWithdrawalStatus).map((status, i) => (<MenuItem key={i} value={(PaymentWithdrawalStatus as any)[status]}>{status}</MenuItem>))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ whiteSpace: "nowrap", padding: "6px", fontSize: "14px", px: 2, ml: 2 }}
              onClick={handleBulkUpdate}
              disabled={!selectedSupplierForUpdate.ids?.length || !selectedSupplierForUpdate?.status || updatePaymentLoading}
            >
              Update
            </Button>
          </Box>
        ) : ""}
        <Tooltip title="Export CSV" sx={{ mr: 2 }} placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ whiteSpace: "nowrap", padding: "6px", fontSize: "14px", ml: 2 }}
            onClick={onDownload}
            disabled={status === "loading"}
          // endIcon={status === "loading" && (<CircularProgress size={20} color="inherit" />)}
          >
            <Download />
          </Button>
        </Tooltip>
      </Box>
      <Box>
        <PaymentRequestTable
          panelistPaymentRequests={panelistPaymentRequests}
          isLoading={loading}
          refreshTable={refetch}
          isNavTab={isNavTab}
          selectedSupplierIds={selectedSupplierForUpdate.ids}
          setSelectedSupplierIds={(ids: string[]) => setSelectedSupplierForUpdate({ ...selectedSupplierForUpdate, ids })}
        />
      </Box>
      {panelistPaymentRequests?.length ? <Pagination pagination={pagination} paginationState={paginationState} setPaginationState={setPaginationState} /> : ""}
      {panelistId && (
        <Box>
          <PanelistPointHistory />
          <PanelistSurveyResult />
        </Box>
      )}
      {/* Export Surveys */}
      {/* {!isNavTab && <ExportSurveys panelistPaymentRequests={panelistPaymentRequests} refetchTableData={refetch} />} */}
    </Box>
  );
};
