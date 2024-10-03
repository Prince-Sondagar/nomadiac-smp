import { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { EditPaymentRequestTypes } from "../../../../interfaceTypes";
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PaymentWithdrawalStatus, useUpdatePaymentWithdrawalsMutation } from "../../../../generated";
import { GRAPHQL_QUERY_POLICY } from "../../../../constants";
import { updatePaymentWithdrawalHandler } from "../../../../utils/project";
import { Alert } from "../../../../components/common/Alert";

export const EditPaymentRequest: FC<EditPaymentRequestTypes> = ({ open, refreshTable, setOpenUpdateModal, openUpdateModal }): JSX.Element => {
  const [status, setStatus] = useState<string | PaymentWithdrawalStatus>("");

  const [updatePaymentWithdrawal, { loading: Loading }] = useUpdatePaymentWithdrawalsMutation({
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
          handleClickClose();
          Alert.success(message ?? "Updated Successfully");
        }
      }
    },
  });

  const updateHandler = async () => {
    await updatePaymentWithdrawal({ variables: updatePaymentWithdrawalHandler(openUpdateModal as string, status as PaymentWithdrawalStatus) });
  }

  const handleClickClose = () => {
    setOpenUpdateModal(null);
    setStatus("");
  };

  return (
    <>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the status, please please select. We will send updates
            occasionally.
          </DialogContentText>
          <Box>
            <FormControl fullWidth sx={{ marginTop: '5px' }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value='REQUESTED'>Requested</MenuItem>
                <MenuItem value='DELIVERED'>Delivered</MenuItem>
                <MenuItem value='CANCELLED'>Canceled</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={() => updateHandler()} disabled={!status || Loading} endIcon={Loading && <CircularProgress size={20} color="inherit" />} >Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
