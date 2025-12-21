import UserPage from "../pages/UserPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import type { RouteObject } from "react-router-dom";
import Verification from "../pages/Verification";
import ResetPassword from "../pages/ResetPassword";
import Price from "../pages/Price";
import About from "../pages/About";
import Main from "../pages/Main";
import MainContactUs from "../pages/MainContactUs";
import Deals from "../pages/Deals";
import Wallet from "../pages/Wallet";
import LoginDashboard from "../pages/LoginDashboard";
import ContactUs from "../pages/ContactUs";
import ProtectedRoute from "../components/ProtectedRoute";

export type AppRoute = RouteObject & {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
};

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <UserPage />,
  },
  {
    path: "/price",
    element: <Price />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact-us",
    element: <MainContactUs />,
  },
  {
    path: "/contactUs",
    element: <ContactUs />,
  },
  {
    path: "/mainpage",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: "/deals",
    element: (
      <ProtectedRoute>
        <Deals />
      </ProtectedRoute>
    ),
  },
  {
    path: "/wallet",
    element: (
      <ProtectedRoute>
        <Wallet />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/login-dash",
    element: <LoginDashboard />,
  },
];
