import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  ListItemIcon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { DeleteForever, MoreVertOutlined, Create, Visibility, Summarize, Scoreboard } from "@mui/icons-material";
import {
  capitalizeFirstLetter,
  formatDate,
  getColorForPaymentRequestStatus,
} from "../../../../utils";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CustomReactLink, ProjectTableStyle } from "../../../../theme/styleComponents";
import { EditPaymentRequest } from "./EditPaymentRequest";
import {
  PaymentWithdrawal,
  PaymentWithdrawalStatus,
  useRemovePaymentWithdrawalsMutation,
  useUpdatePaymentWithdrawalsMutation,
} from "../../../../generated";
import TableLoader from "../../../../components/common/TableLoader";
import NoDataFoundComponent from "../../../../components/common/NoDataFoundComponent";
import ConfirmationModal from "../../../../components/common/ConfirmationDelete";
import { GRAPHQL_QUERY_POLICY, PANEL_ROUTE, PAYMENT_REQUEST, POINT_HISTORY_ROUTE, SURVEY_HISTORY_ROUTE } from "../../../../constants";
import { removePaymentWithdrawalHandler, updatePaymentWithdrawalHandler } from "../../../../utils/project";
import { Alert } from "../../../../components/common/Alert";

type PanelistPaymentRequestTable = {
  panelistPaymentRequests: PaymentWithdrawal[];
  isLoading: boolean;
  refreshTable: Function;
  isNavTab?: boolean;
  selectedSupplierIds: string[],
  setSelectedSupplierIds: any
};

const PaymentRequestTable = ({
  panelistPaymentRequests,
  isLoading,
  refreshTable,
  isNavTab,
  selectedSupplierIds,
  setSelectedSupplierIds
}: PanelistPaymentRequestTable) => {
  const [menuStates, setMenuStates] = useState<{ anchorEl: HTMLElement; open: false }[]>([]);

  const [openUpdateModal, setOpenUpdateModal] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<string | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState<{ panelId: string; status: "approved" | "rejected" | null }>({ panelId: "", status: null });

  const [removePaymentWithdrawal, { loading: RemoveRequestLoading }] =
    useRemovePaymentWithdrawalsMutation({
      ...(GRAPHQL_QUERY_POLICY as any),
      onError(error) {
        Alert.error(error?.message ?? "Updated Successfully");
      },
      onCompleted({ removePaymentWithdrawals }) {
        const { response } = removePaymentWithdrawals;
        if (response) {
          const { message, status } = response;
          if (status === 200) {
            refreshTable();
            setOpenDeleteModal(null);
            Alert.success(message ?? "Updated Successfully");
          }
        }
      },
    });

  const [updatePaymentWithdrawal, { loading: updatePRLoading }] = useUpdatePaymentWithdrawalsMutation({
    ...(GRAPHQL_QUERY_POLICY as any),
    onError(error) {
      Alert.error(error?.message);
    },
    onCompleted({ updatePaymentWithdrawals }) {
      const { response } = updatePaymentWithdrawals
      if (response) {
        const { message, status } = response;
        if (status === 200) {
          refreshTable();
          setOpenConfirmModal({ panelId: "", status: null });
          Alert.success(message ?? "Updated Successfully");
        }
      }
    },
  });

  const handleDeleteRequest = async () => {
    await removePaymentWithdrawal({
      variables: removePaymentWithdrawalHandler(openDeleteModal as string),
    });
  };

  const handleClickOpen = (id: string) => {
    setOpenUpdateModal(id);
  };

  const handleMenuOpen = ({
    e,
    index,
  }: {
    e: React.MouseEvent<HTMLElement>;
    index: number;
  }) => {
    const newMenuStates = [...menuStates] as any;
    newMenuStates[index] = {
      anchorEl: e?.currentTarget,
      open: true,
    };
    setMenuStates(newMenuStates);
  };

  const handleMenuClose = (index: number) => {
    const newMenuStates = [...menuStates] as any;
    newMenuStates[index] = {
      anchorEl: null,
      open: false,
    };
    setMenuStates(newMenuStates);
  };

  const handleConfirmRequest = async () => {
    const status = openConfirmModal.status === "approved" ? PaymentWithdrawalStatus.Delivered : openConfirmModal.status === "rejected" ? PaymentWithdrawalStatus.Cancelled : "";
    if (status)
      await updatePaymentWithdrawal({ variables: updatePaymentWithdrawalHandler(openConfirmModal.panelId, status) });
  }

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.checked) {
      setSelectedSupplierIds([...selectedSupplierIds, id]);
    } else {
      setSelectedSupplierIds(selectedSupplierIds.filter((selectedId: any) => selectedId !== id));
    }
  };

  const handleSelectAll = (event: any) => {
    if (event.target.checked) {
      const newSelected = panelistPaymentRequests.map((paymentRequest) => paymentRequest?.id);
      setSelectedSupplierIds(newSelected);
    } else setSelectedSupplierIds([]);
  }

  const isSelected = (id: any): boolean => selectedSupplierIds.indexOf(id) !== -1;

  return (
    <Box className="table-overflow" pt={4}>
      <ProjectTableStyle>
        <TableContainer component={Paper}>
          <Box>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead sx={{ backgroundColor: "#edced0" }}>
                <TableRow>
                  <TableCell>
                    {panelistPaymentRequests.length > 0 &&
                      <Checkbox
                        onChange={handleSelectAll}
                        indeterminate={selectedSupplierIds.length > 0 && selectedSupplierIds.length < panelistPaymentRequests.length}
                        checked={panelistPaymentRequests.length > 0 && selectedSupplierIds.length === panelistPaymentRequests.length}
                      />}
                  </TableCell>
                  <TableCell>ID</TableCell>
                  {isNavTab ? <TableCell>User</TableCell> : ""}
                  <TableCell>Points</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Demanded At</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                  {isNavTab && (
                    <TableCell></TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <TableLoader numberOfRows={10} numberOfColumns={6} />
                    </TableCell>
                  </TableRow>
                ) : (
                  panelistPaymentRequests?.map((paymentRequest, index) => {
                    const { id, status, points, createdAt, updatedAt, panelist, type } = paymentRequest || {};
                    const { user, id: panelistId } = panelist || {};
                    const { firstName, lastName } = user || {};
                    const name = `${firstName || ""} ${lastName || ""}`
                    return (
                      <TableRow key={id} selected={isSelected(id)}>
                        <TableCell>
                          <Checkbox onChange={(event) => handleCheckBoxChange(event, id)} checked={isSelected(id)} />
                        </TableCell>
                        <TableCell>{index + 1}</TableCell>
                        {isNavTab ? <TableCell>{capitalizeFirstLetter(name.trim())}</TableCell> : ""}
                        <TableCell>{points}</TableCell>
                        <TableCell>{capitalizeFirstLetter(`${type?.split("_")?.join(" ")}`)}</TableCell>
                        <TableCell>
                          <Chip label={capitalizeFirstLetter(status ?? "") ?? ""} color={getColorForPaymentRequestStatus(status)} />
                        </TableCell>
                        <TableCell>{formatDate(+updatedAt)}</TableCell>
                        <TableCell>{formatDate(+createdAt)}</TableCell>
                        {isNavTab ?
                          (<TableCell>
                            <Button variant="contained" sx={{ mr: 2 }} onClick={() => setOpenConfirmModal({ panelId: id, status: "approved" })}>Approved</Button>
                            <Button variant="outlined" onClick={() => setOpenConfirmModal({ panelId: id, status: "rejected" })}>Rejected</Button>
                          </TableCell>) : (<TableCell>
                            <div>
                              <IconButton
                                aria-label="more"
                                aria-controls={
                                  menuStates[index]?.open
                                    ? "long-menu"
                                    : undefined
                                }
                                aria-expanded={
                                  menuStates[index]?.open ? "true" : undefined
                                }
                                aria-haspopup="true"
                                onClick={(e) => handleMenuOpen({ e, index })}
                              >
                                <MoreVertOutlined />
                              </IconButton>
                              <Menu
                                MenuListProps={{
                                  "aria-labelledby": "long-button",
                                }}
                                anchorEl={menuStates[index]?.anchorEl}
                                open={menuStates[index]?.open}
                                onClose={() => handleMenuClose(index)}
                              >
                                <MenuItem
                                  onClick={() => {
                                    handleClickOpen(id);
                                    handleMenuClose(index);
                                  }}
                                >
                                  <ListItemIcon>
                                    <Create
                                      color="primary"
                                      sx={{ paddingTop: "2px" }}
                                    />
                                  </ListItemIcon>
                                  Update
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    setOpenDeleteModal(id);
                                    handleMenuClose(index);
                                  }}
                                >
                                  <ListItemIcon>
                                    <DeleteForever
                                      color="primary"
                                      sx={{ paddingTop: "2px" }}
                                    />
                                  </ListItemIcon>
                                  Remove
                                </MenuItem>
                              </Menu>
                            </div>
                          </TableCell>)}
                        {isNavTab && (
                          <TableCell>
                            <div>
                              <IconButton
                                aria-label="more"
                                aria-controls={
                                  menuStates[index]?.open ? "long-menu" : undefined
                                }
                                aria-expanded={
                                  menuStates[index]?.open ? "true" : undefined
                                }
                                aria-haspopup="true"
                                onClick={(e) => handleMenuOpen({ e, index })}
                              >
                                <MoreVertOutlined />
                              </IconButton>

                              <Menu
                                MenuListProps={{ "aria-labelledby": "long-button" }}
                                anchorEl={menuStates[index]?.anchorEl}
                                open={menuStates[index]?.open}
                                onClose={() => handleMenuClose(index)}
                              >
                                <MenuItem onClick={() => handleMenuClose(index)}>
                                  <CustomReactLink
                                    to={`${PANEL_ROUTE}/${panelistId}${PAYMENT_REQUEST}`}
                                    state={`${firstName} ${lastName}`}
                                  >
                                    <ListItemIcon>
                                      <Visibility
                                        color="primary"
                                        sx={{ paddingTop: "2px" }}
                                      />
                                    </ListItemIcon>
                                    View Detail
                                  </CustomReactLink>
                                </MenuItem>

                                <MenuItem onClick={() => handleMenuClose(index)}>
                                  <CustomReactLink
                                    to={`${PANEL_ROUTE}/${panelistId}${SURVEY_HISTORY_ROUTE}`}
                                    state={`${firstName} ${lastName}`}
                                  >
                                    <ListItemIcon>
                                      <Summarize
                                        color="primary"
                                        sx={{ paddingTop: "2px" }}
                                      />
                                    </ListItemIcon>
                                    Survey History
                                  </CustomReactLink>
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClose(index)}>
                                  <CustomReactLink
                                    to={`${PANEL_ROUTE}/${panelistId}${POINT_HISTORY_ROUTE}`}
                                  >
                                    <ListItemIcon>
                                      <Scoreboard
                                        color="primary"
                                        sx={{ paddingTop: "2px" }}
                                      />
                                    </ListItemIcon>
                                    Point History
                                  </CustomReactLink>
                                </MenuItem>
                              </Menu>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </Box>
        </TableContainer >
      </ProjectTableStyle >
      {
        !isLoading && !panelistPaymentRequests?.length && (
          <Box display="flex" justifyContent="center" pb={12} pt={5}>
            <NoDataFoundComponent />
          </Box>
        )
      }
      <EditPaymentRequest
        handleClickOpen={handleClickOpen}
        open={!!openUpdateModal}
        refreshTable={refreshTable}
        setOpenUpdateModal={setOpenUpdateModal}
        openUpdateModal={openUpdateModal}
      />
      <ConfirmationModal
        title="Remove Payment Withdrawal"
        isOpen={!!openDeleteModal}
        isLoading={RemoveRequestLoading}
        description={`Are you sure you want to remove this Request?`}
        handleDelete={handleDeleteRequest}
        setOpen={setOpenDeleteModal}
        actionText="Remove"
      />
      <ConfirmationModal
        title={openConfirmModal.status === "approved" ? "Approve payment request" : openConfirmModal.status === "rejected" ? "Reject Payment request" : ""}
        isOpen={!!openConfirmModal.panelId}
        isLoading={updatePRLoading}
        description={`Are you sure you want to confirm this Request?`}
        handleDelete={handleConfirmRequest}
        setOpen={() => setOpenConfirmModal({ panelId: "", status: null })}
        actionText={openConfirmModal.status === "approved" ? "Approve" : openConfirmModal.status === "rejected" ? "Reject" : ""}
      />
    </Box >
  );
};

export default PaymentRequestTable;
