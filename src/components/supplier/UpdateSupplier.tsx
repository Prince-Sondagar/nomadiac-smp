import { yupResolver } from '@hookform/resolvers/yup';
import { Collapse, Grid, Switch, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { GRAPHQL_QUERY_POLICY } from '../../constants';
import { Supplier, UpdateUserInput, useUpdateSupplierMutation } from '../../generated';
import { renderItem, toTitleCase } from '../../utils';
import { updateSupplierHandler } from '../../utils/project';
import { supplierUpdateSchema } from '../../validationSchema';
import { Alert } from '../common/Alert';
import CardComponent from '../common/CardComponent';
import CommonController from '../common/CommonController';


type IUpdateSupplier = {
    supplier: Supplier | any;
    setSupplier: Dispatch<SetStateAction<Supplier>>;
    refreshList: Function;
}


const UpdateSupplier = ({ supplier, setSupplier, refreshList }: IUpdateSupplier) => {
    const [edit, setEdit] = useState<boolean>(false);


    const [updateSupplier] = useUpdateSupplierMutation({
        ...(GRAPHQL_QUERY_POLICY as any),
        onError() {
            return null;
        },

        onCompleted(data) {
            const { updateSupplier: { response } } = data;

            if (response) {
                const { status, message } = response;

                if (status && status === 200 && message) {
                    Alert.success(message);
                    reset();
                    refreshList();
                    setEdit(false);
                }
            }
        }
    });

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(supplierUpdateSchema),
        defaultValues: supplier
    });

    const { handleSubmit, reset, formState: { isDirty }, setValue } = methods;

    const onSubmit: SubmitHandler<UpdateUserInput> = async (data) => {

        if (supplier && isDirty) {
            await updateSupplier({ variables: updateSupplierHandler(data) });
        };
    };

    useEffect(() => {
        if (!edit) {
            reset();
        }
    }, [edit, reset]);

    useEffect(() => {
        Object.keys(supplier)?.map((key) => setValue(key, supplier[key]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplier]);

    const onEditClick = () => {
        setEdit(!edit);
    };


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardComponent
                    cardTitle="Supplier Information"
                    isEdit={edit}
                    onEditClick={onEditClick}
                    hasEdit
                >
                    <Collapse in={edit} mountOnEnter unmountOnExit>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography fontWeight={600}>Company Name</Typography>
                                <CommonController
                                    fieldType="text"
                                    controllerName="companyName"
                                    controllerLabel='Company Name'
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography fontWeight={600}>Email</Typography>
                                <CommonController
                                    fieldType="email"
                                    controllerName="email"
                                    controllerLabel='Email'
                                    isDisabled
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography fontWeight={600}>Complete Link</Typography>
                                <CommonController
                                    fieldType="url"
                                    controllerName="completeLink"
                                    controllerLabel='Complete Link'
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography fontWeight={600}>Terminate Link</Typography>
                                <CommonController
                                    fieldType="url"
                                    controllerName="terminateLink"
                                    controllerLabel='TerminateLink'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography fontWeight={600}>Quota Full Link</Typography>
                                <CommonController
                                    fieldType="url"
                                    controllerName="quotaFullLink"
                                    controllerLabel='Quota Full Link'
                                />
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <Typography fontWeight={600}>Security Link</Typography>
                                <CommonController
                                    fieldType="url"
                                    controllerName="securityLink"
                                    controllerLabel='Security Link'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography fontWeight={600}>Hash Private Key</Typography>
                                <CommonController
                                    fieldType="text"
                                    controllerName="hashPrivetKey"
                                    controllerLabel='Hash Private Key'
                                />
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <Typography fontWeight={600}>Hash Private Key Variable Name</Typography>
                                <CommonController
                                    fieldType="text"
                                    controllerName="hashPrivetKeyVariableName"
                                    controllerLabel='Hash Privet Key Variable Name'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography fontWeight={600}>Hash Enabled</Typography>
                                <Box display={'flex'} alignItems={"center"}>
                                    <Switch
                                        checked={supplier?.hashEnabled || false}
                                        onChange={() => setSupplier({ ...supplier, hashEnabled: !supplier?.hashEnabled })}
                                        color="primary"
                                        name="lifecycle"
                                        inputProps={{ "aria-label": "primary checkbox" }}

                                    />
                                    <Box>{supplier?.hashEnabled ? "TRUE" : "FALSE"}</Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Collapse>

                    <Collapse in={!edit} mountOnEnter unmountOnExit>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={6}>
                                {renderItem("Company Name", `${toTitleCase(supplier?.companyName || "") || ''}`)}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="body2">Email</Typography>

                                <Link to={supplier?.email ? `mailto: ${supplier?.email}` : ""}>
                                    <Typography component="h5" variant="h5" color="primary" noWrap>
                                        {supplier?.email || "N/A"}
                                    </Typography>
                                </Link>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {renderItem("Complete Link", `${(supplier?.completeLink || "")}`)}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {renderItem("Terminate Link", `${(supplier?.terminateLink || "")}`)}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {renderItem("QuotaFull Link", `${(supplier?.quotaFullLink || "")}`)}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {renderItem("Security Link", `${(supplier?.securityLink || "")}`)}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {renderItem("Hash Private Key", `${(supplier?.hashPrivetKey || "")}`)}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {renderItem("Hash Private Key Variable Name", `${(supplier?.hashPrivetKeyVariableName || "")}`)}
                            </Grid>

                            <Grid item xs={12} md={12}>
                                {renderItem("Hash Enabled", `${(supplier?.hashEnabled ? "TRUE" : "FALSE" || "")}`)}
                            </Grid>

                        </Grid>
                    </Collapse>
                </CardComponent>
            </form>
        </FormProvider>
    )
}

export default UpdateSupplier;