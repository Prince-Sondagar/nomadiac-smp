// Packages block
import { FC } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
// Components block
import { Alert } from "../common/Alert";
import CommonController from "../common/CommonController";
// Others block
import { useResetPasswordMutation } from "../../generated";
import { resetPasswordValidationSchema } from "../../validationSchema"
import { ResetPasswordInput } from "../../interfaceTypes";
import {
  FOLLOW_INSTRUCTIONS, FORBIDDEN_EXCEPTION, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, USER_ROUTE,
  TOKEN_INVALID
} from "../../constants";

export const ResetPasswordForm: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const methods = useForm<ResetPasswordInput>({
    mode: "all",
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: {
      password: "",
      repeatPassword: ""
    }
  });

  const { handleSubmit, reset } = methods;

  const [resetPassword, { loading }] = useResetPasswordMutation({
    onError({ message }) {
      if (message.toLowerCase() === FORBIDDEN_EXCEPTION) {
        return Alert.error(TOKEN_INVALID);
      }
    },

    onCompleted(data) {
      if (data) {
        const { resetPassword: { response } } = data;

        if (response) {
          const { status } = response;

          if (status === 404) {
            return Alert.error(RESET_PASSWORD_FAILURE);
          }

          if (status === 200) {
            reset();
            Alert.success(RESET_PASSWORD_SUCCESS);
            navigate(USER_ROUTE);
          }
        }
      }
    }
  });

  const onSubmit: SubmitHandler<ResetPasswordInput> = async (data: ResetPasswordInput) => {
    if (token) {
      await resetPassword({
        variables: {
          resetPassword: {
            password: data.password,
            token
          }
        },
      });
    }
    else {
      Alert.error(FOLLOW_INSTRUCTIONS);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CommonController
          controllerName="password"
          controllerLabel="New password"
          fieldType="password"
        />

        <CommonController
          controllerName="repeatPassword"
          controllerLabel="Confirm password"
          fieldType="password"
        />

        <Box marginTop='20px'>
          <Button
            variant="contained" fullWidth color="primary" type="submit" disabled={loading}
            endIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            Reset password
          </Button>
        </Box>
      </form>
    </FormProvider>
  )
}
