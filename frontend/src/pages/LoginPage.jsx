import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { apiClient } from "../shared/api/client";

export function LoginPage() {
  const [role, setRole] = useState("volunteer");
  const [apiMessage, setApiMessage] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleCheckApi() {
    try {
      const response = await apiClient.get("/api/auth/me");
      setApiMessage(`API connected (HTTP ${response.status})`);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        setApiMessage("API connected (401 before login is expected)");
        return;
      }
      setApiMessage("Cannot reach API. Check VITE_API_BASE_URL.");
    }
  }

  function handleEnter() {
    signIn("phase0-demo-token", role);
    const from = location.state?.from;
    navigate(from || `/${role}/dashboard`, { replace: true });
  }

  return (
    <div className="login-wrap">
      <h2>Login Shell (Phase 0)</h2>
      <p className="muted">Trang nay chi la shell de mo route role-based truoc khi noi auth that.</p>

      <label htmlFor="role">Role</label>
      <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
        <option value="volunteer">Volunteer</option>
        <option value="organizer">Organizer</option>
        <option value="sponsor">Sponsor</option>
        <option value="admin">Admin</option>
      </select>

      <div className="button-row">
        <button type="button" className="button-primary" onClick={handleEnter}>
          Enter dashboard
        </button>
        <button type="button" onClick={handleCheckApi}>
          Check API
        </button>
      </div>

      {apiMessage && <p className="muted">{apiMessage}</p>}
    </div>
  );
}

