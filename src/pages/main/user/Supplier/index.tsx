import { Search } from '@mui/icons-material';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Pagination from '../../../../components/pagination/Pagination';
import SupplierForm from '../../../../components/supplier/SupplierForm';
import { GRAPHQL_QUERY_POLICY } from '../../../../constants';
import { CreateSupplierInput, PaginationInput, PaginationPayload, Supplier, UpdateSupplierInput, useCreateSupplierMutation, useFetchAllSuppliersQuery, useUpdateSupplierMutation } from '../../../../generated';
import { createSupplierHandler, updateSupplierHandler } from '../../../../utils/project';
import SupplierList from './SupplierList';

type IcreateEditSuppliers = {
    selectedSupplier: string | null | Supplier,
    isOpen: boolean,
    for: "add" | "edit" | ""
}

const SupplierPanel = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [paginationState, setPaginationState] = useState<PaginationInput>({ page: 1, limit: 10 });
    const [suppliers, setSuppliers] = useState<Array<Supplier>>([]);
    const [pagination, setPagination] = useState<PaginationPayload>({});
    const [createEditSuppliers, setCreateEditSuppliers] = useState<IcreateEditSuppliers>({ selectedSupplier: "", isOpen: false, for: "add" });

    const { data: fetchAllSupplier, loading: fetchSupplierLoading, refetch } = useFetchAllSuppliersQuery({
        ...(GRAPHQL_QUERY_POLICY) as any,
        variables: {
            suppliersInput: {
                paginationOptions: {
                    page: paginationState?.page,
                    limit: paginationState?.limit,
                },
                searchQuery: searchQuery
            },
        },
    });

    const [createSupplier, { loading: createSupplierLoading }] = useCreateSupplierMutation({ ...(GRAPHQL_QUERY_POLICY as any) });

    const [updateSupplier, { loading: updateSupplierLoading }] = useUpdateSupplierMutation({ ...(GRAPHQL_QUERY_POLICY as any) });

    useEffect(() => {
        const list = fetchAllSupplier?.fetchAllSuppliers.suppliers;
        setSuppliers(list as Array<Supplier>);
        const paginate = fetchAllSupplier?.fetchAllSuppliers.pagination;
        setPagination(paginate as PaginationPayload);
    }, [fetchAllSupplier]);

    const handleAddUserModalOpen = () => {
        setCreateEditSuppliers({ ...createEditSuppliers, isOpen: true, for: "add" });
    };

    const supplierCreation = async (data: CreateSupplierInput) => {
        const userData = await createSupplier({ variables: createSupplierHandler(data) });
        await refetch();
        return userData;
    };

    const supplierUpdation = async (data: UpdateSupplierInput) => {
        await updateSupplier({ variables: updateSupplierHandler(data) });
        await refetch();
    };

    const handleUserSearch = async () => {
        if (searchQuery) {
            const filterResult = suppliers?.filter((supplier: Supplier) => {
                const search = searchQuery?.toLowerCase();
                return supplier?.name?.toLowerCase().includes(search) || (supplier?.email && supplier?.email.toLowerCase().includes(search)) || supplier?.companyName?.toLowerCase().includes(search)
            });
            setSuppliers(filterResult);
        }
        else {
            await refetch();
        }
    };

    const loading = fetchSupplierLoading || createSupplierLoading || updateSupplierLoading;

    return (
        <>
            <Box pt={1}>
                <Box pb={2} display={{ sm: "flex" }} justifyContent='space-between' alignItems='center'>
                    <TextField
                        name="searchQuery"
                        value={searchQuery}
                        onChange={({ target: { value } }) => setSearchQuery(value)}
                        onKeyPress={({ key }) => key === "Enter" && handleUserSearch()}
                        placeholder="Search"
                        variant="outlined"
                        margin="none"
                        InputProps={{
                            endAdornment:
                                <IconButton color="default" onClick={() => handleUserSearch()}>
                                    <Search color="inherit" />
                                </IconButton>
                        }}

                    // disabled={isLoading}
                    />
                    <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                        <Button variant='contained' color="primary" onClick={() => handleAddUserModalOpen()}>
                            Add Supplier
                        </Button>
                    </Box>
                </Box>
                <Box display='flex' flexWrap={"wrap"} gap={2}>
                    {/* <IconButton color="secondary"
             onClick={handleReset}
             >
              <Tooltip title={RESET_FILTERS} placement="left">
                <RotateLeft color="primary" />
              </Tooltip>
            </IconButton> */}
                </Box>
            </Box>

            <SupplierList suppliers={suppliers} isLoading={loading} refetch={refetch} />

            {suppliers?.length && (
                <Pagination pagination={pagination} paginationState={paginationState} setPaginationState={setPaginationState} />
            )}

            <SupplierForm
                createEditSuppliers={createEditSuppliers}
                setCreateEditSuppliers={setCreateEditSuppliers}
                loading={loading}
                supplierCreation={supplierCreation}
                supplierUpdation={supplierUpdation}
            />

        </>
    )
}

export default SupplierPanel;