import { useEffect, useState } from 'react';
import { Backdrop, Box, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Select, Typography } from '@mui/material';
import { Maybe, Project, ProjectUser, useCreateProjectUserMutation, useFetchAllUsersQuery, User, useRemoveProjectUserMutation, UserRole, useUpdateProjectUserMutation } from '../../../../generated';
import { GRAPHQL_QUERY_POLICY } from '../../../../constants';
import { useSnackbar } from 'notistack';
import { createProjectUserHandler, removeProjectUserHandler, updateProjectUserHandler } from '../../../../utils/project';

type IProjectTeam = {
    project: Project;
    onProjectUpdate: (name: string, value: string) => Promise<void>;
}

const ProjectTeam = ({ project, onProjectUpdate }: IProjectTeam) => {
    const [managerList, setManagerList] = useState<any[]>([]);
    const { enqueueSnackbar } = useSnackbar();

    const { data: fetchManager, loading: fetchManagerLoading } = useFetchAllUsersQuery({
        ...GRAPHQL_QUERY_POLICY,
        variables: {
            usersInput: {
                roles: [UserRole.Admin, UserRole.Manager],
                paginationOptions: {
                    page: 1,
                    limit: 100,
                },
            },
        },
    });

    const [createProjectUser, { loading: createUserLoading }] = useCreateProjectUserMutation({
        ...(GRAPHQL_QUERY_POLICY as any),
    });

    const [removeProjectUser, { loading: removeUserLoading }] = useRemoveProjectUserMutation({
        ...(GRAPHQL_QUERY_POLICY as any),
        onCompleted() {

        }
    });

    const [updateProjectUser, { loading: updateUserLoading }] = useUpdateProjectUserMutation({
        ...(GRAPHQL_QUERY_POLICY as any),
        onCompleted() {
            enqueueSnackbar("Supplier detail updated successfully!");
        },
    });

    useEffect(() => {
        const user = fetchManager?.fetchAllUsers?.users;
        if (user) setManagerList(user);
    }, [fetchManager]);

    const changeHandle = async ({ target: { value } }: { target: { value: string } }) => {
        let user = project?.projectUsers?.find((item) => item?.id === value);

        if (user) {
            const id = user?.id;
            await removeProjectUser({ variables: removeProjectUserHandler(id) });
        }
        else {
            const data = { "isHeadManager": false, "isSalesManager": false };
            await createProjectUser({ variables: createProjectUserHandler(data, value, project.id) });
        }
        onProjectUpdate("", "");
    };

    const removeSalesManager = async () => {
        const user = project?.projectUsers?.find((item: Maybe<ProjectUser>) => item?.isSalesManager);
        if (user) {
            if (user?.isSalesManager && !user?.isHeadManager)
                await removeProjectUser({ variables: removeProjectUserHandler(user?.id as string) });

            else {
                const data = { "isHeadManager": true, "isSalesManager": false };
                await updateProjectUser({ variables: updateProjectUserHandler(data, user?.id as string) });
            }
        }
    };

    const saleManagerChangeHandle = async ({ target: { value } }: { target: { value: string } }) => {
        removeSalesManager();
        const finduser = project?.projectUsers?.find((item: Maybe<ProjectUser>) => item?.userId === value);
        if (finduser) {
            const userId = finduser?.id;
            let data = { "isHeadManager": false, "isSalesManager": true };
            if (finduser?.isHeadManager) {
                data = { "isHeadManager": true, "isSalesManager": true };
                await updateProjectUser({ variables: updateProjectUserHandler(data, userId) });
            }
            await updateProjectUser({ variables: updateProjectUserHandler(data, userId) });
        }
        else {
            const data = { "isHeadManager": false, "isSalesManager": true };
            const user = await createProjectUser({ variables: createProjectUserHandler(data, value, project.id) });
            const userId = user?.data?.createProjectUser?.projectUser?.id;
            await updateProjectUser({ variables: updateProjectUserHandler(data, userId as string) });
        }
        onProjectUpdate("", "");
    };

    const removeHeadManager = () => {
        project?.projectUsers?.map(async (item: Maybe<ProjectUser>) => {
            if (item?.isSalesManager) {
                let data = { "isHeadManager": false, "isSalesManager": true };
                await updateProjectUser({ variables: updateProjectUserHandler(data, item?.id as string) });
            }
            else {
                let data = { "isHeadManager": false, "isSalesManager": false }
                await updateProjectUser({ variables: updateProjectUserHandler(data, item?.id as string) });
            }
        })
    };

    const headManagerChangeHandle = async ({ target: { value } }: { target: { value: string } }) => {
        removeHeadManager();
        const user = project?.projectUsers?.find((item) => item?.id === value);
        if (user?.isSalesManager) {
            let data = { "isHeadManager": true, "isSalesManager": true };
            await updateProjectUser({ variables: updateProjectUserHandler(data, value) });
        }
        else {
            let data = { "isHeadManager": true, "isSalesManager": false };
            await updateProjectUser({ variables: updateProjectUserHandler(data, value) });
        }
        onProjectUpdate("", "");
    };

    const loading = createUserLoading || updateUserLoading || removeUserLoading || fetchManagerLoading;

    return (
        <Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading ? true : false}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box aria-disabled={loading ? true : false}>
                <Grid container>
                    {managerList && managerList?.map((item, key) =>
                        <Grid item key={key} xs={2}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={project?.projectUsers?.find((pm: Maybe<ProjectUser>) => pm?.user?.id === item?.id) ? true : false}
                                            name={item?.firstName}
                                            value={project?.projectUsers?.find((pm: Maybe<ProjectUser>) => pm?.user?.id === item?.id)?.id || item?.id}
                                            onChange={changeHandle}
                                        />
                                    }
                                    label={item.firstName}
                                />
                            </FormGroup>
                        </Grid>
                    )}
                </Grid>
                <Grid container my={4}>
                    <Grid item xs={4}>
                        <Box mr={1.5}>
                            <Typography color={"#000"} mb={0.5}>Project Manager</Typography>
                            <FormControl fullWidth>
                                <Select
                                    name="clientCompany"
                                    value={(project?.projectUsers?.find((pm: Maybe<ProjectUser>) => pm?.isHeadManager))?.id}
                                    onChange={headManagerChangeHandle}
                                >
                                    {project?.projectUsers?.map((manager: Maybe<ProjectUser>) => !manager?.user?.roles.find((role) => role?.role === UserRole.SuperAdmin) && <MenuItem key={manager?.id} value={manager?.id}>{manager?.user?.firstName}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box ml={1.5}>
                            <Typography color={"#000"} mb={0.5}>Sales Manager</Typography>
                            <FormControl fullWidth>
                                <Select
                                    name="clientCompany"
                                    value={(project?.projectUsers?.find((item: Maybe<ProjectUser>) => item?.isSalesManager))?.userId}
                                    onChange={saleManagerChangeHandle}
                                >
                                    {managerList?.map((manager: User, key: number) => <MenuItem key={key} value={manager?.id}>{manager?.firstName}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                {/* <Link href=''>Send Email To Managers</Link> */}
            </Box>
        </Box>
    )
}

export default ProjectTeam;