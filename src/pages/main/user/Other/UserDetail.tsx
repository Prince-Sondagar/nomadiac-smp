//packages block
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
//components block
import UpdateUser from '../../../../components/user/UpdateUser';
import CardComponent from '../../../../components/common/CardComponent';
import UserStatusComponent from '../../../../components/user/UserStatusComponent';
import UserRoleComponent from '../../../../components/user/UserRoleComponent';
import UserVerificationComponent from '../../../../components/user/UserVerificationComponent';
import NoDataFoundComponent from '../../../../components/common/NoDataFoundComponent';
import ViewDataLoader from '../../../../components/common/ViewDataLoader';

//others block
import { User,useGetUserLazyQuery } from '../../../../generated';
import { GRAPHQL_QUERY_POLICY } from '../../../../constants';
import { ParamsType } from '../../../../interfaceTypes';

const UserDetail: FC = (): JSX.Element => {
  const { id } = useParams<ParamsType>();
  const [user, setUser] = useState<User | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const [getUser, { loading }] = useGetUserLazyQuery({
    ...GRAPHQL_QUERY_POLICY,
    variables: undefined,

    onError() { },
    onCompleted(data) {
      const { getUser } = data;
      const { user } = getUser || {};
      user && setUser(user as User);
    },
  });

  useEffect(() => {
    if (id) {
      getUser({
        variables: {
          getUser: {
            id
          }
        }
      })
    };
  }, [getUser, id]);

  const handleActionEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      {loading != null && user && (
        <Grid container spacing={2}>
          <Grid item sm={12} md={9} xs={12}>
            <UpdateUser
              edit={edit}
              setEdit={setEdit}
              setUser={setUser}
              user={user}
              key='UpdateUser'
            />
          </Grid>

          <Grid item sm={12} md={3} xs={12}>
            <CardComponent
              hideSaveIcon
              cardTitle="Actions"
              hasEdit isEdit={edit}
              disableEditIcon={loading}
              onEditClick={handleActionEdit}
            >

              <UserVerificationComponent
                edit={edit}
                setEdit={setEdit}
                setUser={setUser}
                user={user}
                key='UserVerificationComponent'
              />

              <UserRoleComponent
                edit={edit}
                setEdit={setEdit}
                setUser={setUser}
                user={user}
                key='UserRoleComponent'
              />

              <UserStatusComponent
                edit={edit}
                setEdit={setEdit}
                setUser={setUser}
                user={user}
                key='UserStatusComponent'
              />
            </CardComponent>
          </Grid>
        </Grid>
      )};

      {id && !loading && !user &&
        <NoDataFoundComponent />
      }

      {loading && (
        <ViewDataLoader rows={2} columns={4} hasMedia={false} />
      )}
    </>
  )
}

export default UserDetail;