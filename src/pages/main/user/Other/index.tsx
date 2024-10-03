//packages block
import { Dispatch, SetStateAction, useEffect } from 'react';
import { RotateLeft, Search } from '@mui/icons-material';
import { Box, Button, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from '@mui/material';

//components block
import AddUserDialog from '../../../../components/user/AddUsersDrawer';
import UserTable from '../../../../components/user/UserTable';

//others block
import { NONE, RESET_FILTERS, USER_ROLE_OPTION, USER_ROLE_PLACEHOLDER, USER_STATUS_PLACEHOLDER } from '../../../../constants';
import { PaginationInput, PaginationPayload, User, UserStatus } from '../../../../generated';
import { capitalizeFirstLetter } from '../../../../utils';
import Pagination from '../../../../components/pagination/Pagination';


type IUserContainer = {
  users: Array<User>;
  refetch: Function;
  isLoading: boolean;
  handleUserSearch: () => void;
  handleReset: () => void;
  handleSelectorChange: (event: SelectChangeEvent<string>) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  role: string;
  status: string;
  pagination: PaginationPayload;
  paginationState: PaginationInput;
  setPaginationState: Dispatch<SetStateAction<PaginationInput>>;
}


const UserContainer = ({ users, refetch, isLoading, handleUserSearch, handleReset, handleSelectorChange, open, setOpen, searchQuery, setSearchQuery, role, status, pagination, paginationState, setPaginationState }: IUserContainer) => {

  const handleAddUserModalOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!searchQuery) {
      refetch();
    }
  }, [refetch, searchQuery]);

  return (
    <>
      <Box pt={1}>
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end" pb={2}>
          <Button variant='contained' color="primary" onClick={() => handleAddUserModalOpen()}>
            Add User
          </Button>
        </Box>

        <Box display='flex' flexWrap={"wrap"} justifyContent='space-between' alignItems='center' marginBottom='15px' gap={2}>
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

          <Box display='flex' flexWrap={"wrap"} gap={2}>
            <Box display='flex' alignItems='center' gap='16px'>
              <InputLabel id="demo-simple-select-label">{USER_STATUS_PLACEHOLDER}:</InputLabel>
              <Select
                labelId="User Status-select-outlined-label"
                id="User Status-select-outlined"
                onChange={handleSelectorChange}
                placeholder={USER_STATUS_PLACEHOLDER}
                name="status"
                value={status}
                displayEmpty={true}
                disabled={isLoading}
              >
                <MenuItem value=""> <em>{NONE}</em></MenuItem>
                <MenuItem key={UserStatus.Active} value={UserStatus.Active}>{capitalizeFirstLetter(UserStatus.Active)}</MenuItem>
                <MenuItem key={UserStatus.Deactivated} value={UserStatus.Deactivated}>{capitalizeFirstLetter(UserStatus.Deactivated)}</MenuItem>
              </Select>
            </Box>

            <Box display='flex' alignItems='center' gap='16px'>
              <InputLabel id="demo-simple-select-label">{USER_ROLE_PLACEHOLDER}:</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleSelectorChange}
                placeholder={USER_ROLE_PLACEHOLDER}
                name="role"
                value={role}
                displayEmpty={true}
                disabled={isLoading}
              >
                <MenuItem value=""> <em>{NONE}</em></MenuItem>
                {USER_ROLE_OPTION.map(({ label, value }) => {
                  return (
                    <MenuItem key={`status-${label}`} value={value}>{label}</MenuItem>
                  )
                })}
              </Select>
            </Box>

            <IconButton color="secondary" onClick={handleReset}>
              <Tooltip title={RESET_FILTERS} placement="left">
                <RotateLeft color="primary" />
              </Tooltip>
            </IconButton>
          </Box>
        </Box>
      </Box>

      <UserTable isLoading={isLoading} users={users} refreshTable={refetch} />

      {users?.length && (
        <Pagination pagination={pagination} paginationState={paginationState} setPaginationState={setPaginationState} />
      )}

      <AddUserDialog
        open={open}
        setOpen={setOpen}
        refreshList={refetch}
        name={"others"}
      />
    </>
  )
}

export default UserContainer;