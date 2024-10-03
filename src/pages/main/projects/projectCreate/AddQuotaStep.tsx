import { Box, Button, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';


type IAddQuotaStep = {
    setStepIsValid: Dispatch<SetStateAction<boolean>>;
}

const AddQuotaStep = ({ setStepIsValid }: IAddQuotaStep) => {

    return (
        <>
            <Box borderBottom={"2px solid black"}>
                <Typography>Click on the button 'Create Quota Groups' to add a new quota group. You can skip this step and change the information later in the project settings.</Typography>
            </Box>
            <Box mt={3}>
                <Button variant='contained' color="primary">
                    Create Quota Group
                </Button>
            </Box>
        </>
    )
}

export default AddQuotaStep;