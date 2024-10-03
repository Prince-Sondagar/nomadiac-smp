// packages block
import { useContext } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
// component block
import { Alert } from "../common/Alert";
import CommonController from "../common/CommonController";
import { AuthContext } from "../../context/AuthContext";
// others block
import { LoginUserInput, useLoginMutation } from "../../generated";
import { loginValidationSchema } from "../../validationSchema";
import { EMAIL_CHANGED_OR_NOT_VERIFIED_MESSAGE, FORBIDDEN_EXCEPTION, AUTH_TOKEN, WRONG_EMAIL_OR_PASSWORD, USER_ROUTE, FORGET_PASSWORD_ROUTE } from "../../constants";
import { setToken } from "../../utils";

export const LoginForm = (): JSX.Element => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const methods = useForm<LoginUserInput>({
    mode: "all",
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { handleSubmit } = methods;

  const [login, { loading }] = useLoginMutation({
    onError({ message }) {
      if (message.toLowerCase() === FORBIDDEN_EXCEPTION)
        return Alert.error(EMAIL_CHANGED_OR_NOT_VERIFIED_MESSAGE);
    },

    onCompleted(data) {
      if (data) {
        const { login: { response, access_token } } = data

        if (response) {
          const { status } = response;
          setIsLoggedIn(true);

          if (status === 404) {
            setIsLoggedIn(false);
            return Alert.error(WRONG_EMAIL_OR_PASSWORD);
          }

          if (status === 200 && access_token) {
            setToken(access_token);
            setIsLoggedIn(true);
            navigate(USER_ROUTE);
            localStorage.setItem(AUTH_TOKEN, access_token);
          }
        }
      }
    }
  });

  const onSubmit = async (data: LoginUserInput) => {
    await login({
      variables: {
        loginUser: data,
      },
    });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CommonController
          controllerName="email"
          controllerLabel="Email"
          fieldType="email"
        />

        <CommonController
          controllerName="password"
          controllerLabel="Password"
          fieldType="password"
        />

        <Box>
          <Button component={Link} to={FORGET_PASSWORD_ROUTE} color="primary" variant="text" sx={{ p: 0, minHeight: 0, mb: "20px" }}>
            Forgot password?
          </Button>
        </Box>

        <Button variant="contained" type="submit" fullWidth color="primary" disabled={loading} endIcon={loading && <CircularProgress size={20} color="inherit" />}>
          Login
        </Button>
      </form>
    </FormProvider>
  )
}