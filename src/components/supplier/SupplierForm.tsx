import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Modal, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateSupplierInput, Supplier, UpdateSupplierInput } from '../../generated';
import { supplierUpdateSchema } from '../../validationSchema';
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

type IcreateEditSuppliers = {
    selectedSupplier: string | null | Supplier;
    isOpen: boolean;
    for: "add" | "edit" | "";
}

type ISUpplierForm = {
    createEditSuppliers: IcreateEditSuppliers;
    setCreateEditSuppliers: Dispatch<SetStateAction<IcreateEditSuppliers>>;
    loading: boolean;
    supplierCreation: (data: CreateSupplierInput) => Promise<void> | any;
    supplierUpdation: (data: UpdateSupplierInput) => Promise<void>;
}

const initialSupplierDetails = { name: "", companyName: "", email: "", completeLink: "", terminateLink: "", quotaFullLink: "", securityLink: "" }

const SupplierForm = ({ createEditSuppliers, setCreateEditSuppliers, loading, supplierCreation, supplierUpdation }: ISUpplierForm) => {
    const [supplierDetails, setSupplierDetails] = useState<any>(initialSupplierDetails);
    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm({
        mode: "all",
        resolver: yupResolver(supplierUpdateSchema),
        defaultValues: supplierDetails,
    });

    const { handleSubmit, setValue, reset } = methods;

    const submitHandle = async (data: UpdateSupplierInput | CreateSupplierInput) => {
        if (createEditSuppliers.for === "edit") {
            await supplierUpdation(data as UpdateSupplierInput);
            enqueueSnackbar("Supplier Updated Successfully");
            setCreateEditSuppliers({ selectedSupplier: "", isOpen: false, for: "" });
            setSupplierDetails({});
            reset();
        }
        else {
            const userData = await supplierCreation(data as CreateSupplierInput);
            const { createSupplier: { response } } = userData?.data;
            if (response?.status === 200) {
                enqueueSnackbar(response?.message);
                setCreateEditSuppliers({ selectedSupplier: "", isOpen: false, for: "" });
                setSupplierDetails({});
                reset();
            }
        }
    };

    useEffect(() => {
        supplierDetails && Object.keys(supplierDetails)?.map((key: string) => setValue(key, supplierDetails[key]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierDetails]);

    useEffect(() => {
        if (createEditSuppliers.selectedSupplier as Supplier) {
            const { selectedSupplier } = createEditSuppliers;
            if (selectedSupplier as Supplier) {
                setSupplierDetails(selectedSupplier);
            }
        } else {
            setSupplierDetails(initialSupplierDetails);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createEditSuppliers.selectedSupplier]);

    const cancelHandle = () => {
        setCreateEditSuppliers({ selectedSupplier: "", isOpen: false, for: "" });
        reset();
    };

    return (
        <Modal open={createEditSuppliers.isOpen} onClose={() => setCreateEditSuppliers({ selectedSupplier: "", isOpen: false, for: "" })}>
            <Container>
                <FormProvider {...methods}>
                    <Box component={"form"} onSubmit={handleSubmit(submitHandle)} sx={style}>
                        <Typography id="modal-modal-title" variant="h4" color={"#000"} fontWeight={"bold"} mb={3}>
                            {createEditSuppliers.for === "add" && "Add Supplier details"}
                            {createEditSuppliers.for === "edit" && "Edit Supplier details"}
                        </Typography>

                        <Box mt={2}>
                            <Typography>Company Name</Typography>
                            <CommonController controllerName="companyName" controllerLabel="Company Name" fieldType="companyName" />
                        </Box>

                        <Box mt={2}>
                            <Typography>Email</Typography>
                            <CommonController controllerName="email" controllerLabel="Email" fieldType="email" isDisabled={createEditSuppliers.for === "edit" ? true : false} />
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


                        <Box display='flex' alignItems='center' justifyContent='space-between' mt={5}>
                            <Button variant="outlined" color="primary" onClick={cancelHandle}>Cancel</Button>
                            <Button type="submit" variant="contained" disabled={loading} color="primary" endIcon={loading && <CircularProgress size={20} color="inherit" />}>Submit</Button>
                        </Box>
                    </Box>
                </FormProvider>
            </Container>
        </Modal>
    )
}

export default SupplierForm;