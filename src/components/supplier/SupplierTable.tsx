import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ProjectUser, useRemoveProjectUserMutation } from '../../generated';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import { CopyAll, Edit } from '@mui/icons-material';
import ConfirmationModal from '../common/ConfirmationDelete';
import { GRAPHQL_QUERY_POLICY } from '../../constants';
import { removeProjectUserHandler } from '../../utils/project';
import { ProjectTableStyle } from '../../theme/styleComponents';

type ISupplierTable = {
  projectSuppliers: Array<ProjectUser>,
  projectId: string,
  refreshList: Function
  refreshPanelList: Function;
  setselectEditSupplier: Dispatch<SetStateAction<ProjectUser>>
  createEditSupplier: {
    selectedProjectUserId: string | null,
    selectedUser: string | null,
    isOpen: boolean,
    for: "add" | "edit"
  } | any
  setCreateEditSupplier: Dispatch<SetStateAction<ProjectUser>> | any
}

const SupplierTable = ({ projectSuppliers, projectId, refreshList, refreshPanelList, setselectEditSupplier, createEditSupplier, setCreateEditSupplier }: ISupplierTable) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [removeProjectUser, { loading: removeUserLoading }] = useRemoveProjectUserMutation({ ...GRAPHQL_QUERY_POLICY } as any);
  const [selectedSupplier, setSelectedSupplier] = useState<any>({});

  const onCopyRedirectURL = (supplier: ProjectUser) => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_API_BASE_URL}/survey/verify?projectId=${projectId}&supplierId=${supplier.userId}&panelistId=[ID]`);
    enqueueSnackbar("URL copied in clipboard!");
  };

  const removeHandler = (supplier: ProjectUser) => {
    setSelectedSupplier(supplier);
    setOpenDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (selectedSupplier) {
      await removeProjectUser({ variables: removeProjectUserHandler(selectedSupplier.id) });
      await refreshList();
      await refreshPanelList();
      setSelectedSupplier({});
      setOpenDeleteModal(false);
      enqueueSnackbar("Supplier removed successfully");
    }
  };

  const editHandler = (supplier: ProjectUser) => {
    setselectEditSupplier(supplier);
    setCreateEditSupplier({ ...createEditSupplier, selectedProjectUserId: supplier.id, selectedUser: supplier.userId, isOpen: true, for: "edit" });
  };

  const shortUrl = (url: string) => {
    return url.substring(0, 35) + "...";
  };

  if (!projectSuppliers.length)
    return <div />;

  return (
    <ProjectTableStyle>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className='tableCollapse'>
          <TableHead sx={{ backgroundColor: "#edced0" }}>
            <TableRow>
              <TableCell>Sr.No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Redirect URL</TableCell>
              <TableCell>Redirect Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectSuppliers.map((supplier: ProjectUser, index: number) => {
              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell>{supplier.user?.firstName + " " + supplier.user?.lastName}</TableCell>
                  <TableCell>{shortUrl(`${process.env.REACT_APP_API_BASE_URL}/survey/verify?projectId=${projectId}&supplierId=${supplier.userId}&panelistId=[ID]`)}</TableCell>
                  <TableCell>
                    <Button fullWidth variant="contained" style={{ width: "max-content" }} onClick={() => onCopyRedirectURL(supplier)}>
                      <CopyAll />
                    </Button>
                    <Button fullWidth variant="contained" style={{ width: "max-content", margin: "0 5px 0 5px" }} onClick={() => editHandler(supplier)} >
                      <Edit />
                    </Button>
                    <Button fullWidth variant="contained" style={{ width: "max-content" }} onClick={() => removeHandler(supplier)} >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <ConfirmationModal
          title="Remove Supplier?"
          isOpen={openDeleteModal}
          isLoading={removeUserLoading}
          description={`Are you sure you want to remove this supplier ?`}
          handleDelete={handleDeleteUser}
          setOpen={setOpenDeleteModal}
          actionText="Remove"
        />
      </TableContainer>
    </ProjectTableStyle>
  )
}

export default SupplierTable;