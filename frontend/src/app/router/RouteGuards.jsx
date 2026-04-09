import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

export function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function RequireRole({ roles }) {
  const { userRole } = useAuth();

  if (!roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

