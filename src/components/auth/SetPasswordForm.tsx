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
import { useVerifyEmailAndSetPasswordMutation } from "../../generated";
import { resetPasswordValidationSchema } from "../../validationSchema";
import { FORBIDDEN_EXCEPTION, NOT_FOUND_EMAIL_MESSAGE, USER_ALREADY_EXIST, USER_ROUTE } from "../../constants";
import { ResetPasswordInput } from "../../interfaceTypes";

/**
 * It shows inputs for set password and verify email.
 * 
 * @returns JSX Element
 */
export const SetPasswordForm: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const methods = useForm<ResetPasswordInput>({
    mode: "all",
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    }
  });

  const { handleSubmit, reset } = methods;

  const [verifyEmailAndSetPassword, { loading }] = useVerifyEmailAndSetPasswordMutation({
    onError({ message }) {
      if (message.toLowerCase() === FORBIDDEN_EXCEPTION) return Alert.error(USER_ALREADY_EXIST)
    },

    onCompleted(data) {
      if (data) {
        const { verifyEmailAndSetPassword: { response } } = data;

        if (response) {
          const { status } = response;

          if (status === 404) {
            return Alert.error(NOT_FOUND_EMAIL_MESSAGE);
          }

          if (status === 200) {
            reset();
            navigate(USER_ROUTE);
          }
        }
      }
    }
  });

  const onSubmit: SubmitHandler<ResetPasswordInput> = async (data: ResetPasswordInput) => {
    const { password } = data

    if (token) {
      await verifyEmailAndSetPassword({
        variables: {
          verifyEmailAndSetPassword: {
            password,
            token,
          }
        },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CommonController
          controllerName="password"
          controllerLabel="Password"
          fieldType="password"
        />

        <CommonController
          controllerName="repeatPassword"
          controllerLabel="Repeat password"
          fieldType="password"
        />

        <Box pt="30px">
          <Button
            variant="contained" fullWidth color="primary" type="submit" disabled={loading}
            endIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            Complete signup
          </Button>
        </Box>
      </form>
    </FormProvider>
  )
}
