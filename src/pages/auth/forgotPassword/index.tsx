// packages block
import { useState } from "react";
import { ForgotPasswordForm } from "../../../components/auth/ForgotPasswordForm";
// Components block
import { AuthLayout } from "../../../components/auth/Layout";

const ForgotPassword = (): JSX.Element => {
  const [emailSent, setEmailSent] = useState<boolean>(false);

  return (
    <AuthLayout
      title={!emailSent ? 'Forgot password' : 'Email sent!'}
      subTitle={!emailSent ?
        'Please enter your associated email to reset password.' :
        'Please follow the instructions and link in your email inbox in order to reset your password.'}
    >
      <ForgotPasswordForm emailSent={emailSent} setEmailSent={setEmailSent} />
    </AuthLayout>
  )
}

export default ForgotPassword;