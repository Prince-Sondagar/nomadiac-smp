import { Delete, Edit } from '@mui/icons-material';
import { Autocomplete, Button, CircularProgress, FormControl, Grid, IconButton, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useSnackbar } from 'notistack';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { GRAPHQL_QUERY_POLICY } from '../../constants';
import { CreateProjectQuotaGroupInput, CreateSupplierQuotaGroupInput, QuotaType, Supplier, useAddQuotaGroupsToProjectMutation, useFetchAllQuotasQuery } from '../../generated';
import { AddQuotaGroupsToProjectHandler } from '../../utils/project';
import ConfirmationModal from '../common/ConfirmationDelete';
import { CreateEditSupplierType, initCreateEditSupplier } from '../../pages/main/projects/ProjectTable/QuotaGroup';
import AddSupplierDetails from '../supplier/AddSupplierDetails';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'auto',
  bgcolor: 'background.paper',
  border: '0',
  borderRadius: "8px",
  boxShadow: 24,
  outline: "none",
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxHeight: '70vh',
  overflowY: 'auto',
  "@media(max-width: 575px)": {
    width: "95%",
    px: 3,
  },
  ".MuiFormControl-root": {
    margin: 0
  }
};

type Props = {
  addQuotaOpen: boolean
  setAddQuotaOpen: Dispatch<SetStateAction<boolean>>;
  supplierList: Array<Supplier>;
  setQuotaGroupInput: Dispatch<SetStateAction<{ projectId?: string, quotaGroup?: CreateProjectQuotaGroupInput }>>;
  quotaGroupInput: { projectId?: string, quotaGroup?: CreateProjectQuotaGroupInput };
  refreshList: Function;
}

const AddQuotaGroup: FC<Props> = ({ addQuotaOpen, setAddQuotaOpen, quotaGroupInput, setQuotaGroupInput, supplierList, refreshList }) => {
  const [fetchedQuotaList, setFetchedQuotaList] = useState<({ __typename?: "Quota" | undefined; id: string; name: string; type: QuotaType; } | null)[]>([]);
  const [filteredSupplierList, setFilteredSupplierList] = useState<Array<Supplier>>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<string | null>(null);
  const [removeUserLoading, setRemoveUserLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const [createEditSupplier, setCreateEditSupplier] = useState<CreateEditSupplierType>(initCreateEditSupplier);

  const [addQuotaGroupsToProject, { loading: addQuotaGroupsToProjectLoading }] = useAddQuotaGroupsToProjectMutation({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted(data) {
      const { addQuotaGroupsToProject: { response } } = data
      if (response?.status === 200)
        enqueueSnackbar(response.message)
    }
  });

  useFetchAllQuotasQuery({
    ...GRAPHQL_QUERY_POLICY,
    variables: {
      "fetchAllQuotasInput": {
        "type": "REGION" as QuotaType
      }
    }, onCompleted(data) {
      if (Array.isArray(data.fetchAllQuotas.quota))
        setFetchedQuotaList(data.fetchAllQuotas.quota);
    }
  });

  useEffect(() => {
    setFilteredSupplierList(supplierList);
  }, [supplierList])

  useEffect(() => {
    setFilteredSupplierList(filteredSupplierList.filter((sup) => !quotaGroupInput.quotaGroup?.suppliers.find((supplier) => supplier.supplierId === sup.id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotaGroupInput])

  const addSupplierHandle = () => {
    const user = supplierList?.find((qs) => qs.id === createEditSupplier?.selectedUser)
    setCreateEditSupplier({ ...createEditSupplier, isOpen: true, for: "add", user: user as Supplier })
  }

  const editHandler = (supplierId: string) => {
    setCreateEditSupplier({ ...createEditSupplier, selectedProjectUserId: undefined, selectedUser: supplierId, isOpen: true, for: "edit" })
  }

  const removeHandler = (supplierId: string) => {
    setOpenDeleteModal(supplierId);
  }

  const handleDeleteUser = () => {
    setRemoveUserLoading(true)
    const filteredList = quotaGroupInput.quotaGroup?.suppliers?.filter((user) => user?.supplierId !== openDeleteModal)
    setQuotaGroupInput({ ...quotaGroupInput, quotaGroup: { ...quotaGroupInput.quotaGroup, suppliers: filteredList ?? [] } as any });
    setOpenDeleteModal(null);
    setRemoveUserLoading(false)
  }

  const submitHandler = async (value: any) => {
    await addQuotaGroupsToProject({ variables: AddQuotaGroupsToProjectHandler({ ...quotaGroupInput, ...value }) })
    await refreshList()
    setQuotaGroupInput({})
    setAddQuotaOpen(false)
    setFilteredSupplierList(supplierList);
  }

  const handleChangeQuotaGroup = (name: string, value: any) => {
    const quotaGroup: any = { ...quotaGroupInput?.quotaGroup, [name]: value }
    setQuotaGroupInput({ ...quotaGroupInput, quotaGroup });
  }

  const onChangeHandler = (panelUser: string) => {
    setCreateEditSupplier({ ...createEditSupplier, selectedUser: panelUser });
  }

  const cancelHandler = () => {
    setAddQuotaOpen(false)
    setQuotaGroupInput({})
  }

  const handleSubmitAddSupplier = async (supplier: CreateSupplierQuotaGroupInput) => {
    if (createEditSupplier.for === "add") {
      handleChangeQuotaGroup("suppliers", [...(quotaGroupInput.quotaGroup?.suppliers ?? []), supplier]);
    }
    else if (createEditSupplier.for === "edit")
      handleChangeQuotaGroup("suppliers", quotaGroupInput.quotaGroup?.suppliers?.map((sup) => sup.supplierId === supplier.supplierId ? { ...sup, ...supplier } : sup));
  }

  return (
    <Modal open={addQuotaOpen} onClose={() => setAddQuotaOpen(false)}>
      <Container>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" color={"#000"} fontWeight={"bold"} mb={3}>
            Create Quota Group
          </Typography>
          <Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
            <Typography color={"#000"} mb={0.5}>Select Quota</Typography>
            <FormControl fullWidth>
              <Autocomplete
                id="quota-group-ids"
                options={fetchedQuotaList.map((option) => option?.name)}
                value={fetchedQuotaList.find((list) => list?.id === quotaGroupInput.quotaGroup?.quotaIds[0])?.name}
                renderInput={(params) => <TextField {...params} label="" name="quotaIds" placeholder='Quota Group' />}
                onChange={(_, value) => handleChangeQuotaGroup("quotaIds", [fetchedQuotaList.find((list) => list?.name === value)?.id])}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
            <Box>
              <Typography color={"#000"} mt={1.5} mb={0.5}>Quota Group Name</Typography>
              <TextField fullWidth name='name' placeholder='Quota Group Name' value={quotaGroupInput.quotaGroup?.name} onChange={({ target: { name, value } }) => handleChangeQuotaGroup(name, value)} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
            <Box>
              <Typography color={"#000"} mt={1.5} mb={0.5}>Survey Entry Link</Typography>
              <TextField fullWidth name='surveyEntryLink' placeholder='Survey Entry Link' value={quotaGroupInput.quotaGroup?.surveyEntryLink || ""} onChange={({ target: { name, value } }) => handleChangeQuotaGroup(name, value)} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
            <Box>
              <Typography color={"#000"} mt={1.5} mb={0.5}>Complete Cap</Typography>
              <TextField fullWidth name='completeCap' placeholder='Complete Cap' value={quotaGroupInput.quotaGroup?.completeCap || ""} onChange={({ target: { name, value } }) => handleChangeQuotaGroup(name, value)} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
            <Typography color={"#000"} mt={1.5} mb={0.5}>Select supplier</Typography>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Box mr={{ sm: 2 }}>
                  <FormControl fullWidth>
                    <Select fullWidth name="panelist" value={createEditSupplier.selectedUser || ""} onChange={({ target }) => onChangeHandler(target.value)}>
                      {filteredSupplierList?.map((supplier: Supplier) => <MenuItem key={supplier.id} value={supplier.id}>{supplier.companyName}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} mt={{ xs: 2, sm: 0 }} textAlign={"right"}>
                <Button fullWidth variant="contained" disabled={!createEditSupplier.selectedUser} onClick={() => addSupplierHandle()} style={{ width: "max-content" }}>
                  Add Supplier
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {quotaGroupInput.quotaGroup?.suppliers?.length ?
            (<Grid item xs={12} md={6} xl={3} mb={{ xs: 2, xl: 0 }}>
              <Box my={{ md: 3 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", display: "block", overflow: "auto" }}>
                  <thead style={{ display: "table", width: "100%" }}>
                    <tr style={{ backgroundColor: "#edced0", display: "table", width: "100%" }}>
                      <th style={{ padding: "5px 16px" }} align={"left"}>Name</th>
                      <th style={{ padding: "5px 16px" }} align={"right"}>Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ display: "block", maxHeight: "100px", overflowY: "auto" }}>
                    {quotaGroupInput.quotaGroup?.suppliers?.map((quota: CreateSupplierQuotaGroupInput) => {
                      const user = supplierList?.find((user: Supplier) => user?.id === quota?.supplierId);
                      return (<tr key={quota?.supplierId} style={{ display: "table", width: "100%" }}>
                        <td style={{ padding: "5px 16px" }}>{user?.companyName}</td>
                        <td style={{ padding: "5px 16px" }} align={"right"}>
                          <IconButton aria-label="delete" color="secondary" size="small" onClick={() => editHandler(quota?.supplierId)}>
                            <Edit fontSize="small" color={"error"} />
                          </IconButton>
                          <IconButton aria-label="delete" color="secondary" size="small" onClick={() => removeHandler(quota?.supplierId)}>
                            <Delete fontSize="small" color={"error"} />
                          </IconButton>
                        </td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              </Box>
            </Grid>)
            : ""}
          <Box display='flex' alignItems='center' justifyContent='space-between' mt={3}>
            <Button variant="outlined" color="primary" onClick={() => cancelHandler()}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary"
              disabled={addQuotaGroupsToProjectLoading || !quotaGroupInput.quotaGroup?.quotaIds[0]?.length}
              onClick={submitHandler}
              endIcon={addQuotaGroupsToProjectLoading && <CircularProgress size={20} color="inherit" />}>Submit</Button>
          </Box>
        </Box>
        <AddSupplierDetails
          createEditSupplier={createEditSupplier}
          onClose={setCreateEditSupplier}
          quotaInputList={quotaGroupInput.quotaGroup?.suppliers}
          handleSubmitAddSupplier={handleSubmitAddSupplier}
          quotaInput={quotaGroupInput?.quotaGroup}
        />
        <ConfirmationModal
          title="Remove Supplier From Quota?"
          isOpen={!!openDeleteModal}
          isLoading={removeUserLoading}
          description={`Are you sure you want to remove this supplier ?`}
          handleDelete={handleDeleteUser}
          setOpen={setOpenDeleteModal}
          actionText="Remove"
        />
      </Container>
    </Modal >
  )
}

export default AddQuotaGroup