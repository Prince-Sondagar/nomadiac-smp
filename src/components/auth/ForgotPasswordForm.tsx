// Packages block
import { FC } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
// Components block
import { Alert } from "../common/Alert";
import CommonController from "../common/CommonController";
// Others block
import { ForgotPasswordInput, useForgotPasswordMutation } from "../../generated";
import { forgotPasswordValidationSchema } from "../../validationSchema";
import { FORBIDDEN_EXCEPTION, FORGET_PASSWORD_SUCCESS, NOT_FOUND_EMAIL_MESSAGE } from "../../constants";
import { ForgotPasswordFormProps } from "../../interfaceTypes";

/**
 * It shows inputs for forgot password and send email.
 * 
 * @returns JSX Element
 */
export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ emailSent, setEmailSent }): JSX.Element => {
  const methods = useForm<ForgotPasswordInput>({
    mode: "all",
    resolver: yupResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: ""
    }
  });

  const { handleSubmit, reset } = methods;

  const [forgotPassword, { loading }] = useForgotPasswordMutation({
    onError({ message }) {
      if (message.toLowerCase() === FORBIDDEN_EXCEPTION)
        return Alert.error(NOT_FOUND_EMAIL_MESSAGE);
    },

    onCompleted(data) {
      if (data) {
        const { forgotPassword: { response } } = data;

        if (response) {
          const { status } = response;

          if (status === 404) {
            return Alert.error(NOT_FOUND_EMAIL_MESSAGE);
          }

          if (status === 200) {
            Alert.success(FORGET_PASSWORD_SUCCESS);
            reset();
            setEmailSent(!emailSent);
          }
        }
      }
    }
  });

  const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data: ForgotPasswordInput) => {
    await forgotPassword({
      variables: {
        forgotPassword: data,
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {!emailSent ?
          <>
            <CommonController
              controllerName="email"
              controllerLabel="Email"
              fieldType="email"
            />

            <Box>
              <Button component={Link} to="/" color="primary" variant="text" sx={{ p: 0, minHeight: 0, mb: "20px" }}>
                Back to login page
              </Button>
            </Box>

            <Button variant="contained" fullWidth color="primary" type="submit" disabled={loading}
              endIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              Send instruction
            </Button>
          </>
          :
          <Box mt="110px">
            <Button component={Link} to="/" color="primary" variant="text" sx={{ p: 0, minHeight: 0, mb: "20px" }}>
              Back to login page
            </Button>
          </Box>
        }
      </form>
    </FormProvider>
  )
}
