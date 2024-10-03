import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Company, CreateCompanyInput } from '../../generated';
import { companyDetailsSchema } from '../../validationSchema';
import CommonController from '../common/CommonController';

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

type ICreateEditcompany = {
  selectedCompany: string | null | Company,
  isOpen: boolean,
  for: string
};

type IClientForm = {
  createEditcompany: ICreateEditcompany;
  setCreateEditcompany: Dispatch<SetStateAction<ICreateEditcompany>> | any;
  loading: boolean;
  companyCreation: (data: CreateCompanyInput) => Promise<void>;
  companyUpdation: (data: Company) => Promise<void>;
}

const ClientForm = ({ createEditcompany, setCreateEditcompany, loading, companyCreation, companyUpdation }: IClientForm) => {
  const [companyDetails, setCompanyDetails] = useState<CreateCompanyInput | any>({ name: "", email: "", clientNumber: "" });

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(companyDetailsSchema),
    defaultValues: companyDetails,
  });

  const { handleSubmit, setValue, reset } = methods;

  const submitHandle = async (data: Company | CreateCompanyInput) => {
    if (createEditcompany.for === "edit")
      companyUpdation(data as Company);

    else
      companyCreation(data as CreateCompanyInput);

    setCreateEditcompany({ selectedCompany: "", isOpen: false, for: "" });
    setCompanyDetails({});
    reset();
  };

  useEffect(() => {
    companyDetails && Object.keys(companyDetails)?.map((key: string) => setValue(key, companyDetails[key]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyDetails]);

  useEffect(() => {
    if (createEditcompany) {
      const { selectedCompany } = createEditcompany;
      setCompanyDetails(selectedCompany);
    } else {
      setCompanyDetails({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createEditcompany?.selectedCompany]);

  const cancelHandle = () => {
    setCreateEditcompany({ selectedCompany: "", isOpen: false, for: "" });
    reset();
  };

  return (
    <Modal open={createEditcompany.isOpen} onClose={() => setCreateEditcompany({ selectedCompany: "", isOpen: false, for: "" })}>
      <Container>
        <FormProvider {...methods}>
          <Box component={"form"} onSubmit={handleSubmit(submitHandle)} sx={style}>
            <Typography id="modal-modal-title" variant="h4" color={"#000"} fontWeight={"bold"} mb={3}>
              {createEditcompany.for === "add" && "Add Client details"}
              {createEditcompany.for === "edit" && "Edit Client details"}
            </Typography>
            <Box mt={2}>
              <Typography >Name</Typography>
              <CommonController
                controllerName="name"
                controllerLabel="Name"
                fieldType="name"
              />
            </Box>

            <Box mt={2}>
              <Typography >Email</Typography>
              <CommonController
                controllerName="email"
                controllerLabel="Email"
                fieldType="email"
              />
            </Box>

            <Box mt={2}>
              <Typography >Client Number</Typography>
              <CommonController
                controllerName="clientNumber"
                controllerLabel="Client Number"
                fieldType="clientNumber"
              />
            </Box>
            <Box display='flex' alignItems='center' justifyContent='space-between' mt={5}>
              <Button variant="outlined" color="primary" onClick={() => cancelHandle()}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={loading} color="primary"
                endIcon={loading && <CircularProgress size={20} color="inherit" />}>Submit</Button>
            </Box>
          </Box>
        </FormProvider>
      </Container>
    </Modal>
  )
}

export default ClientForm;