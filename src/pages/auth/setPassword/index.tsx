// packages block
// component block
import { AuthLayout } from "../../../components/auth/Layout";
import { SetPasswordForm } from "../../../components/auth/SetPasswordForm";

const SetPassword = (): JSX.Element => (
  <AuthLayout title="Set up your password" subTitle="Set up password to complete your signup.">
    <SetPasswordForm />
  </AuthLayout>
)

export default SetPassword;