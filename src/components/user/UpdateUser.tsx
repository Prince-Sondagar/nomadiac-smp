//packages block
import { FC, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Collapse, Grid, Link, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//components block
import { Alert } from '../common/Alert';
import CommonController from '../common/CommonController';
import CardComponent from '../common/CardComponent';
//others block
import { updateUserSchema } from '../../validationSchema';
import { UpdateUserInput, useUpdateUserMutation } from '../../generated';
import { UserRoleComponentProps } from '../../interfaceTypes';
import { renderItem, toTitleCase } from '../../utils';

const UpdateUser: FC<UserRoleComponentProps> = ({ setUser, user }): JSX.Element => {
  const [edit, setEdit] = useState<boolean>(false);

  const { firstName, lastName, email, id } = user || {};

  const methods = useForm<UpdateUserInput>({
    mode: 'all',
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
    }
  });

  const { handleSubmit, reset, formState: { isDirty }, setValue } = methods;

  const [updateUser] = useUpdateUserMutation({
    onError() {
      return null;
    },

    onCompleted(data) {
      const { updateUser: { response } } = data;

      if (response) {
        const { status, message } = response

        if (status && status === 200 && message) {
          Alert.success(message);
          reset();
          setEdit(false)
        }
      }
    }
  });

  const onSubmit: SubmitHandler<UpdateUserInput> = async (data) => {
    if (user && isDirty) {
      const { firstName, lastName, email, id } = data;
      setUser({ ...user, firstName, lastName, email: email || "" })

      await updateUser({
        variables: {
          userInput: {
            id,
            firstName,
            lastName,
            email: email || ""
          }
        },
      });
    }
  };

  useEffect(() => {
    if (!edit) {
      reset();
    }
  }, [edit, reset]);

  useEffect(() => {
    setValue("email", email || "");
    setValue("firstName", firstName || "");
    setValue("lastName", lastName || "")
    setValue("id", id || "")
  }, [firstName, lastName, email, edit, setValue, id]);

  const handleActionEdit = () => {
    setEdit(!edit);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardComponent
          cardTitle="User information"
          isEdit={edit}
          onEditClick={handleActionEdit}
          hasEdit
        >
          <Collapse in={edit} mountOnEnter unmountOnExit>
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

              <Grid item xs={12} md={6}>
                <CommonController
                  fieldType="email"
                  controllerName="email"
                  controllerLabel='Email'
                />
              </Grid>
            </Grid>
          </Collapse>

          <Collapse in={!edit} mountOnEnter unmountOnExit>
            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                {renderItem("First Name", `${toTitleCase(firstName || "") || ''}`)}
              </Grid>

              <Grid item md={6} sm={12}>
                {renderItem("Last Name", `${toTitleCase(lastName || "") || ''}`)}
              </Grid>

              <Grid item md={6} sm={12}>
                <Typography variant="body2">Email</Typography>

                <Link href={email ? `mailto: ${email}` : ""}>
                  <Typography component="h5" variant="h5" color="primary" noWrap>
                    {email || "N/A"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Collapse>
        </CardComponent>
      </form>
    </FormProvider>
  )
}

export default UpdateUser;

