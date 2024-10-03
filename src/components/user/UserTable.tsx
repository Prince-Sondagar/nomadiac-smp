//packages block
import { FC, useContext, useState } from 'react';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, colors, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Visibility } from '@mui/icons-material';
//components block
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import ConfirmationModal from '../common/ConfirmationDelete';
import { Alert } from '../common/Alert';
import TableLoader from '../common/TableLoader';
import { AuthContext } from '../../context';
//other block
import { CANT_DELETE_USER, USER_ROUTE } from '../../constants';
import { Maybe, User, UserRole, UserStatus, useRemoveUserMutation, useActivateUserMutation, useDeactivateUserMutation, useUpdateUserMutation } from '../../generated';
import { mapEnums, renderUserRoleColor, toTitleCase } from '../../utils';
import palette from '../../theme/palette';
import { PendingIcon, ProjectTableStyle, StatusBox, VerifiedIcon } from '../../theme/styleComponents';
import { UserTableProps } from '../../interfaceTypes';


const UserTable: FC<UserTableProps> = ({ users, isLoading, refreshTable }): JSX.Element => {
  const { currentUser } = useContext(AuthContext);
  const [userId, setUserId] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userChecked] = useState<{ emailVerified: boolean, statusVerified: boolean }>({ emailVerified: false, statusVerified: false });

  const [removeUser, { loading: deleteUserLoading }] = useRemoveUserMutation({
    onError() {
      Alert.error(CANT_DELETE_USER);
      setOpenDeleteModal(false);
    },

    onCompleted(data) {
      if (data) {
        const { removeUser: { response } } = data;

        if (response) {
          const { message } = response;
          message && Alert.success(message);
          const usersState = [];
          for (let user of users) {
            const { id } = user || {};
            if (id !== userId) {
              usersState.push(user);
            }
          }
          setOpenDeleteModal(false);
        }
      }
    }
  });

  const onDeleteClick = (id: string) => {
    setUserId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (userId) {
      await removeUser({
        variables: {
          userInput: {
            userId
          }
        }
      })
    }
  };

  const [activateUser] = useActivateUserMutation();


  const [deactivateUser] = useDeactivateUserMutation();


  const handleStatusChange = async ({ id, status }: { id: string | undefined, status: string | undefined }) => {

    if (id && status === "ACTIVE") {
      await deactivateUser({
        variables: {
          userInput: {
            userId: id
          }
        }
      })
    }
    else {
      await activateUser({
        variables: {
          userInput: {
            userId: id as string
          }
        }
      })
    }
    await refreshTable()
  };

  const [updateUser] = useUpdateUserMutation({
    onError() { },

    onCompleted(data) {
      if (data) {
        const { updateUser: { response } } = data;

        if (response) {
          const { message } = response;
          message && Alert.success(message);
        }
      }
    }
  });

  const handleVerificationChange = async ({ id, emailVerified }: { id: string | undefined, emailVerified: boolean | undefined }) => {
    if (id && !emailVerified) {
      await updateUser({
        variables: {
          userInput: { id: id, emailVerified: true },
        },
      });
    }
    else {
      await updateUser({
        variables: {
          userInput: { id: id as string, emailVerified: false },
        },
      });
    }
    await refreshTable();
  };

  return (
    <Box className="table-overflow" pt={4}>
      <ProjectTableStyle>
        <TableContainer component={Paper}>
          <Box>
            <Table sx={{ minWidth: 1300 }} aria-label="customized table">
              <TableHead sx={{ backgroundColor: "#edced0" }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Email Verification</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>User Staus Activation</TableCell>
                  <TableCell>Email Verify</TableCell>
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
                ) : (
                  users?.map((user: Maybe<User>) => {
                    const { id, firstName, lastName, email, roles, status, emailVerified } = user || {};
                    const isSuperAdmin = roles?.some((role => role?.role === UserRole.SuperAdmin))
                    const isMe = currentUser?.id === id
                    const disableDelete = isMe || isSuperAdmin;
                    const { primary: { main }, warning: { main: warningMain }, common: { black } } = palette
                    const statusBorderColor = (status === UserStatus.Active) ? main : warningMain

                    return (
                      <TableRow key={id}>
                        <TableCell>
                          <Box display="flex" alignItems="center" color={black}>
                            <Link to={`${USER_ROUTE}/${id}`} state={USER_ROUTE}>
                              <Typography variant='body2'>
                                {toTitleCase(`${firstName} ${lastName}`)}
                              </Typography>
                            </Link>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Box mr={1} fontSize={16} display="flex" alignItems="center" color={colors.green[700]}>

                            <StatusBox variant='body1' borderColor={statusBorderColor}>{toTitleCase(status?.toLowerCase() || '')}</StatusBox>
                          </Box>
                        </TableCell>
                        <TableCell>{email}</TableCell>

                        <TableCell>
                          <Box maxWidth="500px" display='flex' alignItems='center'>
                            <Box display='flex' gap='10px' alignItems='center'>
                              {emailVerified ? <VerifiedIcon /> : <PendingIcon />}
                              <Typography variant='body2'>{emailVerified ? 'Verified' : 'Pending'}</Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        <TableCell>
                          {roles?.map((systemRole) => {
                            const { role } = systemRole || {}
                            return (
                              <Box key={`user-${id}`} component="span" fontSize={14} borderRadius={50} mx={1} p="5px 20px" maxWidth={160} justifyContent="center" display="flex" bgcolor={`${renderUserRoleColor(role)}`} color={palette.common.white}>
                                {mapEnums(role)}
                              </Box>
                            )
                          })}
                        </TableCell>

                        <TableCell>
                          <Switch
                            checked={status === "ACTIVE" && !userChecked.statusVerified}
                            onChange={() => handleStatusChange({ id, status })}
                            color="primary"
                            name="statusVerified"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </TableCell>

                        <TableCell>
                          <Switch
                            checked={emailVerified && !userChecked.emailVerified}
                            onChange={() => handleVerificationChange({ id, emailVerified })}
                            color="primary"
                            name="emailVerified"
                            inputProps={{ 'aria-label': 'primary checkbox' }}

                          />
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <Link to={`${USER_ROUTE}/${id}`} state={USER_ROUTE}>
                              <IconButton size="small">
                                <Visibility color="primary" />
                              </IconButton>
                            </Link>

                            <IconButton
                              aria-label="delete"
                              color="secondary"
                              size="small"
                              disabled={disableDelete}
                              onClick={() => onDeleteClick(id || '')}
                            >
                              <Delete fontSize="small" color={disableDelete ? 'inherit' : "error"} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </ProjectTableStyle>
      {(!isLoading && !users?.length) && (
        <Box display="flex" justifyContent="center" pb={12} pt={5}>
          <NoDataFoundComponent />
        </Box>
      )}

      <ConfirmationModal
        title="Delete User?"
        isOpen={openDeleteModal}
        isLoading={deleteUserLoading}
        description="Are you sure you want to delete this user?"
        handleDelete={handleDeleteUser}
        setOpen={setOpenDeleteModal}
      />
    </Box>
  )
}

export default UserTable;