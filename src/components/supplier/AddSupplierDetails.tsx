import { Button, CircularProgress, Collapse, Container, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { CreateProjectQuotaGroupInput, CreateSupplierQuotaGroupInput, SupplierQuotaGroup } from '../../generated';
import { FormProvider, useForm } from 'react-hook-form';
import { supplierDetailsSchema } from '../../validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import CommonController from '../common/CommonController';
import { CreateEditSupplierType, initCreateEditSupplier } from '../../pages/main/projects/ProjectTable/QuotaGroup';
import { NOMADIC_NETWORK } from '../../constants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '0',
  borderRadius: "8px",
  boxShadow: 24,
  outline: "none",
  p: 4,
  "@media(max-width: 575px)": {
    width: "95%",
    px: 3,
  },
  ".MuiFormControl-root": {
    margin: 0
  }
};

type IAddSupplierDetails = {
  createEditSupplier: CreateEditSupplierType;
  onClose: Dispatch<SetStateAction<CreateEditSupplierType>>;
  handleSubmitAddSupplier: Function;
  quotaInputList?: CreateSupplierQuotaGroupInput[] | SupplierQuotaGroup[] | any;
  isLoading?: boolean;
  quotaInput?: CreateProjectQuotaGroupInput | any;
}


const AddSupplierDetails: FC<IAddSupplierDetails> = ({ createEditSupplier, onClose, isLoading, handleSubmitAddSupplier, quotaInputList, quotaInput }) => {
  let initSupplierDetails: CreateSupplierQuotaGroupInput = { supplierId: "", surveyEntryLink: quotaInput?.surveyEntryLink, completeLink: "", terminateLink: "", quotaFullLink: "", securityLink: "", completeCap: "", supplierCompleteCapLeft: "", cpi: "", offerId: "" };
  const [supplierDetails, setSupplierDetails] = useState<CreateSupplierQuotaGroupInput>(initSupplierDetails);
  const { user } = createEditSupplier || {}
  const { companyName } = user || {};
  const clickedUser = quotaInputList?.find((pr: CreateSupplierQuotaGroupInput | SupplierQuotaGroup) => pr?.supplierId === createEditSupplier.selectedUser);
  const { supplier } = clickedUser || {}
  const { companyName: supplierName } = supplier || {}

  useEffect(() => {
    const { user } = createEditSupplier;
    setSupplierDetails({ ...supplierDetails, completeLink: user?.completeLink, terminateLink: user?.terminateLink, quotaFullLink: user?.quotaFullLink, securityLink: user?.securityLink, offerId: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createEditSupplier.user]);

  const methods = useForm<any>({
    mode: "all",
    resolver: yupResolver(supplierDetailsSchema),
    defaultValues: supplierDetails,
  });
  const { handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    Object.keys(supplierDetails).map((key: string) => setValue(key, (supplierDetails as any)[key]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierDetails]);

  useEffect(() => {
    if (clickedUser) setSupplierDetails(clickedUser);
    else setSupplierDetails(initSupplierDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createEditSupplier.selectedUser]);

  const submitHandle = async (data: any) => {
    if (createEditSupplier.for === "edit") {
      handleSubmitAddSupplier({ ...data, supplierCompleteCapLeft: data.completeCap });
      if (data.completeCap !== supplierDetails.completeCap) {
        data = { ...data, supplierCompleteCapLeft: (+(supplierDetails?.supplierCompleteCapLeft ?? 0) + (+data.completeCap - +(supplierDetails?.completeCap ?? 0))).toString() };
      };
    }
    else if (createEditSupplier.for === "add") {
      handleSubmitAddSupplier({ ...data, supplierId: createEditSupplier.selectedUser, supplierCompleteCapLeft: data.completeCap });
    }
    cancelHandle();
  };

  const cancelHandle = () => {
    setSupplierDetails(initSupplierDetails);
    onClose(initCreateEditSupplier);
    reset();
  };

  return (
    <Modal open={createEditSupplier.isOpen} onClose={() => { }}>
      <Container>
        <FormProvider {...methods}>
          <Box component={"form"} onSubmit={handleSubmit(submitHandle)} sx={style}>
            <Typography id="modal-modal-title" variant="h4" color={"#000"} fontWeight={"bold"} mb={3}>
              {createEditSupplier.for === "add" && "Add Supplier details"}
              {createEditSupplier.for === "edit" && "Edit Supplier details"}
            </Typography>
            <Box mt={2}>
              <Typography mb={0.5}>Survey Entry Link</Typography>
              <CommonController controllerName="surveyEntryLink" controllerLabel="Survey Entry Link" fieldType="surveyEntryLink" />
            </Box>
            <Box mt={2}>
              <Typography mb={0.5}>Complete Landing Page</Typography>
              <CommonController controllerName="completeLink" controllerLabel="Complete Landing Page" fieldType="completeLink" />
            </Box>
            <Box mt={2}>
              <Typography mb={0.5}>Terminate Landing Page</Typography>
              <CommonController controllerName="terminateLink" controllerLabel="Terminate Landing Page" fieldType="terminateLink" />
            </Box>
            <Box mt={2}>
              <Typography mb={0.5}>Quota Landing Page</Typography>
              <CommonController controllerName="quotaFullLink" controllerLabel="Quota Landing Page" fieldType="quotaFullLink" />
            </Box>
            <Box mt={2}>
              <Typography>Security Landing Page</Typography>
              <CommonController controllerName="securityLink" controllerLabel="Security Landing Page" fieldType="securityLink" />
            </Box>

            <Box mt={2}>
              <Typography>Supplier Complete Cap</Typography>
              <CommonController controllerName="completeCap" controllerLabel="Supplier Complete Cap" fieldType="completeCap" />
            </Box>

            <Box mt={2}>
              <Typography>CPI</Typography>
              <CommonController controllerName="cpi" controllerLabel="cpi" fieldType="cpi" />
            </Box>

            <Collapse in={companyName?.trim().toLowerCase() === NOMADIC_NETWORK || supplierName?.trim().toLowerCase() === NOMADIC_NETWORK}>
              <Box mt={2}>
                <Typography>Offer ID</Typography>
                <CommonController controllerName="offerId" controllerLabel="Offer ID" fieldType="text" />
              </Box>
            </Collapse>

            <Box display='flex' alignItems='center' justifyContent='space-between' mt={5}>
              <Button variant="outlined" color="primary" onClick={cancelHandle}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isLoading} color="primary"
                endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : ""}>Submit</Button>
            </Box>
          </Box>
        </FormProvider>
      </Container>
    </Modal>
  )
}

export default AddSupplierDetails;