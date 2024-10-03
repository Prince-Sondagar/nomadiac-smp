import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PaymentWithdrawal, useBulkUpdatePaymentWithdrawalRequestMutation } from "../../../../generated";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { PaymentWithdrawalStatus } from "../../../../generated";
import { Alert } from "../../../../components/common/Alert";
import { GRAPHQL_QUERY_POLICY } from "../../../../constants";
import { FC, FormEvent } from "react";

const detailSchema = Yup.object().shape({
  supplierIds: Yup.string().required('Supplier Ids is required'),
  supplierResults: Yup.string().required('Supplier Results is required').test('valid-supplierResults', 'Invalid supplier Results value', (value, ctx) => {
    if (!value) return true;
    const supplierResultsArray = value.split(',');
    if (ctx.parent.supplierIds.split(",").length !== supplierResultsArray.length) return false;
    return !supplierResultsArray.filter((supplierResult: string) => {
      return Object.keys(PaymentWithdrawalStatus).includes(supplierResult);
    }).length;
  }),
});

type PanelistPaymentRequestType = {
  panelistPaymentRequests: PaymentWithdrawal[];
  refetchTableData: Function;
};

export const ExportSurveys: FC<PanelistPaymentRequestType> = ({ panelistPaymentRequests, refetchTableData }) => {

  const formik = useFormik({
    initialValues: { supplierIds: "", supplierResults: "" },
    validationSchema: detailSchema,
    onSubmit: async (values) => {
      const supplierIdsArray = values.supplierIds.split(',');
      const supplierResultsArray = values.supplierResults.split(',').map((key: any) => (PaymentWithdrawalStatus as any)[key]);

      await bulkUpdatePaymentMutation({
        variables: {
          bulkUpdatePaymentWithdrawalRequest: {
            paymentWithdrawalRequestIds: supplierIdsArray,
            paymentWithdrawalRequestStatuses: supplierResultsArray ?? []
          }
        },
      });
      await refetchTableData();
    }
  });

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
            formik.setValues({ supplierIds: "", supplierResults: "" });
            formik.setErrors({});
            formik.setTouched({});
            Alert.success(message ?? "Updated Successfully");
          }
        }
      },
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <>
      {panelistPaymentRequests.length && (
        <Box component={"form"} onSubmit={handleSubmit}>
          <Grid container spacing={4} mb={5}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography color={"#000"} fontWeight={600} mb={1}>
                Supplier IDs
              </Typography>
              <TextField
                multiline
                fullWidth
                name="supplierIds"
                value={formik.values.supplierIds}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.supplierIds && Boolean(formik.errors.supplierIds)}
                helperText={formik.touched.supplierIds && formik.errors.supplierIds}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography color={"#000"} fontWeight={600} mb={1}>
                Supplier Results
              </Typography>
              <TextField
                multiline
                fullWidth
                name="supplierResults"
                value={formik.values.supplierResults}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.supplierResults && Boolean(formik.errors.supplierResults)}
                helperText={formik.touched.supplierResults && formik.errors.supplierResults}
              />
            </Grid>
          </Grid>
          <Button variant="contained" type="submit" disabled={updatePaymentLoading && !formik.isSubmitting ? !formik.isValid : !formik.dirty}>Update Payment request</Button>
        </Box>
      )}
    </>
  );
};
