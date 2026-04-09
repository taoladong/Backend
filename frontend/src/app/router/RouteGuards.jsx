import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

export function RequireAuth() {
  const { status, isAuthenticated } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <div className="card">Loading session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function RequireRole({ roles }) {
  const { userRole } = useAuth();
  const normalized = roles.map((r) => String(r).toLowerCase());

  if (!normalized.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
