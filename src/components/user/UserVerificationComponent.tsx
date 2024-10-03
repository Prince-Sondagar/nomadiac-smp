// packages block
import { useState, useEffect, ChangeEvent, FC, FormEvent } from "react";
import { Save } from '@mui/icons-material';
import { Box, Collapse, Grid, IconButton, Switch, Typography } from "@mui/material";
import { UserRoleComponentProps } from "../../interfaceTypes";
// components block
import { Alert } from "../common/Alert";
import ActionLayout from "../common/ActionLayout";
// utils, interfaces and graphql block
import { UserStatus, useUpdateUserMutation } from "../../generated";
import { PendingIcon, VerifiedIcon } from "../../theme/styleComponents";


const UserVerificationComponent: FC<UserRoleComponentProps> = ({ user, setUser, setEdit, edit }): JSX.Element => {
  const [verified, setVerified] = useState(false);
  const { id, status, emailVerified } = user || {};

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (verified !== emailVerified && user) {
      setUser({ ...(user || {}), emailVerified: verified || false });
      await updateUser({
        variables: {
          userInput: { id: id || "", emailVerified: verified },
        },
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVerified(event.target.checked);
  };

  const isSaveDisabled = status === UserStatus.Deactivated;

  useEffect(() => {
    if (emailVerified != null) {
      setVerified(emailVerified);
    }
  }, [emailVerified]);

  useEffect(() => {
    if (!edit && emailVerified != null) {
      setVerified(emailVerified);
    }
  }, [edit, emailVerified]);

  return (
    <ActionLayout hasBorder>
      <form onSubmit={handleSubmit}>
        <Collapse in={edit} mountOnEnter unmountOnExit>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Typography variant="body1">Email Verification</Typography>

              <Switch
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                checked={verified}
                disabled={isSaveDisabled}
                onChange={handleChange}
              />
            </Box>

            <Box mr={-1.5}>
              <IconButton disabled={isSaveDisabled} type="submit" color="primary" aria-label="settings">
                <Save />
              </IconButton>
            </Box>
          </Box>

          <Box display='flex' gap='10px' alignItems='center'>
            {verified ? <VerifiedIcon /> : <PendingIcon />}
            <Typography variant='body2'>{verified ? 'Verified' : 'Pending'}</Typography>
          </Box>
        </Collapse>

        <Collapse in={!edit} mountOnEnter unmountOnExit>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Typography variant="body2">Email Verification</Typography>
              <Box mt={1}>
                <Box display='flex' gap='10px' alignItems='center'>
                  {emailVerified ? <VerifiedIcon /> : <PendingIcon />}
                  <Typography variant='body2'>{emailVerified ? 'Verified' : 'Pending'}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Collapse>
      </form>
    </ActionLayout>
  );
};

export default UserVerificationComponent;
