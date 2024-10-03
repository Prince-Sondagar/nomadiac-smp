//packages block
import { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import { Box, Button, IconButton, TextField } from '@mui/material';

//components block
import ClientTable from './ClientTable';
import ClientForm from '../../../../components/client/ClientForm';

//others block
import { GRAPHQL_QUERY_POLICY } from '../../../../constants';
import Pagination from '../../../../components/pagination/Pagination';
import { useFetchAllCompaniesQuery, useCreateCompanyMutation, useUpdateCompanyMutation, Company, CreateCompanyInput, PaginationInput, PaginationPayload } from '../../../../generated';
import { useSnackbar } from 'notistack';
import { createCompanyHandler, updateCompanyHandler } from '../../../../utils/project';

const Client = () => {
    const [clients, setClients] = useState<Array<Company>>([]);
    const [paginationState, setPaginationState] = useState<PaginationInput>({ page: 1, limit: 10 });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<PaginationPayload>({});
    const { enqueueSnackbar } = useSnackbar();
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [createEditcompany, setCreateEditcompany] = useState<{
        selectedCompany: string | null | Company,
        isOpen: boolean,
        for: "add" | "edit"
    }>({ selectedCompany: "", isOpen: false, for: "add" });

    const { data, refetch } = useFetchAllCompaniesQuery({
        ...GRAPHQL_QUERY_POLICY, variables: {
            "companiesInput": {
                "paginationOptions": { "limit": paginationState?.limit, "page": paginationState?.page }
            }
        }
    });

    const [createCompany, { loading: createCompanyLoading }] = useCreateCompanyMutation({
        ...(GRAPHQL_QUERY_POLICY as any),

        onError(error) {
            enqueueSnackbar("Something is wrong, please check values again");
        },
        onCompleted() {
            enqueueSnackbar("Client created successfully");
        }
    });

    const [updateCompany, { loading: updateCompanyLoading }] = useUpdateCompanyMutation({
        ...(GRAPHQL_QUERY_POLICY as any),

        onError(error) {
            enqueueSnackbar("Something is wrong, please check values again");
        },
        onCompleted() {
            enqueueSnackbar("Client updated successfully");
        }
    });

    const companyCreation = async (data: CreateCompanyInput) => {
        await createCompany({ variables: createCompanyHandler(data) });
        await refetch();
    };

    const companyUpdation = async (data: Company) => {
        await updateCompany({ variables: updateCompanyHandler(data) });
        await refetch();
    };

    useEffect(() => {
        if (data) {
            const list: Array<any> = data?.fetchAllCompanies.companies;
            setClients(list || []);
            setIsLoading(false);
            const paginationData = data.fetchAllCompanies.pagination;
            if (paginationData) setPagination(paginationData);
            else setPagination({})
        }
    }, [data]);


    const handleAddUserModalOpen = () => {
        setCreateEditcompany({ ...createEditcompany, isOpen: true, for: "add" });
    };

    const handleUserSearch = async () => {
        if (searchQuery) {
            const filterResult = clients?.filter((client: Company) => {
                const search = searchQuery?.toLowerCase();
                return client?.name.toLowerCase().includes(search) || (client?.email && client?.email.toLowerCase().includes(search));
            });
            setClients(filterResult);
        }
        else {
            await refetch();
        }
    };

    const loading = createCompanyLoading || updateCompanyLoading;

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

                        disabled={isLoading}
                    />
                    <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                        <Button variant='contained' color="primary"
                            onClick={() => handleAddUserModalOpen()}
                        >
                            Add Client
                        </Button>
                    </Box>
                </Box>
                <Box display='flex' gap='30px'>
                    {/* <IconButton color="secondary" onClick={handleReset}>
                        <Tooltip title={RESET_FILTERS} placement="left">
                            <RotateLeft color="primary" />
                        </Tooltip>
                    </IconButton> */}
                </Box>
            </Box>

            <ClientTable users={clients} isLoading={isLoading} refetch={refetch} setCreateEditcompany={setCreateEditcompany} />

            {clients?.length > 0 && (
                <Pagination pagination={pagination} paginationState={paginationState} setPaginationState={setPaginationState} />
            )}

            <ClientForm
                createEditcompany={createEditcompany}
                setCreateEditcompany={setCreateEditcompany}
                loading={loading}
                companyCreation={companyCreation}
                companyUpdation={companyUpdation}
            />

        </>
    )
}

export default Client;