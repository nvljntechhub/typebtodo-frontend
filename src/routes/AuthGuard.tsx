import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/context/auth-context";

const AuthGuard = () => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "guest") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
};

export default AuthGuard;
