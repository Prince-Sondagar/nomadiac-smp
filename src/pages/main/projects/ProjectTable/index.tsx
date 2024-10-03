import React, { Dispatch, FC, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { Box, Button, Collapse, IconButton, Link, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { BorderColor, Download, Palette } from '@mui/icons-material';
import TableCollapse from './TableCollapse';
import { ProjectTableStyle } from "../../../../theme/styleComponents";
import {
  useRemoveProjectMutation,
  Project,
  // useUpdateProjectMutation, 
  ProjectLifecycle, useFetchAllSuppliersQuery,
  ProjectUser,
  PaginationInput,
  PaginationPayload
} from '../../../../generated';
import { GRAPHQL_QUERY_POLICY, PROJECT_ROUTE } from '../../../../constants';
import ConfirmationModal from '../../../../components/common/ConfirmationDelete';
import { removeProjectHandler, } from '../../../../utils/project';
import Pagination from '../../../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import TableLoader from '../../../../components/common/TableLoader';
import { exportCsv } from '../../../../utils/CsvDownload';
import NoDataFoundComponent from '../../../../components/common/NoDataFoundComponent';

type ActionMenuTypes = {
  id: string;
  icon: ReactElement;
  tooltip: string;
  onClick?: (event: any) => void | undefined;
  menu?: {
    item: string;
    href?: string;
    onClick?: (event: any) => void | undefined;
  }[];
};

const Row = (props: { row: Project, refreshTable: () => void }) => {
  const { row, refreshTable } = props;
  const navigate = useNavigate();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState('');
  const [panelist, setPanelist] = useState<any[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, project: Project | null }>({ isOpen: false, project: null });
  // const [updateProject] = useUpdateProjectMutation({ ...GRAPHQL_QUERY_POLICY } as any);
  const [removeProject, { loading: removeLoading }] = useRemoveProjectMutation({ ...GRAPHQL_QUERY_POLICY } as any);
  const headManager = (row?.projectUsers?.find((qs) => qs?.isHeadManager))?.user?.firstName;

  const { data: fetchAllSupplier, refetch: refreshPanelList } = useFetchAllSuppliersQuery({
    ...(GRAPHQL_QUERY_POLICY) as any,
    variables: {
      suppliersInput: {
        paginationOptions: {
          page: 1,
          limit: 100
        }
      },
    },
  });

  useEffect(() => {
    if (fetchAllSupplier) {
      const list = fetchAllSupplier?.fetchAllSuppliers.suppliers;
      if (list?.length) setPanelist(list);
    };
  }, [fetchAllSupplier]);


  const handleClick = (e: any, action?: ActionMenuTypes) => {
    e.stopPropagation();
    if (action) {
      const { id } = action;
      setAnchorEl(e.currentTarget);
      setCurrentIndex(id);
    };
  };

  const handleClose = (e: Event) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  // const onDeleteClick = ((project: Project) => {
  //     setDeleteModal({ isOpen: true, project });
  // });

  const handleDeleteUser = async () => {
    await removeProject({ variables: removeProjectHandler(deleteModal?.project?.id as string) });
    setDeleteModal({ isOpen: false, project: null });
    await refreshTable();
  };

  const supplierHandle = (project: Project) => {
    navigate(`${PROJECT_ROUTE}/${project.id}/supplierResult`);
  };

  const csvDownload = (e: any, action?: ActionMenuTypes) => {
    e.stopPropagation();
    if (action) {
      const { id } = action;
      setCurrentIndex(id);
    }
    setAnchorEl(e.currentTarget);
    exportCsv(row.id, "");
  };

  // const onArchieveClick = async (project: Project) => {
  //     const value = !project.archive;
  //     await updateProject({ variables: updateProjectHandler({ ...project, "archive": value }) });
  //     await refreshTable();
  // };

  const actionMenu: ActionMenuTypes[] = [
    {
      id: "editsurvey", icon: <BorderColor />, tooltip: "Edit Survey", menu: [
        { onClick: supplierHandle, item: "Suppliers" }
      ]
    },
    {
      id: "exportresults", icon: <Download />, onClick: csvDownload, tooltip: "Export Results"
    },
    // {
    //     id: "delete", icon: <Delete />, tooltip: "Archive / Delete", menu: [
    //         { onClick: onArchieveClick, item: row?.archive ? "Unarchive" : "Archive" },
    //         { onClick: onDeleteClick, item: "Delete" }
    //     ]
    // }
  ];

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpenCollapse(!openCollapse)} style={{ cursor: 'n-resize' }}>
        <TableCell>
          <IconButton onClick={(e) => e.stopPropagation()} size="small"><Palette sx={{ color: "#771117" }} /></IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant='h5'>{row?.title}</Typography>
          <Typography>{row?.code}</Typography>
        </TableCell>
        <TableCell>{row?.lifecycle === ProjectLifecycle.Closes ? "CLOSED" : row?.lifecycle}</TableCell>
        <TableCell>{headManager}</TableCell>
        <TableCell>{row?.client?.name}</TableCell>
        <TableCell>
          {actionMenu?.map((action, key) => <React.Fragment key={key}>
            <Tooltip title={action.tooltip} arrow {...typeof action.onClick === "function" ? { onClick: action.onClick } : {}}>
              {action?.id === "exportresults" ?
                <Button id={action.id} onClick={(e) => csvDownload(e, action)} className='btnAction' aria-controls={Boolean(anchorEl) ? 'simple-menu' : undefined} aria-haspopup="true" aria-expanded={Boolean(anchorEl) ? 'true' : undefined}>
                  {action.icon}
                </Button> :
                <Button id={action.id} onClick={(e) => handleClick(e, action)} className='btnAction' aria-controls={Boolean(anchorEl) ? 'simple-menu' : undefined} aria-haspopup="true" aria-expanded={Boolean(anchorEl) ? 'true' : undefined}>
                  {action.icon}
                </Button>}
            </Tooltip>
            {action?.menu && <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && currentIndex === action.id}
              onClose={handleClose}
              MenuListProps={{ 'aria-labelledby': action.id }}>
              {action?.menu?.length > 0 && action?.menu?.map((menu, key) => (
                <MenuItem key={key} onClick={() => handleClose}>
                  {menu.href ? <Link href={menu.href}>{menu.item}</Link> : <Box onClick={() => { if (typeof menu.onClick === "function") menu.onClick(row) }}>{menu.item}</Box>}
                </MenuItem>
              ))}
            </Menu>}
          </React.Fragment>)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <TableCollapse panelist={panelist} refreshPanelList={refreshPanelList} refreshList={refreshTable} projectUsers={row.projectUsers as Array<ProjectUser>} project={row} />
          </Collapse>
        </TableCell>
      </TableRow>
      <ConfirmationModal
        title="Delete Project?"
        isOpen={deleteModal.isOpen}
        description="Are you sure you want to delete this project?"
        handleDelete={handleDeleteUser}
        setOpen={setDeleteModal}
        isLoading={removeLoading}
      />
    </>
  );
}

interface IProjectTableProps {
  projectList: Project[];
  paginationState: PaginationInput;
  isLoading: boolean;
  pagination: PaginationPayload;
  setPagination: Dispatch<SetStateAction<PaginationPayload>>;
  setPaginationState: Dispatch<SetStateAction<PaginationInput>>;
  refetch: () => void;
}

const ProjectTable: FC<IProjectTableProps> = ({ projectList, paginationState, isLoading, pagination, setPagination, setPaginationState, refetch }): JSX.Element => {

  return (
    <ProjectTableStyle>
      <TableContainer component={Paper} sx={{ mt: 4, p: 3 }}>
        <Table sx={{ minWidth: "1200px" }} aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: "#edced0" }}>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isLoading ?
                <TableRow>
                  <TableCell colSpan={10}>
                    <TableLoader numberOfRows={10} numberOfColumns={1} />
                  </TableCell>
                </TableRow>
                :
                (projectList?.map((row: any, index: number) => (
                  <Row key={index} row={row} refreshTable={refetch} />
                )))
            }
          </TableBody>
        </Table>
      </TableContainer>

      {!isLoading && !projectList?.length && (
        <Box display="flex" justifyContent="center" pb={12} pt={5}>
          <NoDataFoundComponent />
        </Box>
      )}

      {projectList.length ?
        <Pagination pagination={pagination} paginationState={paginationState} setPaginationState={setPaginationState} />
        : ""}
    </ProjectTableStyle>
  )
}

export default ProjectTable;