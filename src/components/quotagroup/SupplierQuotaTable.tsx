import React, { FC } from 'react';
import { CopyAll, Edit } from '@mui/icons-material';
import { Button, FormControl, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ProjectTableStyle } from '../../theme/styleComponents'
import DeleteIcon from '@mui/icons-material/Delete';
import { Maybe, Project, QuotaGroup, Supplier, SupplierQuotaGroup } from '../../generated';
import { CreateEditSupplierType } from '../../pages/main/projects/ProjectTable/QuotaGroup';
import { Alert } from '../common/Alert';
import { DEFENDER_REVIEW_ROUTE } from '../../constants';

type Props = {
  SupplierQuotaGroup: Maybe<SupplierQuotaGroup[]>;
  editHandler: (supplierId: string, quotagroup: Maybe<QuotaGroup>) => void;
  quotaGroup: Maybe<QuotaGroup>;
  filterdSupplierList: Supplier[];
  createEditSupplier: CreateEditSupplierType;
  addSupplierHandle: (item: Maybe<QuotaGroup>) => void;
  onChangeHandler: (panelUser: string) => void;
  deleteHandler: (id: string) => void;
  project: Project
}

const SupplierQuotaTable: FC<Props> = ({ SupplierQuotaGroup, filterdSupplierList, createEditSupplier, deleteHandler, quotaGroup, editHandler, onChangeHandler, addSupplierHandle, project }) => {
  const { dataQuality } = project || {};

  const onCopyRedirectURL = (user: SupplierQuotaGroup) => {
    if (dataQuality) {
      navigator.clipboard.writeText(`${window.location.origin}${DEFENDER_REVIEW_ROUTE}?projectId=${quotaGroup?.projectId}&supplierQuotaGroupId=${user.id}&panelistId=[ID]`);
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/survey/verify?projectId=${quotaGroup?.projectId}&supplierQuotaGroupId=${user.id}&panelistId=[ID]`);
    }
    Alert.toast("URL copied in clipboard!");
  };

  const shortUrl = (url: string) => {
    return url.substring(0, 35) + "...";
  };

  return (
    <ProjectTableStyle>
      <Grid display={"flex"}>
        {filterdSupplierList.length ? <>
          <Grid item xs={12} sm={10}>
            <FormControl fullWidth>
              <Select name="panelist" value={createEditSupplier.selectedUser || ""} onChange={({ target }) => onChangeHandler(target.value)}>
                {filterdSupplierList?.map((supplier: Supplier) => <MenuItem key={supplier.id} value={supplier.id}>{supplier.companyName}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} textAlign={{ sm: "right" }} mt={{ xs: 2, sm: 0 }}>
            <Button fullWidth variant="contained" disabled={!createEditSupplier.selectedUser} onClick={() => addSupplierHandle(quotaGroup)} style={{ width: "max-content" }}>
              Add Supplier
            </Button>
          </Grid>
        </> : ""}
      </Grid>
      {SupplierQuotaGroup?.length ? <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className='tableCollapse'>
          <TableHead sx={{ backgroundColor: "#edced0" }}>
            <TableRow>
              <TableCell>Sr.No.</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Redirect URL</TableCell>
              <TableCell>Redirect Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SupplierQuotaGroup?.map((user, index: number) => {
              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell>{user.supplier?.companyName}</TableCell>
                  <TableCell>{shortUrl(`${window.location.origin}/survey/verify?projectId=${quotaGroup?.projectId}&supplierQuotaGroupId=${user.id}&panelistId=[ID]`)}</TableCell>
                  <TableCell>
                    <Button fullWidth variant="contained" style={{ width: "max-content" }} onClick={() => onCopyRedirectURL(user)}>
                      <CopyAll />
                    </Button>
                    <Button fullWidth variant="contained" style={{ width: "max-content", margin: "0 5px 0 5px" }} onClick={() => editHandler(user?.supplierId, quotaGroup)} >
                      <Edit />
                    </Button>
                    <Button fullWidth variant="contained" style={{ width: "max-content" }}
                      onClick={() => user && deleteHandler(user?.id)} >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer> : ""}
    </ProjectTableStyle>
  )
}

export default SupplierQuotaTable;