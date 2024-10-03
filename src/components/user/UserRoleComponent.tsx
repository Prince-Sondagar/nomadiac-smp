// packages block
import { FC, useEffect } from 'react';
import { Save } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
//components block
import ActionLayout from '../common/ActionLayout';
import Selector from '../common/CommonSelect';
import { Alert } from '../common/Alert';
// utils, constants, schema and graphql block
import { updateUserRoleSchema } from '../../validationSchema';
import { Role, UserRole, useUpdateRoleMutation } from '../../generated';
import { UserStatus } from '../../generated';
import { USER_ROLE_OPTION } from '../../constants';
import { mapEnums } from '../../utils';
import { UpdateRoleInputInterface, UserRoleComponentProps } from '../../interfaceTypes';

const UserRoleComponent: FC<UserRoleComponentProps> = ({ user, setUser, edit, setEdit }): JSX.Element => {
  const { id, status, roles } = user || {};
  const { role } = (roles || [{}])[0] || {};

  const methods = useForm<UpdateRoleInputInterface>({
    resolver: yupResolver(updateUserRoleSchema),
    defaultValues: {
      id: "",
      role: ""
    }
  });

  const { handleSubmit, setValue, reset } = methods;

  const [updateRole] = useUpdateRoleMutation({
    onError() { },

    onCompleted(data) {
      if (data) {
        const { updateRole: { response, user } } = data
        if (response) {
          const { status, message } = response

          if (status && status === 200 && user) {
            message && Alert.success(message)
          } else {
            message && Alert.error(message)
          }

          setEdit(false);
        }
      }
    }
  })

  useEffect(() => {
    id && setValue("id", id);
    role && setValue("role", role);
  }, [id, setValue, role, edit]);

  useEffect(() => {
    if (!edit) {
      reset();
    }
  }, [edit, reset]);

  const onSubmit = async ({ id, role: updatedRole }: UpdateRoleInputInterface) => {
    if (id && user && roles && roles[0]) {
      setUser({ ...(user || {}), roles: [{ ...(roles[0] as Role || {}) as Role, role: updatedRole as UserRole }] })

      await updateRole({
        variables: {
          userInput: {
            id,
            roles: [updatedRole as UserRole]
          }
        }
      })
    }
  };

  const isSaveDisabled = status === UserStatus.Deactivated;

  return (
    <ActionLayout hasBorder>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Collapse in={edit} mountOnEnter unmountOnExit>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">Role</Typography>

              <Box mr={-1.5}>
                <IconButton disabled={isSaveDisabled} type="submit" color="primary" aria-label="settings">
                  <Save />
                </IconButton>
              </Box>
            </Box>

            <Selector
              controllerName="role"
              controllerLabel=''
              optionsArray={USER_ROLE_OPTION}
            />
          </Collapse>

          <Collapse in={!edit} mountOnEnter unmountOnExit>
            <Typography variant="body2">Roles</Typography>
            <Typography key={role} component="span" variant="h5" className="capitalize-text">
              {mapEnums(role as UserRole)}
            </Typography>
          </Collapse>
        </form>
      </FormProvider>
    </ActionLayout>
  )
}

export default UserRoleComponent;
