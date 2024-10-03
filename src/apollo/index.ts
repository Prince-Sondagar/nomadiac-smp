// packages block
import { onError } from "@apollo/client/link/error";
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, from, Operation, NextLink } from "@apollo/client";
// components block
import { Alert } from "../components/common/Alert";
// utils and constants block
import {
  INVALID_OR_EXPIRED_TOKEN_MESSAGE, NOT_FOUND_EXCEPTION, PRECONDITION_FAILED_EXCEPTION, REQUEST_NOT_FOUND, TOKEN_INVALID, TOKEN_NOT_FOUND,
  UNAUTHORIZED
} from "../constants";
import { ErrorException } from "../interfaceTypes";
import { getToken, handleLogout } from "../utils";

const authMiddleware = new ApolloLink((operation: Operation, forward: NextLink) => {

  operation.setContext({
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_BASE_URL}/graphql` || 'http://localhost:3001/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(
      ({ extensions }) => {
        if (extensions) {
          const { exception } = extensions;

          if (exception) {
            const { response } = exception as ErrorException

            if (response) {
              const { error, response: errorResponse } = response

              if (error && error !== REQUEST_NOT_FOUND && error !== NOT_FOUND_EXCEPTION) {
                if (error === TOKEN_NOT_FOUND) {
                  Alert.error(INVALID_OR_EXPIRED_TOKEN_MESSAGE);
                } else
                  Alert.error(error)
              }

              if (errorResponse) {
                const { error: responseError, message } = errorResponse;

                if (message && message !== REQUEST_NOT_FOUND && message !== NOT_FOUND_EXCEPTION) {
                  Alert.error(message)
                } else if (responseError && responseError !== REQUEST_NOT_FOUND && responseError !== NOT_FOUND_EXCEPTION && responseError === PRECONDITION_FAILED_EXCEPTION) {
                  Alert.error(responseError)
                }
              }
            }
          }
        }

        return null
      }
    );
    const [{ message }] = graphQLErrors;
    if (message === UNAUTHORIZED || message === TOKEN_INVALID) handleLogout();
  }

  if (networkError) Alert.error(networkError.message);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: from([authMiddleware, errorLink, httpLink]),
});

export default client;
