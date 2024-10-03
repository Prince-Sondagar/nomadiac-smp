//packages block
import { FC, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//components block
import { Alert } from '../common/Alert';
import Selector from '../common/CommonSelect';
import CommonController from '../common/CommonController';
//others block
import { registerUserValidationSchema } from '../../validationSchema';
import { RegisterUserInput, UserRole, useRegisterUserMutation } from '../../generated';
import { USER_ROLE_OPTION } from '../../constants';
import { UserFormPropsType } from '../../interfaceTypes';

const UserForm: FC<UserFormPropsType> = ({ open, setOpen, refreshList, name }): JSX.Element => {

  const methods = useForm<RegisterUserInput>({
    mode: 'all',
    resolver: yupResolver(registerUserValidationSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      roleType: UserRole.Manager
    }
  });

  const { handleSubmit, reset } = methods;

  const [registerUser, { loading }] = useRegisterUserMutation({
    onError() {
      return null;
    },

    onCompleted(data) {
      const { registerUser: { response } } = data;

      if (response) {
        const { status, message } = response;

        if (status && status === 200 && message) {
          Alert.success(message);
          reset();
          setOpen(false);
        }
      }
    }
  });

  const onSubmit: SubmitHandler<RegisterUserInput> = async (data) => {
    await registerUser({ variables: { user: data } });
    await refreshList();
  };

  useEffect(() => {
    if (!open)
      reset();

  }, [open, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <CommonController
              fieldType="text"
              controllerName="firstName"
              controllerLabel='First Name'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <CommonController
              fieldType="text"
              controllerName="lastName"
              controllerLabel='Last Name'
            />
          </Grid>

          <Grid item xs={12}>
            <CommonController
              fieldType="email"
              controllerName="email"
              controllerLabel='Email'
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography variant="h5">
              User Role
            </Typography>

            <Box mt='-8px'>
              <Selector
                controllerName="roleType"
                controllerLabel=''
                optionsArray={USER_ROLE_OPTION}
              />
            </Box>
          </Grid>
        </Grid>

        <Box display='flex' alignItems='center' gap='16px' justifyContent='flex-end'>
          <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            Create
            {loading && <CircularProgress size={20} color="inherit" />}
          </Button>
        </Box>
      </form>
    </FormProvider>
  )
}

export default UserForm;

