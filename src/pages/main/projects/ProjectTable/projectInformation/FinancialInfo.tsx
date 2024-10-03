import { FC, useState } from 'react'
import { Box, Button, FormControl, Grid, InputAdornment, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'

const currencyList = [
    { value: '5', name: "Australian Dollars" },
    { value: '2', name: "Canadian Dollars" },
    { value: '6', name: "Danish Krone" },
    { value: '4', name: "Euros" },
    { value: '9', name: "Malaysian ringgit" },
    { value: '7', name: "Norwegian Krone" },
    { value: '10', name: "Philippine peso" },
    { value: '1', name: "Pounds Sterling" },
    { value: '3', name: "US Dollars" },
    { value: '8', name: "Zwitserse frank" },
];

const accountList = [
    { value: '99', name: "Other" },
    { value: '1', name: "CPI" },
    { value: '2', name: "Incentives" },
    { value: '3', name: "Incentive Admin Fee" },
    { value: '4', name: "Project Management" },
    { value: '5', name: "Data Processing" },
    { value: '6', name: "Data Analysis" },
    { value: '7', name: "List Matching Fee" }
];

const FinancialInfo: FC = (): JSX.Element => {
    const [methodology, setMethodology] = useState('3');
    const [account, setAccount] = useState('99');

    const handleChange = (event: SelectChangeEvent) => {
        setMethodology(event.target.value as string);
        setAccount(event.target.value as string);
    };

    return (
        <Box>
            <Typography variant='h3'>Project Financials</Typography>
            <Grid container my={3}>
                <Grid item xs={3}>
                    <Box>
                        <Typography color={"#000"} mb={0.5}>Invoice Currency</Typography>
                        <FormControl fullWidth>
                            <Select name="clientCompany" value={methodology} onChange={handleChange}>
                                {currencyList.map((currency, key) => <MenuItem key={key} value={currency.value}>{currency.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box mx={3}>
                        <Typography color={"#000"} mb={0.5}>Project Management Fee</Typography>
                        <TextField fullWidth variant="outlined" placeholder='0.00' />
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box mr={3}>
                        <Typography color={"#000"} mb={0.5}>Advance Payment</Typography>
                        <TextField fullWidth variant="outlined" placeholder='0.00' InputProps={{ endAdornment: <InputAdornment position="start">%</InputAdornment> }} />
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        <Typography color={"#000"} mb={0.5}>Client PO#</Typography>
                        <TextField fullWidth variant="outlined" />
                    </Box>
                </Grid>
            </Grid>
            <Typography variant='h3' mb={2}>Additional Project Costs</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#edced0" }}>
                        <TableRow>
                            <TableCell>Account</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                                <FormControl fullWidth>
                                    <Select name="acName" value={account} onChange={handleChange}>
                                        {accountList.map((account, index) => <MenuItem key={index} value={account.value}>{account.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell><TextField fullWidth variant="outlined" /></TableCell>
                            <TableCell><TextField fullWidth variant="outlined" /></TableCell>
                            <TableCell><TextField fullWidth variant="outlined" /></TableCell>
                            <TableCell><Button variant="contained" color="success">Add</Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default FinancialInfo