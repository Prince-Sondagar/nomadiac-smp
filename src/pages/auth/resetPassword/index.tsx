// components block
import { AuthLayout } from "../../../components/auth/Layout";
import { ResetPasswordForm } from "../../../components/auth/ResetPasswordForm";
// others block
import { RESET_PASSWORD } from "../../../constants";

const ResetPassword = (): JSX.Element => {

  return (
    <AuthLayout title={RESET_PASSWORD}>
      <ResetPasswordForm />
    </AuthLayout>
  )
}

export default ResetPassword;