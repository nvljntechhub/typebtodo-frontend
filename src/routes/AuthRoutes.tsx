import { Navigate, type RouteObject } from "react-router";
import BaseLayout from "@/layout/BaseLayout";
import RoutesLoader from "@/components/RoutesLoader";
import GuestGuard from "@/routes/GuestGuard";
import { lazy } from "react";

const LoginPage = RoutesLoader(
  lazy(() => import("@/pages/auth/login/LoginPage")),
);
const RegisterPage = RoutesLoader(
  lazy(() => import("@/pages/auth/register/RegisterPage")),
);
const ForgotPasswordPage = RoutesLoader(
  lazy(() => import("@/pages/auth/login/ForgotPasswordPage")),
);

const authRoutes: RouteObject[] = [
  {
    element: <GuestGuard />,
    children: [
      {
        element: <BaseLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { index: true, element: <Navigate to="/login" replace /> },
        ],
      },
    ],
  },
];

export default authRoutes;
