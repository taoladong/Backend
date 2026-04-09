import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

const roleMenus = {
  volunteer: [
    { to: "/volunteer/dashboard", label: "Volunteer Dashboard" },
  ],
  organizer: [
    { to: "/organizer/dashboard", label: "Organizer Dashboard" },
  ],
  sponsor: [{ to: "/sponsor/dashboard", label: "Sponsor Dashboard" }],
  admin: [{ to: "/admin/dashboard", label: "Admin Dashboard" }],
};

export function AppLayout() {
  const { isAuthenticated, userRole, signOut, switchRole } = useAuth();
  const menus = roleMenus[userRole] ?? [];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <h1>VolunteerHub</h1>
          <p className="muted">Frontend Foundation - Phase 0</p>
        </div>

        <nav>
          <NavLink to="/">Home</NavLink>
          {menus.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {isAuthenticated && (
          <div className="role-switcher">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={userRole}
              onChange={(event) => switchRole(event.target.value)}
            >
              <option value="volunteer">Volunteer</option>
              <option value="organizer">Organizer</option>
              <option value="sponsor">Sponsor</option>
              <option value="admin">Admin</option>
            </select>
            <button type="button" onClick={signOut}>
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

