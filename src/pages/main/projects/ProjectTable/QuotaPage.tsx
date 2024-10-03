import { FC, useEffect, useState } from 'react';
import { Box, Button, } from '@mui/material';
import AddQuotaGroup from '../../../../components/quotagroup/AddQuotaGroup';
import { GRAPHQL_QUERY_POLICY } from '../../../../constants';
import { CreateProjectQuotaGroupInput, Maybe, Project, QuotaGroup, Supplier, useFetchAllSuppliersQuery, useRemoveQuotaGroupMutation } from '../../../../generated';
import ConfirmationModal from '../../../../components/common/ConfirmationDelete';
import { useSnackbar } from 'notistack';
import QuotaGroupComponent from './QuotaGroup';

type Props = {
  projectId: string;
  refreshList: Function;
  project: Project;
}

const QuotaPage: FC<Props> = ({ projectId, refreshList, project }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [addQuotaOpen, setAddQuotaOpen] = useState(false);
  const [supplierList, setSupplierList] = useState<Array<Supplier>>([]);
  const [quotaGroupInput, setQuotaGroupInput] = useState<{ projectId?: string, quotaGroup?: CreateProjectQuotaGroupInput }>({});
  const [projectQuotaGroupList, setProjectQuotaGroupList] = useState<Maybe<Array<Maybe<QuotaGroup>>>>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<string>("");

  useFetchAllSuppliersQuery({
    ...(GRAPHQL_QUERY_POLICY) as any,
    variables: { suppliersInput: { paginationOptions: { page: 1, limit: 100 } }, },
    onCompleted(data) {
      if (data?.fetchAllSuppliers && Array.isArray(data?.fetchAllSuppliers?.suppliers))
        setSupplierList(data?.fetchAllSuppliers?.suppliers as Supplier[]);
    }
  });

  const [removeQuotaGroup, { loading: removequotaGroupLoading }] = useRemoveQuotaGroupMutation({
    ...(GRAPHQL_QUERY_POLICY as any),
    onCompleted(data) {
      const { removeQuotaGroup: { response } } = data;
      if (response?.status === 200)
        enqueueSnackbar(response?.message);
    }
  });

  useEffect(() => {
    if (project?.quotaGroup) {
      setProjectQuotaGroupList(project?.quotaGroup);
    }
  }, [project]);

  const onCreateQuotaGroup = () => {
    setAddQuotaOpen(true);
    setQuotaGroupInput({ projectId, quotaGroup: { name: "", quotaIds: [], suppliers: [] } });
  };

  const handleDeleteQuotaGroup = async () => {
    await removeQuotaGroup({ variables: { "removeQuotaGroupInput": { "id": openDeleteModal } } });
    await refreshList();
    setOpenDeleteModal("");
  };

  return (
    <>
      {projectQuotaGroupList?.map((quotaGroup: Maybe<QuotaGroup>) =>
        <Box key={quotaGroup?.id}>
          <QuotaGroupComponent
            onDelete={setOpenDeleteModal}
            quotaGroup={quotaGroup}
            supplierList={supplierList}
            refreshList={refreshList}
            project={project}
          />
        </Box>
      )}
      <Button variant='contained' color="primary" onClick={() => onCreateQuotaGroup()}>Create Quota Group</Button>
      <AddQuotaGroup
        addQuotaOpen={addQuotaOpen}
        setAddQuotaOpen={setAddQuotaOpen}
        supplierList={supplierList}
        quotaGroupInput={quotaGroupInput}
        setQuotaGroupInput={setQuotaGroupInput}
        refreshList={refreshList}
      />
      <ConfirmationModal
        title="Remove Quota Group?"
        isOpen={!!openDeleteModal}
        isLoading={removequotaGroupLoading}
        description={`Are you sure you want to remove this Quota Group ?`}
        handleDelete={handleDeleteQuotaGroup}
        setOpen={setOpenDeleteModal}
        actionText="Remove"
      />
    </>
  )
}

export default QuotaPage