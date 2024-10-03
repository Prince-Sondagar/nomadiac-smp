import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import { Maybe, Project, QuotaGroup, Supplier, SupplierQuotaGroup, useAddSupplierToQuotaGroupMutation, useRemoveSupplierFromQuotaGroupMutation, useUpdateQuotaGroupMutation, useUpdateSupplierQuotaGroupMutation } from "../../../../generated";
import SupplierQuotaTable from "../../../../components/quotagroup/SupplierQuotaTable";
import ConfirmationModal from "../../../../components/common/ConfirmationDelete";
import { GRAPHQL_QUERY_POLICY } from "../../../../constants";
import { useSnackbar } from "notistack";
import AddSupplierDetails from "../../../../components/supplier/AddSupplierDetails";
import { addSupplierToQuotaGroupHandler, updateQuotaGroupHandler, updateSupplierQuotaGroupHandler } from "../../../../utils/project";

type Props = {
  quotaGroup: Maybe<QuotaGroup>;
  supplierList: Supplier[];
  onDelete: (id: string) => void;
  refreshList: Function;
  project: Project
}

export type CreateEditSupplierType = { selectedQuotaGroup?: string, selectedProjectUserId?: string, selectedUser?: string, isOpen: boolean, for?: "add" | "edit", user?: Supplier, completeCap?: string };
export const initCreateEditSupplier: CreateEditSupplierType = { isOpen: false, for: "add" };

const QuotaGroupComponent: FC<Props> = ({ quotaGroup, supplierList, onDelete, refreshList, project }) => {
  const country = (quotaGroup?.quota?.map((qs) => qs?.name))?.[0];
  const SupplierQuotaGroup = quotaGroup?.supplierQuotaGroup;
  const filterdSupplierList = supplierList.filter((user) => !SupplierQuotaGroup?.find((qs) => qs?.supplierId === user?.id));
  const [createEditSupplier, setCreateEditSupplier] = useState<CreateEditSupplierType>(initCreateEditSupplier);
  const [openDeleteModal, setOpenDeleteModal] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const { completeCap, completeCapLeft } = quotaGroup || {};

  const [updateSupplierQuotaGroup] = useUpdateSupplierQuotaGroupMutation({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted(data) {
      const { updateSupplierQuotaGroup: { response } } = data;
      if (response?.status === 200)
        enqueueSnackbar(response.message);
    }
  });

  const [addSupplierQuotaGroup] = useAddSupplierToQuotaGroupMutation({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted(data) {
      const { addSupplierToQuotaGroup: { response } } = data;
      if (response?.status === 200)
        enqueueSnackbar(response.message);
    }
  });

  const [removeSupplierFromQuotaGroup, { loading: removeSupplierFromQuotaGroupLoading }] = useRemoveSupplierFromQuotaGroupMutation({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted(data) {
      const { removeSupplierFromQuotaGroup: { response } } = data;
      if (response?.status === 200)
        enqueueSnackbar(response?.message);
    }
  });

  const [updateQuotaGroup] = useUpdateQuotaGroupMutation({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted(data) {
      const { updateQuotaGroup: { response } } = data;
      if (response?.status === 200)
        enqueueSnackbar(response.message);
    }
  });

  const handleDeleteSupplierToQuotaGroup = async () => {
    await removeSupplierFromQuotaGroup({
      variables: {
        "removeSupplierToQuotaGroup": { "id": openDeleteModal }
      }
    })
    await refreshList();
    setOpenDeleteModal("");
  };

  const handleSubmitAddSupplier = async (supplier: SupplierQuotaGroup) => {
    const oldSupplier = SupplierQuotaGroup?.find((sup) => sup.supplierId === supplier.supplierId)
    if (createEditSupplier.for === "edit") {
      if (supplier.completeCap !== oldSupplier?.completeCap)
        supplier = { ...supplier, supplierCompleteCapLeft: (+(oldSupplier?.supplierCompleteCapLeft ?? 0) + (+(supplier?.completeCap ?? 0) - +(oldSupplier?.completeCap ?? 0))).toString() };

      await updateSupplierQuotaGroup({ variables: updateSupplierQuotaGroupHandler({ ...supplier, id: oldSupplier?.id ?? "" }) });
      await refreshList();
    }
    else if (createEditSupplier.for === "add") {
      supplier = { ...supplier, quotaGroupId: createEditSupplier?.selectedQuotaGroup || "", supplierId: createEditSupplier.selectedUser || "", supplierCompleteCapLeft: supplier?.completeCap };
      await addSupplierQuotaGroup({ variables: addSupplierToQuotaGroupHandler(supplier) });
      await refreshList();
    }

  };

  const addSupplierHandle = (item: Maybe<QuotaGroup>) => {
    setCreateEditSupplier({ ...createEditSupplier, isOpen: true, for: "add", selectedQuotaGroup: item?.id });
  };

  const onChangeHandler = (panelUser: string) => {
    setCreateEditSupplier({ ...createEditSupplier, selectedUser: panelUser });
  };

  const editHandler = (supplierId: string, quotagroup: Maybe<QuotaGroup>) => {
    setCreateEditSupplier({ ...createEditSupplier, selectedUser: supplierId, isOpen: true, for: "edit", selectedQuotaGroup: quotagroup?.id });
  };

  const onQuotaGroupUpdate = async (name: string, value: string) => {
    const updatedValue = { completeCapLeft: completeCapLeft || "" }

    if (value?.length) {
      if (name === "completeCap") {
        if (!Boolean(parseInt(completeCapLeft || ""))) {
          updatedValue.completeCapLeft = completeCap || ""
        }
        else {
          const parsedCompleteCapValue = parseInt(completeCap || "");
          const updatedCompleteCapValue = parseInt(value);

          if (updatedCompleteCapValue < parsedCompleteCapValue) {
            const value = parsedCompleteCapValue - updatedCompleteCapValue;
            updatedValue.completeCapLeft = String(parseInt(completeCapLeft || "") - value);
          } else if (updatedCompleteCapValue > parsedCompleteCapValue) {
            // assuming the increase in the cap
            const value = updatedCompleteCapValue - parsedCompleteCapValue;
            updatedValue.completeCapLeft = String(parseInt(completeCapLeft || "") + value);
          }
        }
      };
      await updateQuotaGroup({ variables: updateQuotaGroupHandler({ ...quotaGroup, [name]: value, ...updatedValue } as QuotaGroup) });
    };

    await refreshList();
  };

  const onNameUpdate = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    onQuotaGroupUpdate(name, value);
  };

  return (
    <Box mb={3} p={3} bgcolor={"#f2f2f2"} border={"1px solid #d3cccc"}>
      <Grid container key={quotaGroup?.id} spacing={2} alignItems={"end"}>
        <Grid item xs={5}>
          <Typography variant="h5" mb={0.8}>Country</Typography>
          <TextField fullWidth value={country} />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h5" mb={0.8}>Name</Typography>
          <TextField fullWidth name="name" defaultValue={quotaGroup?.name} onBlur={onNameUpdate} />
        </Grid>

        <Grid item xs={12} md={5} xl={3}>
          <Box>
            <Typography variant="h5" mb={0.8}>Complete Cap</Typography>
            <TextField fullWidth name='completeCap' placeholder='Complete Cap' defaultValue={quotaGroup?.completeCap || ""} onBlur={onNameUpdate} />
          </Box>
        </Grid>

        {/* <Grid item xs={3.4}>
                    <Typography variant="h5" mb={0.8}>Survey Entry Link</Typography>
                    <TextField fullWidth name="surveyEntryLink" defaultValue={quotaGroup?.surveyEntryLink} onBlur={onNameUpdate} />
                </Grid> */}
        <Grid item xs={2} textAlign={"right"}>
          <Button variant='contained' color="primary" onClick={() => quotaGroup && onDelete(quotaGroup?.id)}>Delete Group</Button>
        </Grid>
        <Grid item xs={12} mb={2}>
          <SupplierQuotaTable
            SupplierQuotaGroup={SupplierQuotaGroup ?? []}
            addSupplierHandle={addSupplierHandle}
            onChangeHandler={onChangeHandler}
            createEditSupplier={createEditSupplier}
            filterdSupplierList={filterdSupplierList}
            editHandler={editHandler}
            deleteHandler={setOpenDeleteModal}
            quotaGroup={quotaGroup}
            project={project}
          />
        </Grid>
      </Grid>
      <AddSupplierDetails
        createEditSupplier={createEditSupplier}
        onClose={setCreateEditSupplier}
        quotaInputList={createEditSupplier.for === "add" ? supplierList.map((sup) => ({ ...sup, supplierId: sup.id, surveyEntryLink: quotaGroup?.surveyEntryLink })) : quotaGroup?.supplierQuotaGroup}
        handleSubmitAddSupplier={handleSubmitAddSupplier}
      />
      <ConfirmationModal
        title="Remove Supplier?"
        isOpen={!!openDeleteModal}
        isLoading={removeSupplierFromQuotaGroupLoading}
        description={`Are you sure you want to remove this supplier from Quota Group ?`}
        handleDelete={handleDeleteSupplierToQuotaGroup}
        setOpen={setOpenDeleteModal}
        actionText="Remove"
      />
    </Box>
  )
}

export default QuotaGroupComponent;