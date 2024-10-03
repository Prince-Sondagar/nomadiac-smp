// packages block
import { createContext, FC, useEffect, useState } from "react";
//others block
import { GRAPHQL_QUERY_POLICY } from "../constants";
import { Maybe, useLoggedInUserLazyQuery, User } from "../generated";
import { AuthContextProps, ChildrenType } from "../interfaceTypes";
import { getToken } from "../utils";
import Loading from "../components/common/Loading";

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  isLoggedIn: !!getToken(),
  isLoading: false,
  setIsLoggedIn: () => { },
  setCurrentUser: () => { }
});

export const AuthContextProvider: FC<ChildrenType> = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<Maybe<User>>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getToken());

  const [fetchUser, { loading }] = useLoggedInUserLazyQuery({
    ...GRAPHQL_QUERY_POLICY,
    variables: undefined,
    onError() {
      setCurrentUser(null);
    },
    onCompleted(data) {
      const { me: { user } } = data;
      if (user)
        setCurrentUser(user as User);
      setIsLoggedIn(true);
    }
  });

  const hasToken = getToken();

  useEffect(() => {
    hasToken && setIsLoggedIn(true);
    isLoggedIn && hasToken && fetchUser();
  }, [isLoggedIn, hasToken, fetchUser]);

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, isLoading: loading, setCurrentUser, setIsLoggedIn }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
