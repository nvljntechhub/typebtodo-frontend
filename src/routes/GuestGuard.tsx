import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/context/auth-context";
import { readRedirectPath } from "@/routes/redirect";

const GuestGuard = () => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "authenticated") {
    return (
      <Navigate to={readRedirectPath(location.state) ?? "/task-view"} replace />
    );
  }

  return <Outlet />;
};

export default GuestGuard;
