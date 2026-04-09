import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="card">
      <h2>404 - Page not found</h2>
      <p className="muted">Route khong ton tai trong app frontend.</p>
      <Link className="button-primary" to="/">
        Back to home
      </Link>
    </div>
  );
}
