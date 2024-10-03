import { Checkbox, FormControlLabel, FormGroup, Typography, Box } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { TNewProjectState } from ".";

type IFinishStep = {
    inputState: TNewProjectState;
    handleChange: ({ name, value }: { name: string; value: string | boolean }) => void;
    setStepIsValid: Dispatch<SetStateAction<boolean>>;
}

const FinishStep = ({ inputState, handleChange, setStepIsValid }: IFinishStep) => {

    useEffect(() => {
        setStepIsValid(true);
        // eslint-disable-next-line
    }, []);

    return (
        <Box>
            <Typography variant="h3" color={"#606060"} mb={2}>Congratulations! You project is now ready.</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox name="qualitativeStudy" checked={inputState.qualitativeStudy ? true : false} onChange={({ target: { name, checked } }) => handleChange({ name, value: checked })} />} label="Qualitative Study" />
            </FormGroup>
            <Typography>As you did not assign a project manager an email will be sent to your operations group for them to claim this project.</Typography>
            <Typography>You can add a manager later on the project overview page by clicking on your project and navigate to 'Manage Information'. Please click on finish to proceed to the project detail page.</Typography>
        </Box>

    )
}

export default FinishStep;