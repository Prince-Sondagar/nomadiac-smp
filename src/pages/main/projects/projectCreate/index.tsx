import { Box, Button, CircularProgress, Step, StepButton, Stepper, Typography } from '@mui/material';
import { ProjectWizardWrap } from "../../../../theme/styleComponents";
import { useNavigate } from 'react-router-dom';
import { FC, useState, useEffect } from 'react';
import CreateProjectStep from './CreateProjectStep';
import AssignManagerStep from './AssignManagerStep';
import FinishStep from './FinishStep';
import { GRAPHQL_QUERY_POLICY, PROJECT_ROUTE } from '../../../../constants';
import { Company, ProjectMethodology, useCreateProjectMutation, useFetchAllCompaniesQuery, useFetchAllUsersQuery, User, UserRole } from '../../../../generated';
import { useSnackbar } from 'notistack';
import { createProjectStateHandler } from '../../../../utils/project';
import AddUserDialog from '../../../../components/user/AddUsersDrawer';

const steps = [{ label: 'Create Project' }, { label: 'Assign Manager' },
//  { label: 'Quota' },
{ label: 'Finish' }];

export type TNewProjectState = {
    projectName: string;
    clientCompany: string;
    clientProjectCode: string;
    projectMethodology?: ProjectMethodology;
    description?: string;
    projectManagers: Array<{ name: string, value: string }>;
    leadProjectManager?: String;
    leadSalesManager?: String;
    qualitativeStudy?: boolean;
}

const ProjectWizard: FC = (): JSX.Element => {
    const newProjectInitState = { projectName: "", clientCompany: "", clientProjectCode: "", description: "", projectManagers: [] };
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const [newProjectState, setNewProjectState] = useState<TNewProjectState>(newProjectInitState);
    const [createProject, { loading: createProjectLoading }] = useCreateProjectMutation({
        ...(GRAPHQL_QUERY_POLICY as any),
        onError(error) {
            enqueueSnackbar("Something is wrong, please check values again");
        },
        onCompleted() {
            enqueueSnackbar("Project created successfully");
            navigate(PROJECT_ROUTE);
            setNewProjectState(newProjectInitState);
        }
    });
    const [isCurrantStepValidForNext, setIsCurrantStepValidForNext] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [clientList, setClientList] = useState<Company[]>([]);
    const [managerList, setManagerList] = useState<User[]>([]);

    const { data: fetchAllCompanies } = useFetchAllCompaniesQuery({
        ...GRAPHQL_QUERY_POLICY, variables: {
            "companiesInput": {
                "paginationOptions": { "limit": 100, "page": 1 }
            }
        }
    });

    const fetchManager = useFetchAllUsersQuery({
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

    useEffect(() => {
        const user = fetchManager?.data?.fetchAllUsers?.users;
        setManagerList(user as Array<User>);
    }, [fetchManager]);

    useEffect(() => {
        if (fetchAllCompanies) {
            const list = fetchAllCompanies.fetchAllCompanies?.companies;
            setClientList(list as Array<Company>);
        }
        else setClientList([]);
    }, [fetchAllCompanies]);

    const handleNext = () => {
        if (activeStep >= steps.length - 1) navigate(PROJECT_ROUTE);
        setActiveStep(activeStep + 1);
        setIsCurrantStepValidForNext(false);
    };

    const handleChange = ({ name, value }: { name: string, value: string | boolean }) => {
        setNewProjectState({ ...newProjectState, [name]: value });
    };

    const handleFinish = async () => {
        const salesManager = managerList?.filter((item) => item.id === newProjectState?.leadSalesManager && item).map((user, index) => { return { name: user.firstName, value: user.id, key: index } });
        newProjectState?.projectManagers.push(salesManager[0] as any);
        await createProject({ variables: createProjectStateHandler(newProjectState) });
    };

    return (
        <>
            <ProjectWizardWrap>
                <Typography variant="h2" fontWeight={700} mb={3}>Project Wizard</Typography>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map(({ label }, index) => (
                        <Step key={index}>
                            <StepButton disabled sx={{
                                ...(activeStep > index ? { backgroundColor: "#f5e2e3" } :
                                    activeStep === index ? { backgroundColor: "#771117" } :
                                        { backgroundColor: "#edced0" })
                            }}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <Box mt={3}>
                    {activeStep === 0 && <CreateProjectStep inputState={newProjectState} handleChange={handleChange} setStepIsValid={setIsCurrantStepValidForNext} clientList={clientList} />}
                    {activeStep === 1 && <AssignManagerStep inputState={newProjectState} managerList={managerList} handleChange={handleChange} setStepIsValid={setIsCurrantStepValidForNext} setOpen={setOpen} />}
                    {activeStep === 2 && <FinishStep inputState={newProjectState} handleChange={handleChange} setStepIsValid={setIsCurrantStepValidForNext} />}
                    <Box sx={{ display: { sm: 'flex' }, flexDirection: 'row', pt: 3 }}>
                        <Button color="inherit" variant='contained' disabled={activeStep === 0} onClick={() => setActiveStep((ps) => ps - 1)} sx={{ mr: 1 }}>Back</Button>
                        <Button
                            variant='outlined'
                            onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                            sx={{ mr: 1 }}
                            disabled={!isCurrantStepValidForNext || createProjectLoading}
                            endIcon={createProjectLoading && <CircularProgress size={20} color="inherit" />}
                        >
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </Box>
            </ProjectWizardWrap>

            <AddUserDialog
                open={open}
                setOpen={setOpen}
                refreshList={fetchManager.refetch}
                name={"manager"}
            />

        </>
    )
}

export default ProjectWizard;