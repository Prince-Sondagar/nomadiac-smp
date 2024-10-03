// components block
import { AuthLayout } from "../../../components/auth/Layout";
import { LoginForm } from "../../../components/auth/LoginForm";

const Login = (): JSX.Element => (
  <AuthLayout title="Login" subTitle="Enter details to login.">
    <LoginForm />
  </AuthLayout>
)

export default Login;