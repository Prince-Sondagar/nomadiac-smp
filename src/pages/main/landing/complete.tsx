import { FC } from 'react';
import { Box, Button, Card, Container, Grid, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Complete: FC = (): JSX.Element => {

    const initialState = { firstName: "", lastName: "", email: "", paymentEmail: "", address1: "", address2: "", city: "", zipCode: "", state: "", country: "", mobile: "", jobTitle: "", workplace: "" };

    const detailSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        paymentEmail: Yup.string().email('Invalid Payment email'),
        address1: Yup.string().required('Address is required'),
        address2: Yup.string(),
        city: Yup.string().required('City is required'),
        zipCode: Yup.number().required('Zip code is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        mobile: Yup.number().required('Mobile is required'),
        jobTitle: Yup.string().required('Job title is required'),
        workplace: Yup.string(),
    });

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: detailSchema,
        onSubmit: (values) => {
        },
    });

    return (
        <Container>
            <Typography variant='h2' my={4}>Thank you very much! You successfully completed the survey!</Typography>
            <Grid container mb={4}>
                <Grid item xs={12} lg={6}>
                    <Card sx={{ boxShadow: '0px 1px 10px #ddd', p: 3, mr: { lg: 1.5 } }}>
                        <Typography>Thank you for taking our latest survey. Please enter your contact details below so we can process your honoraria.</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6} mt={{ xs: 4, lg: 0 }}>
                    <Card sx={{ boxShadow: '0px 1px 10px #ddd', p: 3, ml: { lg: 1.5 } }}>
                        <Typography variant='h5' color={"#4B5563"} fontSize={"16px"}>We are currently offering a bonus honorarium to our trusted panelists.</Typography>
                        <Typography mt={2} mb={1}>In case you have any colleagues in your country who may also be interested in taking part in this study, please feel free to pass their contact details right here. Once the referred colleague completes a study with us for the first time your account will be credited with a bonus honorarium as a thank you for your recommendation.</Typography>
                        <Box textAlign={"right"}>
                            <Button variant='contained' sx={{ fontSize: "14px" }}>Refer Colleague</Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Card sx={{ boxShadow: '0px 1px 10px #ddd', p: 3, mb: 4 }}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant='h5' color={"#4B5563"} fontSize={"16px"}>Please confirm your payment details</Typography>
                    <Typography mt={2} mb={1}>Please enter your contact details below so we can process your honoraria. Typically, the payments are processed within 4 - 8 weeks. Once we have clearance to release the honorarium you will be notified by email.</Typography>
                    <Grid container my={2}>
                        <Grid item xs={12} md={6} pb={2} pr={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="firstName"
                                variant="outlined"
                                placeholder="Enter First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pl={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Last Name"
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pr={{ md: 1 }}>
                            <TextField fullWidth
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Email Address"
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pl={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="paymentEmail"
                                value={formik.values.paymentEmail}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Payment Email"
                                error={formik.touched.paymentEmail && Boolean(formik.errors.paymentEmail)}
                                helperText={formik.touched.paymentEmail && formik.errors.paymentEmail}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pr={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="address1"
                                value={formik.values.address1}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Address 1"
                                error={formik.touched.address1 && Boolean(formik.errors.address1)}
                                helperText={formik.touched.address1 && formik.errors.address1}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pl={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="address2"
                                value={formik.values.address2}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Address 2"
                                error={formik.touched.address2 && Boolean(formik.errors.address2)}
                                helperText={formik.touched.address2 && formik.errors.address2}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pr={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter City"
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pl={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="zipCode"
                                value={formik.values.zipCode}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter ZIP/ Postcode"
                                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                                helperText={formik.touched.zipCode && formik.errors.zipCode}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pr={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Province / State"
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pl={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Country"
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                helperText={formik.touched.country && formik.errors.country}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pr={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Phone Number"
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={2} pl={{ md: 1 }}>
                            <TextField
                                fullWidth
                                name="jobTitle"
                                value={formik.values.jobTitle}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Your Job Title"
                                error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                                helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                            />
                        </Grid>
                        <Grid item xs={12} pb={1}>
                            <TextField
                                fullWidth
                                name="workplace"
                                value={formik.values.workplace}
                                onChange={formik.handleChange}
                                variant="outlined"
                                placeholder="Enter Place Of Work(Hospital or Office)"
                                error={formik.touched.workplace && Boolean(formik.errors.workplace)}
                                helperText={formik.touched.workplace && formik.errors.workplace}
                            />
                        </Grid>
                    </Grid>
                    <Box textAlign={"right"}>
                        <Button variant='contained' type='submit' sx={{ fontSize: "14px" }}>Click Here To Proceed</Button>
                    </Box>
                </form>
            </Card>
        </Container>
    )
}

export default Complete;