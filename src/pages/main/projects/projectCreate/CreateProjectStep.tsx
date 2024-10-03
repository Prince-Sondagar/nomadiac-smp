import { Box, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { TNewProjectState } from ".";
import { Company } from "../../../../generated";

const methodologyList = [
    { value: 'ONLINE', name: "Online" },
    { value: 'CATI', name: "CATI" },
    { value: 'FACE-TO-FACE', name: "Face-to-Face" }
];

type ICreateProjectStepProps = {
    inputState: TNewProjectState;
    handleChange: ({ name, value }: { name: string; value: string; }) => void;
    setStepIsValid: Dispatch<SetStateAction<boolean>>;
    clientList: Array<Company>;
}

const CreateProjectStep = ({ inputState, handleChange, setStepIsValid, clientList }: ICreateProjectStepProps) => {
    useEffect(() => {
        if (
            inputState.projectName &&
            inputState.clientProjectCode &&
            inputState.clientCompany &&
            inputState?.description &&
            inputState?.projectMethodology
        ) {
            setStepIsValid(true);
        }
        else setStepIsValid(false);
        // eslint-disable-next-line
    }, [inputState]);

    return (
        <Box>
            <Typography mb={2.5}>Fill in all information below. You can change it later in the project settings. <Link to="/">Click here</Link> to learn more about how to use the project wizard.</Typography>
            <Grid container borderTop={"1px solid #e0e0e0"} pt={2.5}>
                <Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
                    <Box>
                        <Typography color={"#000"} mb={0.5}>Project Name</Typography>
                        <TextField fullWidth name="projectName" value={inputState.projectName} onChange={({ target: { name, value } }) => handleChange({ name, value })} variant="outlined" placeholder="test project for client" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
                    <Box mx={{ md: 3 }}>
                        <Typography color={"#000"} mb={0.5}>Select Client</Typography>
                        <FormControl fullWidth>
                            <Select name="clientCompany" value={inputState.clientCompany || "0"} onChange={({ target: { name, value } }) => handleChange({ name, value })}>
                                <MenuItem key={-1} value={0} >{'None'}</MenuItem>
                                {clientList?.map((company: Company, index: number) => <MenuItem key={index} value={company.id}>{company.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
                    <Box>
                        <Typography color={"#000"} mb={0.5}>Client Project Code</Typography>
                        <TextField fullWidth name="clientProjectCode" value={inputState.clientProjectCode} onChange={({ target: { name, value } }) => handleChange({ name, value })} variant="outlined" placeholder="Enter client specific project code" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
                    <Box mx={{ md: 3 }}>
                        <Typography color={"#000"} mb={0.5}>Project Methodology</Typography>
                        <FormControl fullWidth>
                            <Select name="projectMethodology" value={inputState?.projectMethodology || "0"} onChange={({ target: { name, value } }) => handleChange({ name, value })}>
                                <MenuItem key={-1} value={0}>{'None'}</MenuItem>
                                {methodologyList?.map((method, index) => <MenuItem key={index} value={method.value}>{method.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} xl={5.8} mb={{ xs: 2, xl: 0 }} mt={{ xl: 2 }}>
                    <Box>
                        <Typography color={"#000"} mb={0.5}>Description</Typography>
                        <TextField fullWidth name="description" rows={2} minRows={1} multiline value={inputState.description} onChange={({ target: { name, value } }) => handleChange({ name, value })} placeholder="Enter project description" />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CreateProjectStep;