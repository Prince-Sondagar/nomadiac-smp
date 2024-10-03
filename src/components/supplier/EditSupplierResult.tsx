import { Button, CircularProgress, Dialog, DialogTitle, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { Dispatch, SetStateAction, useState } from 'react'
import { GRAPHQL_QUERY_POLICY } from '../../constants';
import { useUpdateSurveyResultsMutation } from '../../generated';
import { updateSurveyResultHandler } from '../../utils/project';

type IEditSupplierResult = {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    result: Array<string>;
    refreshTable: Function;
    setIsCheck: Dispatch<SetStateAction<string[]>>;
    setIsCheckAll: Dispatch<SetStateAction<boolean>>;
}

const style = {
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const RESULT_STATUS_OPTION = ["COMPLETED", "TERMINATE", "QUOTA", "SECURITY_TERMINATE"];

const EditSupplierResult = ({ isOpen, setOpen, result, refreshTable, setIsCheck, setIsCheckAll }: IEditSupplierResult) => {
    const [resultStatus, setResultStatus] = useState<string>("COMPLETED");
    const { enqueueSnackbar } = useSnackbar();
    const [updateSurveyResults, { loading: updateLoading }] = useUpdateSurveyResultsMutation({
        ...(GRAPHQL_QUERY_POLICY as any)
    });

    const EditResultHandler = async () => {
        if (result?.length && resultStatus) {
            Promise.all(
                result?.map((item: string) =>
                    updateSurveyResults({ variables: updateSurveyResultHandler(item, resultStatus) })
                )
            ).then(async () => {
                await refreshTable();
            });
            setResultStatus("COMPLETED");
            setIsCheck([]);
            setIsCheckAll(false);
            setOpen(!isOpen);
            enqueueSnackbar("Survey result updated successfully!!");
        }
        else enqueueSnackbar("There is some Error");
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => setOpen(!isOpen)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogTitle id="alert-dialog-title">Edit Survey Result</DialogTitle>
            <Box sx={style}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="body2">Result Status</Typography>
                        <FormControl fullWidth>
                            <Select value={resultStatus} onChange={({ target: { value } }) => setResultStatus(value)}>
                                {RESULT_STATUS_OPTION?.map((status: string, index: number) => <MenuItem key={index} value={status}>{status}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box display='flex' alignItems='center' justifyContent='space-between' mt={5}>
                    <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={updateLoading} color="primary" onClick={EditResultHandler}
                        endIcon={updateLoading && <CircularProgress size={20} color="inherit" />}
                    >Submit</Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default EditSupplierResult;