import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import { ROOT_ROUTE } from "../../../../constants";

const ProjectSubmission = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("status")) {
      navigate(ROOT_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {searchParams.get("status") === "completed" && (
        <Box>
          <Typography variant="h2" my={4}>
            Thank you very much! You successfully completed the survey!
          </Typography>
          <Grid container mb={4}>
            <Grid item xs={12} mt={4}>
              <Card sx={{ boxShadow: "0px 1px 10px #ddd", p: 3 }}>
                <Box textAlign={"right"}>
                  <Link href="https://nomadicsurveys.com/">
                    <Button variant="contained" sx={{ fontSize: "14px" }}>
                      Click Here To Proceed
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      {searchParams.get("status") === "quota" && (
        <Box>
          <Typography variant="h2" my={4}>
            We are sorry
          </Typography>
          <Grid container mb={4}>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: "0px 1px 10px #ddd", p: 3 }}>
                <Typography>
                  Thank you for participating in our latest survey, but
                  unfortunately we have sufficient responses in your category.
                  To ensure we only invite you to take part in relevant studies
                  please ensure your panel information is up to date by logging
                  into your panel dashboard and checking your information.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} mt={4}>
              <Card sx={{ boxShadow: "0px 1px 10px #ddd", p: 3 }}>
                <Box textAlign={"right"}>
                  <Link href="https://nomadicsurveys.com/">
                    <Button variant="contained" sx={{ fontSize: "14px" }}>
                      Click Here To Proceed
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      {searchParams.get("status") === "security-terminate" && (
        <Box>
          <Typography variant="h2" my={4}>
            We are sorry
          </Typography>
          <Grid container mb={4}>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: "0px 1px 10px #ddd", p: 3 }}>
                <Typography>
                  Thank you for your interest in thanking this survey.
                  Unfortunately we can't accept any more responses.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} mt={4}>
              <Card sx={{ boxShadow: "0px 1px 10px #ddd", p: 3 }}>
                <Box textAlign={"right"}>
                  <Link href="https://nomadicsurveys.com/">
                    <Button variant="contained" sx={{ fontSize: "14px" }}>
                      Click Here To Proceed
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      {searchParams.get("status") === "terminate" && (
        <Box>
          <Grid container mb={4}>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: "0px 1px 10px #ddd", p: 3 }}>
                <Typography>
                  Thank you for participating in our latest survey, but
                  unfortunately we have sufficient responses in your category.
                  To ensure we only invite you to take part in relevant studies
                  please ensure your panel information is up to date by logging
                  into your panel dashboard and checking your information.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} mt={4}>
              <Card sx={{ boxShadow: "0px 1px 10px #ddd", p: 3 }}>
                <Box textAlign={"right"}>
                  <Link href="https://nomadicsurveys.com/">
                    <Button variant="contained" sx={{ fontSize: "14px" }}>
                      Click Here To Proceed
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProjectSubmission;
