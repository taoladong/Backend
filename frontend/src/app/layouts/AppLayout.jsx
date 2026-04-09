import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

const roleMenus = {
  volunteer: [
    { to: "/volunteer/dashboard", label: "Dashboard" },
    { to: "/volunteer/events", label: "Events" },
    { to: "/volunteer/profile", label: "Profile & Passport" },
  ],
  organizer: [{ to: "/organizer/dashboard", label: "Organizer Dashboard" }],
  sponsor: [{ to: "/sponsor/dashboard", label: "Sponsor Dashboard" }],
  admin: [{ to: "/admin/dashboard", label: "Admin Dashboard" }],
};

export function AppLayout() {
  const { isAuthenticated, userRole, user, logout } = useAuth();
  const menus = roleMenus[userRole] ?? [];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <h1>VolunteerHub</h1>
          <p className="muted">Phase 1 - Volunteer MVP</p>
        </div>

        <nav>
          <NavLink to="/">Home</NavLink>
          {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
          {menus.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {isAuthenticated && (
          <div className="account-box">
            <p className="muted">{user?.email}</p>
            <p className="muted">Role: {userRole || "unknown"}</p>
            <button type="button" onClick={logout}>
              Sign out
            </button>
          </div>
        )}
      </aside>

      <section className="content">
        <Outlet />
      </section>
    </div>
  );
}
