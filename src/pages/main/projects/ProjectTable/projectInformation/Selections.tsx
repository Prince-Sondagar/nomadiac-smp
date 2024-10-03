import { FC } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const createData = (
    country: string,
    selectionName: string,
    quotaGroup: string,
    active: string
) => {
    return { country, selectionName, quotaGroup, active };
}

const rows = [createData('', '', '', '')];

const Selections: FC = (): JSX.Element => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#edced0" }}>
                    <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell>Selection Name</TableCell>
                        <TableCell>Quota Group</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{row.country}</TableCell>
                            <TableCell>{row.selectionName}</TableCell>
                            <TableCell>{row.quotaGroup}</TableCell>
                            <TableCell>{row.active}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Selections