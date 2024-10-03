import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Select, Typography } from "@mui/material";
import { TNewProjectState } from ".";
import { User } from "../../../../generated";

type IAssignManagerStep = {
    inputState: TNewProjectState;
    handleChange: ({ name, value }: { name: string; value: string | any; }) => void;
    setStepIsValid: Dispatch<SetStateAction<boolean>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
    managerList: Array<User>;
}

const AssignManagerStep = ({ inputState, handleChange, setStepIsValid, setOpen, managerList }: IAssignManagerStep) => {
    const [projectManagerList, setProjectManagerList] = useState<any[]>([]);

    // eslint-disable-next-line
    let selectedProjectManagers = inputState.projectManagers || [];

    const onChangeProjectManagers = ({ target: { name, value, checked } }: ChangeEvent<HTMLInputElement>) => {
        if (!checked)
            selectedProjectManagers = selectedProjectManagers?.filter((pm) => pm.name !== name && pm.value !== value);
        else
            selectedProjectManagers?.push({ name, value });
        handleChange({ name: "projectManagers", value: selectedProjectManagers });
    };

    useEffect(() => {
        setProjectManagerList(selectedProjectManagers);
    }, [selectedProjectManagers]);

    useEffect(() => {
        if (
            inputState.projectManagers.length &&
            inputState.leadProjectManager &&
            inputState.leadSalesManager
        ) {
            setStepIsValid(true);
        }
        else setStepIsValid(false);
        // eslint-disable-next-line
    }, [inputState]);

    return (
        <Box>
            <Typography>Select one or more project managers and assign a lead project manager and a sales manager. If you skip this step a mail will be sent to the management team requesting to claim this project.</Typography>
            <Typography mb={2.5}><Link to="">Click here</Link> to learn more about how to use the project wizard.</Typography>
            <Grid container borderTop={"1px solid #e0e0e0"} py={2.5}>
                <Grid item xs={12} md={8.8} lg={9} xl={9.7}>
                    <Grid container>
                        {managerList?.map((item: User, index: number) =>
                            <Grid item key={index} xs={6} sm={4} xl={2}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={inputState.projectManagers?.find((pm) => pm.name === item.firstName && pm.value === item.id) ? true : false} name={item?.firstName as string} value={item.id} onChange={onChangeProjectManagers} />} label={item.firstName} />
                                </FormGroup>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3.2} lg={3} xl={2.3} mt={{ xs: 2, md: 0 }}>
                    <Button color="primary" variant='contained' onClick={() => setOpen(true)} >Add Project Manager</Button>
                </Grid>
            </Grid>
            <Grid container borderTop={"1px solid #e0e0e0"} pt={2.5}>
                <Grid item xs={12} md={6} xl={4} mb={{ xs: 2, xl: 0 }}>
                    <Box mr={{ md: 1.5 }}>
                        <Typography color={"#000"} mb={0.5}>Lead Project Manager</Typography>
                        <FormControl fullWidth>
                            <Select name="leadProjectManager" value={inputState.leadProjectManager || '0'} defaultValue={"0"} onChange={({ target: { name, value } }) => handleChange({ name, value })}>
                                <MenuItem key={-1} value={0}>{'None'}</MenuItem>
                                {projectManagerList?.map((manager, index) => <MenuItem key={index} value={manager.value}>{manager.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} xl={4} mb={{ xs: 2, xl: 0 }}>
                    <Box ml={{ md: 1.5 }}>
                        <Typography color={"#000"} mb={0.5}>Lead Sales Manager</Typography>
                        <FormControl fullWidth>
                            <Select name="leadSalesManager" value={inputState.leadSalesManager || '0'} defaultValue={"0"} onChange={({ target: { name, value } }) => handleChange({ name, value })}>
                                <MenuItem key={-1} value={0}>{'None'}</MenuItem>
                                {managerList?.map((manager: User, index: number) => <MenuItem key={index} value={manager.id}>{manager.firstName}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AssignManagerStep;