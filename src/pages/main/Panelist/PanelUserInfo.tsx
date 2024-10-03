import { Box, Collapse, Grid, Switch, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CardComponent from '../../../components/common/CardComponent';
import { Panelist, PanelistReviewStatus, UpdateUserInput, User, UserStatus, useUpdateUserMutation } from '../../../generated';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserSchema } from '../../../validationSchema';
import CommonController from '../../../components/common/CommonController';
import { renderItem, toTitleCase } from '../../../utils';
import { Link } from 'react-router-dom';
import { PendingIcon, StatusBox, VerifiedIcon } from '../../../theme/styleComponents';
import palette from '../../../theme/palette';
import { Alert } from '../../../components/common/Alert';
import { useDeactivateUserMutation } from '../../../generated';
import { useActivateUserMutation } from '../../../generated';
import { Info as InfoIcon } from '@mui/icons-material';


type IPanelUserInfo = {
    user: User | null | any;
    refreshData: Function;
    panelist: Panelist | null;
}

const PanelUserInfo = ({ user, panelist, refreshData }: IPanelUserInfo) => {
    const [edit, setEdit] = useState<boolean>(false);
    const { primary: { main }, warning: { main: warningMain } } = palette;

    const [deactivateUser] = useDeactivateUserMutation();
    const [activateUser] = useActivateUserMutation();

    const [updateUser] = useUpdateUserMutation({
        onCompleted(data) {
            const { updateUser: { response } } = data;

            if (response) {
                const { status, message } = response;

                if (status && status === 200 && message) {
                    Alert.success(message);
                    reset();
                    refreshData();
                    setEdit(false);
                }
            }
        }
    });


    const methods = useForm<UpdateUserInput | any>({
        mode: 'all',
        resolver: yupResolver(updateUserSchema),
        defaultValues: user as User
    });

    const { handleSubmit, reset, formState: { isDirty }, setValue } = methods;

    useEffect(() => {
        Object.keys(user as User)?.map((key) => setValue(key, user[key]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (!edit) {
            reset();
        }
    }, [edit, reset]);

    const onSubmit: SubmitHandler<UpdateUserInput | any> = async (data) => {
        if (user && isDirty) {
            await updateUser({
                variables: {
                    userInput: {
                        id: data?.id,
                        firstName: data?.firstName,
                        lastName: data?.lastName,
                        email: data?.email || "",
                        emailVerified: data?.emailVerified
                    }
                },
            });
        }
    };

    const statusChangeHandler = async (value: string) => {
        await (value === UserStatus.Active ? deactivateUser : activateUser)({ variables: { userInput: { userId: user?.id } } });
    };

    const handleActionEdit = () => {
        setEdit(!edit);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardComponent cardTitle="User information" isEdit={edit} onEditClick={handleActionEdit} hasEdit>
                    <Collapse in={edit} mountOnEnter unmountOnExit>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography fontWeight={600}>First Name</Typography>
                                <CommonController fieldType="text" controllerName="firstName" controllerLabel='First Name' />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <Typography fontWeight={600}>Last Name</Typography>
                                <CommonController fieldType="text" controllerName="lastName" controllerLabel='Last Name' />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography fontWeight={600}>Email</Typography>
                                <CommonController fieldType="email" controllerName="email" controllerLabel='Email' />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Typography variant="body2" sx={{ mr: 1 }}>Email Verification</Typography>
                                    {panelist?.panelistReviewStatus === PanelistReviewStatus.Blocked ?
                                        <Tooltip sx={{ fontSize: "17px" }} title="Before Email Verify, Please active Review Status from Panelist Information" placement="right">
                                            <InfoIcon />
                                        </Tooltip> : ""}
                                </Box>
                                <Box display='flex' alignItems='center' my={1}>
                                    <Controller
                                        name='emailVerified'
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <Switch
                                                    checked={value}
                                                    onChange={(e) => onChange(e.target.checked)}
                                                    color='primary'
                                                    disabled={panelist?.panelistReviewStatus === PanelistReviewStatus.Blocked}
                                                    name='lifecycle'
                                                />
                                                <Box>{value ? 'VERIFIED' : 'PENDING'}</Box>
                                            </>
                                        )}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Typography variant="body2" sx={{ mr: 1 }}>Status</Typography>
                                    {panelist?.panelistReviewStatus === PanelistReviewStatus.Blocked ?
                                        <Tooltip sx={{ fontSize: "17px" }} title="Before Active, Please active Review Status from Panelist Information" placement="right">
                                            <InfoIcon />
                                        </Tooltip> : ""}
                                </Box>
                                <Box display="flex" alignItems="center" my={1}>
                                    <Controller
                                        name='status'
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <Switch
                                                    checked={value === UserStatus.Active}
                                                    onChange={({ target }) => {
                                                        onChange(target.checked ? UserStatus.Active : UserStatus.Deactivated);
                                                        statusChangeHandler(target.checked ? UserStatus.Deactivated : UserStatus.Active);
                                                    }}
                                                    disabled={panelist?.panelistReviewStatus === PanelistReviewStatus.Blocked}
                                                    color='primary'
                                                    name='lifecycle'
                                                />
                                                <Box>{value === UserStatus.Active ? UserStatus.Active : UserStatus.Deactivated}</Box>
                                            </>
                                        )}
                                    />
                                </Box>
                            </Grid>

                        </Grid>
                    </Collapse>

                    <Collapse in={!edit} mountOnEnter unmountOnExit>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                {renderItem("User ID", `${toTitleCase(user?.id)}`)}
                            </Grid>

                            <Grid item md={6} xs={12}>
                                {renderItem("First Name", `${toTitleCase(user?.firstName || "") || ''}`)}
                            </Grid>

                            <Grid item md={6} xs={12}>
                                {renderItem("Last Name", `${toTitleCase(user?.lastName || "") || ''}`)}
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <Typography variant="body2">Email</Typography>

                                <Link to={user?.email ? `mailto: ${user?.email}` : ""}>
                                    <Typography component="h5" variant="h5" color="primary" noWrap>
                                        {user?.email || "N/A"}
                                    </Typography>
                                </Link>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Typography variant="body2" sx={{ mr: 1 }}>Email Verification</Typography>
                                    {panelist?.panelistReviewStatus === PanelistReviewStatus.Blocked ?
                                        <Tooltip sx={{ fontSize: "17px" }} title="Before Email Verify, Please active Review Status from Panelist Information" placement="right">
                                            <InfoIcon />
                                        </Tooltip> : ""}
                                </Box>
                                <Box display='flex' gap='10px' alignItems='center'>
                                    {user?.emailVerified ? <VerifiedIcon /> : <PendingIcon />}
                                    <Typography variant='body2'>{user?.emailVerified ? 'Verified' : 'Pending'}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Typography variant="body2" sx={{ mr: 1 }}>Status</Typography>
                                    {panelist?.panelistReviewStatus === PanelistReviewStatus.Blocked ?
                                        <Tooltip sx={{ fontSize: "17px" }} title="Before Active, Please active Review Status from Panelist Information" placement="right">
                                            <InfoIcon />
                                        </Tooltip> : ""}
                                </Box>
                                <Box mt={1}>
                                    <StatusBox variant='body1' borderColor={user?.status === UserStatus.Active ? main : warningMain}>
                                        {toTitleCase(user?.status?.toLowerCase() || '')}
                                    </StatusBox>
                                </Box>
                            </Grid>

                        </Grid>
                    </Collapse>
                </CardComponent>
            </form>
        </FormProvider>
    )
}

export default PanelUserInfo;