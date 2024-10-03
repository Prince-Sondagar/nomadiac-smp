import { Delete, Visibility } from '@mui/icons-material';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../../../../components/common/Alert';
import ConfirmationModal from '../../../../components/common/ConfirmationDelete';
import NoDataFoundComponent from '../../../../components/common/NoDataFoundComponent';
import TableLoader from '../../../../components/common/TableLoader';
import { CANT_DELETE_USER, SUPPLIER_ROUTE } from '../../../../constants';
import { Supplier, useRemoveSupplierMutation } from '../../../../generated';
import { ProjectTableStyle } from '../../../../theme/styleComponents';

type ISupplierList = {
    suppliers: Array<Supplier>;
    isLoading: boolean;
    refetch: Function;
}

const SupplierList = ({ suppliers, isLoading, refetch }: ISupplierList) => {
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [supplierId, setSupplierId] = useState<string>("");

    const [removeSupplier, { loading: deleteSupplierLoading }] = useRemoveSupplierMutation({
        onError() {
            Alert.error(CANT_DELETE_USER);
            setOpenDeleteModal(false);
        },

        onCompleted(data) {
            if (data) {
                const { removeSupplier: { response } } = data;
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
        setSupplierId(id);
        setOpenDeleteModal(true);
    };

    const handleDeleteSupplier = async () => {
        if (supplierId)
            await removeSupplier({ variables: { "supplierInput": { id: supplierId } } });
        setOpenDeleteModal(false);
    };

    return (
        <div>
            <Box className="table-overflow" pt={4}>
                <ProjectTableStyle>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="customized table">
                            <TableHead sx={{ backgroundColor: "#edced0" }}>
                                <TableRow>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Email</TableCell>
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
                                ) :
                                    (suppliers?.map((supplier: Supplier) => {
                                        return (
                                            <TableRow key={supplier?.id}>
                                                <TableCell>{supplier?.companyName}</TableCell>
                                                <TableCell>{supplier?.email || "N/A"}</TableCell>

                                                <TableCell>
                                                    <Link to={`${SUPPLIER_ROUTE}/${supplier?.id}`} state={SUPPLIER_ROUTE}>
                                                        <IconButton size="small">
                                                            <Visibility color="primary" />
                                                        </IconButton>
                                                    </Link>
                                                    <IconButton
                                                        aria-label="delete"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={() => onDeleteClick(supplier?.id)}
                                                    >
                                                        <Delete fontSize="small" color={"error"} />
                                                    </IconButton>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ProjectTableStyle>
                {(!isLoading && !suppliers?.length) && (
                    <Box display="flex" justifyContent="center" pb={12} pt={5}>
                        <NoDataFoundComponent />
                    </Box>
                )}

                <ConfirmationModal
                    title="Delete Supplier?"
                    isOpen={openDeleteModal}
                    isLoading={deleteSupplierLoading}
                    description="Are you sure you want to delete this Supplier?"
                    handleDelete={handleDeleteSupplier}
                    setOpen={setOpenDeleteModal}
                />
            </Box >
        </div >
    )
}

export default SupplierList;