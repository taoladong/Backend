import { Link } from "react-router-dom";
import { StatusCard } from "../shared/components/StatusCard";

export function HomePage() {
  return (
    <div>
      <h2>Project Foundation Ready</h2>
      <p className="muted">
        Phase 0 da setup xong router, auth shell, role-based layout, API client va provider cho data layer.
      </p>

      <div className="card-grid">
        <StatusCard title="Routing" value="Ready" hint="React Router + guards" />
        <StatusCard title="Data Layer" value="Ready" hint="TanStack Query" />
        <StatusCard title="API Client" value="Ready" hint="Axios + env base URL" />
      </div>

      <div className="card">
        <h3>Next Navigation</h3>
        <p className="muted">Dang nhap de vao dashboard role-specific.</p>
        <Link className="button-primary" to="/login">
          Go to Login Shell
        </Link>
      </div>
    </div>
  );
}
