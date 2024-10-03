// packages block
import { ChangeEvent, FC, useState, useEffect, FormEvent, } from 'react';
import { Save } from '@mui/icons-material';
import { Box, Collapse, Grid, IconButton, Switch, Typography } from '@mui/material';
//components block
import { Alert } from '../common/Alert';
import ActionLayout from '../common/ActionLayout';
// utils, constants, schema and graphql block
import { UserRoleComponentProps } from '../../interfaceTypes';
import { UserStatus, useActivateUserMutation, useDeactivateUserMutation } from '../../generated';
import { StatusBox } from '../../theme/styleComponents';
import { toTitleCase } from '../../utils';
import palette from '../../theme/palette';
import { USER_STATUS_PLACEHOLDER } from '../../constants';

const UserStatusComponent: FC<UserRoleComponentProps> = ({ setEdit, setUser, user, edit }): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(false);

  const { id, status: selectedUserStatus } = user || {};
  const { primary: { main }, warning: { main: warningMain } } = palette;

  const statusBorderColor = (selectedUserStatus === UserStatus.Active) ? main : warningMain;
  const userSelectionStatusBorderColor = checked ? main : warningMain;


  const [deactivateUser] = useDeactivateUserMutation({
    variables: {
      userInput: {
        userId: id || ''
      }
    },

    onError() { },

    onCompleted(data) {
      if (data) {
        const { deactivateUser: { response } } = data;

        if (response && user) {
          const { status, message } = response;

          if (status && status === 200 && message) {
            Alert.success(message);
            setUser({ ...user, status: UserStatus.Deactivated });
          } else {
            message && Alert.error(message);
          }
          setEdit(false);
        }
      }
    }
  });

  const [activateUser] = useActivateUserMutation({
    variables: {
      userInput: {
        userId: id || ''
      }
    },

    onError() { },

    onCompleted(data) {
      if (data) {
        const { activateUser: { response } } = data;

        if (response && user) {
          const { status, message } = response;

          if (status && status === 200 && message) {
            Alert.success(message);
            setUser({ ...user, status: UserStatus.Active });
          } else {
            message && Alert.error(message);
          }
          setEdit(false);
        }
      }
    }
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setChecked(selectedUserStatus === UserStatus.Active);
  }, [id, selectedUserStatus, edit]);



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (selectedUserStatus === UserStatus.Deactivated) {
      return await activateUser();
    }

    if (selectedUserStatus === UserStatus.Active) {
      return await deactivateUser();
    }
  };


  return (
    <ActionLayout hasBorder>
      <form onSubmit={handleSubmit}>
        <Collapse in={edit} mountOnEnter unmountOnExit>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Typography variant="body1">{USER_STATUS_PLACEHOLDER}</Typography>
              <Switch
                checked={checked}
                onChange={handleChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Box>

            <Box mr={-1.5}>
              <IconButton type="submit" color="primary" aria-label="settings">
                <Save />
              </IconButton>
            </Box>
          </Box>

          <StatusBox variant='body1' borderColor={userSelectionStatusBorderColor}>
            {!checked ?
              toTitleCase(UserStatus.Deactivated.toLowerCase() || '')
              :
              toTitleCase(UserStatus.Active.toLowerCase() || '')
            }
          </StatusBox>
        </Collapse>

        <Collapse in={!edit} mountOnEnter unmountOnExit>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <Typography variant="body2">Status</Typography>
              <Box mt={1}>
                <StatusBox variant='body1' borderColor={statusBorderColor}>{toTitleCase(selectedUserStatus?.toLowerCase() || '')}</StatusBox>
              </Box>
            </Grid>
          </Grid>
        </Collapse>
      </form>
    </ActionLayout>
  )
}

export default UserStatusComponent;
