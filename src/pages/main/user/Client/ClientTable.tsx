import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { Alert } from '../../../../components/common/Alert';
import ConfirmationModal from '../../../../components/common/ConfirmationDelete';
import NoDataFoundComponent from '../../../../components/common/NoDataFoundComponent';
import TableLoader from '../../../../components/common/TableLoader';
import { CANT_DELETE_USER } from '../../../../constants';
import { Company, useRemoveCompanyMutation } from '../../../../generated';
import { ProjectTableStyle } from '../../../../theme/styleComponents';
import { toTitleCase } from '../../../../utils';

type ICreateEditcompany = {
    selectedCompany: string | null | Company,
    isOpen: boolean,
    for: "add" | "edit"
}

type IClientTable = {
    users: Array<Company>;
    isLoading: boolean;
    refetch: Function;
    setCreateEditcompany: Dispatch<SetStateAction<ICreateEditcompany>>;
}

const ClientTable = ({ users, isLoading, refetch, setCreateEditcompany }: IClientTable) => {
    const [companyId, setCompanyId] = useState<string>("");
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const [removeCompany, { loading: deleteCompanyLoading }] = useRemoveCompanyMutation({
        onError() {
            Alert.error(CANT_DELETE_USER);
            setOpenDeleteModal(false);
        },

        onCompleted(data) {
            if (data) {
                const { removeCompany: { response } } = data;

                if (response) {
                    const { message } = response;
                    message && Alert.success(message);
                    refetch();
                    setOpenDeleteModal(false);

                }
            }
        }
    });

    const onDeleteClick = (id: string) => {
        setCompanyId(id);
        setOpenDeleteModal(true);
    };

    const onEditClick = (company: Company) => {
        setCreateEditcompany({ selectedCompany: company, isOpen: true, for: "edit" });
    };

    const handleDeleteCompany = async () => {
        if (companyId)
            await removeCompany({ variables: { "companyInput": { id: companyId } } });
    };

    return (
        <Box className="table-overflow" pt={4}>
            <ProjectTableStyle>
                <TableContainer component={Paper}>
                    <Box>
                        <Table sx={{ minWidth: 650 }} aria-label="customized table">
                            <TableHead sx={{ backgroundColor: "#edced0" }}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Client Number</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={10}>
                                            <TableLoader numberOfRows={10} numberOfColumns={6} />
                                        </TableCell>
                                    </TableRow>
                                ) : (users?.map((user: Company) => {
                                    return (
                                        <TableRow key={user?.id}>
                                            <TableCell>
                                                <Box display="flex" alignItems="center" color={"black"}>
                                                    <Typography variant='body2'>
                                                        {toTitleCase(`${user?.name}`)}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{user?.email ? user?.email : "N/A"}</TableCell>
                                            <TableCell>{user?.clientNumber ? user?.clientNumber : "N/A"}</TableCell>
                                            <TableCell>
                                                <Box display="flex" alignItems="center">
                                                    <IconButton
                                                        aria-label="delete"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={() => onEditClick(user)}
                                                    >
                                                        <Edit fontSize="small" color={"error"} />
                                                    </IconButton>

                                                    <IconButton
                                                        aria-label="delete"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={() => onDeleteClick(user?.id)}
                                                    >
                                                        <Delete fontSize="small" color={"error"} />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }))}
                            </TableBody>
                        </Table>
                    </Box>
                </TableContainer>
            </ProjectTableStyle>
            {(!isLoading && !users?.length) ? (
                <Box display="flex" justifyContent="center" pb={12} pt={5}>
                    <NoDataFoundComponent />
                </Box>
            ) : ""}

            <ConfirmationModal
                title="Delete User?"
                isOpen={openDeleteModal}
                isLoading={deleteCompanyLoading}
                description="Are you sure you want to delete this user?"
                handleDelete={handleDeleteCompany}
                setOpen={setOpenDeleteModal}
            />
        </Box>
    )
}

export default ClientTable;