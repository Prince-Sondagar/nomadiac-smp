import { FC } from 'react';
import { Box, Typography } from '@mui/material';

const landingPageLinks = [
  { title: "Complete:", status: "completed" },
  { title: "Terminate:", status: "terminate" },
  { title: "Quota:", status: "quota" },
  { title: "Security Terminate:", status: "security-terminate" }
];

type ILandingPage = {
  projectId: string;
}

const LandingPage: FC<ILandingPage> = ({ projectId }: ILandingPage) => {

  return (
    <Box>
      <Box bgcolor={"#f2f2f2"} p={3} mb={3}>
        {landingPageLinks.map((page, key) =>
          <Box key={key} display={"flex"} alignItems={"center"} mb={1}>
            <Typography width={"20%"}>{page.title}</Typography>
            <Typography component={"p"}>{`${process.env.REACT_APP_API_BASE_URL}/survey/complete?surveyResultStatus=${page.status}&id=[ID]`}</Typography>
          </Box>
        )}
      </Box>
      {/* <Box bgcolor={"#f2f2f2"} p={3}>
        <Typography variant='h5' mb={2} fontWeight={"bold"}>Routing after landing page</Typography>
        {landingPageRouting.map((route, key) =>
          <Box key={key} display={"flex"} alignItems={"center"} mb={1}>
            <Typography width={"20%"}>{route.title}</Typography>
            <TextField sx={{ width: "80%" }} value={route.route} variant="outlined" placeholder={route.route} />
          </Box>
        )}
      </Box> */}
    </Box>
  )
}

export default LandingPage