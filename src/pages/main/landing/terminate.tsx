import { FC } from 'react';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';

const Terminate: FC = (): JSX.Element => {
    return (
        <Container>
            <Typography variant='h2' my={4}>We are sorry</Typography>
            <Grid container mb={4}>
                <Grid item xs={12}>
                    <Card sx={{ boxShadow: '0px 1px 10px #ddd', p: 3 }}>
                        <Typography>Thank you for participating in our latest survey, but unfortunately we have sufficient responses in your category. To ensure we only invite you to take part in relevant studies please ensure your panel information is up to date by logging into your panel dashboard and checking your information.</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} mt={4}>
                    <Card sx={{ boxShadow: '0px 1px 10px #ddd', p: 3 }}>
                        <Box textAlign={"right"}>
                            <Button variant='contained' sx={{ fontSize: "14px" }}>
                                Click Here To Proceed
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Terminate;