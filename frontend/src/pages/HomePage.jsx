import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

export function HomePage() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <div className="card-stack">
      <section className="card">
        <h2>VolunteerHub Frontend</h2>
        <p className="muted">
          Phase 1 dang tap trung cho luong Volunteer: auth, event apply, profile va passport gio tinh nguyen.
        </p>
      </section>

      <section className="card">
        <h3>Quick navigation</h3>
        {!isAuthenticated && (
          <Link className="button-primary" to="/login">
            Login / Register
          </Link>
        )}
        {isAuthenticated && userRole === "volunteer" && (
          <div className="button-row">
            <Link className="button-primary" to="/volunteer/events">
              Browse events
            </Link>
            <Link className="button-primary" to="/volunteer/profile">
              Open profile
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
