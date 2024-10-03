//packages block
import { FC, useContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
//components block
import { AuthContext } from "../context";
import ForgotPassword from "../pages/auth/forgotPassword";
import ResetPassword from "../pages/auth/resetPassword";
import SetPassword from "../pages/auth/setPassword";
import Login from "../pages/auth/login";
import PageNotFound from "../pages/404";
import Projects from "../pages/main/projects";
import User from "../pages/main/user";
import Panels from "../pages/main/Panelist";
import PanelDetails from "../pages/main/Panelist/PanelDetails";
import UserDetailPage from "../pages/main/user/Other/UserDetail";
import SupplierDetailPage from "../pages/main/user/Supplier/SupplierDetail";
import Dashboard from "../pages/main/dashboard";
import SurveyVerify from "../pages/main/projects/SurveyVerifyComponent";

//others block
import {
  FORGET_PASSWORD_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  PROJECT_ROUTE,
  RESET_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  SET_PASSWORD_ROUTE,
  SURVEY_VERIFY_ROUTE,
  USER_ROUTE,
  PROJECT_CREATE_ROUTE,
  COMPLETE_ROUTE,
  TERMINATE_ROUTE,
  QUOTA_ROUTE,
  SECURITY_ROUTE,
  ROOT_ROUTE,
  SUPPLIER_ROUTE,
  PANEL_ROUTE,
  DASHBOARD_ROUTE,
  PAYMENT_REQUEST,
  DEFENDER_REVIEW_ROUTE,
} from "../constants";
import ProjectCreate from "../pages/main/projects/projectCreate";
import { Box } from "@mui/material";
import Sidebar from "../components/common/Sidebar";
import Complete from "../pages/main/landing/complete";
import Terminate from "../pages/main/landing/terminate";
import Quota from "../pages/main/landing/quota";
import Security from "../pages/main/landing/security";
import SupplierResult from "../components/supplier/SupplierResult";
import ProjectSubmission from "../pages/main/projects/ProjectSubmission";
import MainLayout from "../components/common/Layout";
import { PanelistPaymentRequest } from "../pages/main/Panelist/PanelistPaymentRequest";
import DefenderReviewApi from "../pages/main/defender-review-api";
import PanelistSurveyResult from "../pages/main/Panelist/PanelistSurveyResult";
import PanelistPointHistory from "../pages/main/Panelist/PanelistPointHistory";

export const PageNotFoundRoute = {
  path: PAGE_NOT_FOUND_ROUTE,
  component: <PageNotFound />,
};

export const AuthRoutes = [
  {
    path: LOGIN_ROUTE,
    component: <Login />,
  },
  {
    path: FORGET_PASSWORD_ROUTE,
    component: <ForgotPassword />,
  },
  {
    path: SET_PASSWORD_ROUTE,
    component: <SetPassword />,
  },
  {
    path: RESET_PASSWORD_ROUTE,
    component: <ResetPassword />,
  },
];

export const AppRoutes = [
  {
    path: ROOT_ROUTE,
    component: <User />,
  },
  {
    path: USER_ROUTE,
    component: <User />,
  },
  {
    path: PANEL_ROUTE,
    component: <Panels />,
  },
  {
    path: `${PANEL_ROUTE}/:id`,
    component: <PanelDetails />,
  },
  {
    path: `${PANEL_ROUTE}/:id/payment-request`,
    component: <PanelistPaymentRequest />,
  },
  {
    path: `${PAYMENT_REQUEST}`,
    component: <PanelistPaymentRequest isNavTab={true} />,
  },
  {
    path: `${PANEL_ROUTE}/:id/survey-history`,
    component: <PanelistSurveyResult />,
  },
  {
    path: `${PANEL_ROUTE}/:id/point-history`,
    component: <PanelistPointHistory />,
  },
  {
    path: `${USER_ROUTE}/:id`,
    component: <UserDetailPage />,
  },
  {
    path: `${SUPPLIER_ROUTE}/:id`,
    component: <SupplierDetailPage />,
  },
  {
    path: PROJECT_ROUTE,
    component: <Projects />,
  },
  {
    path: `${PROJECT_ROUTE}/:id/supplierResult`,
    component: <SupplierResult />,
  },
  {
    path: PROJECT_CREATE_ROUTE,
    component: <ProjectCreate />,
  },
  {
    path: DASHBOARD_ROUTE,
    component: <Dashboard />,
  },
];

const RouteComponent: FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Box display={"flex"}>
        <Routes>
          <Route path={`project/:id/submission`} element={<ProjectSubmission />} />
          <Route path={DEFENDER_REVIEW_ROUTE} element={<DefenderReviewApi />} />

          <Route element={<AuthRoute />}>
            {AppRoutes.map(({ path, component }, index) => (
              <Route path={path} element={component} key={`${path}${index}`} />
            ))}
          </Route>

          <Route element={<UnAuthRoute />}>
            {AuthRoutes.map(({ path, component }, index) => (
              <Route path={path} element={component} key={`${path}${index}`} />
            ))}
          </Route>
          <Route path={SURVEY_VERIFY_ROUTE} element={<SurveyVerify />} />
          <Route path={COMPLETE_ROUTE} element={<Complete />} />
          <Route path={TERMINATE_ROUTE} element={<Terminate />} />
          <Route path={QUOTA_ROUTE} element={<Quota />} />
          <Route path={SECURITY_ROUTE} element={<Security />} />
          <Route path={PAGE_NOT_FOUND_ROUTE} element={<PageNotFound />} />
          <Route path="*" element={<Navigate to={PAGE_NOT_FOUND_ROUTE} />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

const AuthRoute = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);
  const [openCustomDrawer] = useState<boolean>(true);

  if (!isLoading && isLoggedIn)
    return (
      <>
        <Sidebar
          open={open}
          setOpen={setOpen}
          openCustomDrawer={openCustomDrawer}
        />
        <MainLayout setToggle={setOpen}>
          <Outlet context={{ setToggleSidebar: setOpen }} />
        </MainLayout>
      </>
    );

  return <Navigate to={LOGIN_ROUTE} />;
};

const UnAuthRoute = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (!isLoading && !isLoggedIn) return <Outlet />;

  return <Navigate to={USER_ROUTE} />;
};

export default RouteComponent;
