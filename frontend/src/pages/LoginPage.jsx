import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const initialRegister = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role: "Volunteer",
};

export function LoginPage() {
  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "", rememberMe: true });
  const [registerForm, setRegisterForm] = useState(initialRegister);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = useMemo(() => {
    if (location.state?.from) return location.state.from;
    if (userRole) return `/${userRole}/dashboard`;
    return "/volunteer/dashboard";
  }, [location.state?.from, userRole]);

  async function handleLogin(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      await login(loginForm);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setMessage(error?.response?.data?.Error || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      await register(registerForm);
      setMessage("Register success. Please login.");
      setTab("login");
    } catch (error) {
      setMessage(error?.response?.data?.Error || "Register failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card login-wrap">
      <h2>Authentication</h2>

      <div className="button-row">
        <button type="button" onClick={() => setTab("login")}>Login</button>
        <button type="button" onClick={() => setTab("register")}>Register</button>
      </div>

      {tab === "login" && (
        <form className="form-grid" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            required
            value={loginForm.email}
            onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={loginForm.password}
            onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
          />

          <button className="button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      )}

      {tab === "register" && (
        <form className="form-grid" onSubmit={handleRegister}>
          <label>First name</label>
          <input
            required
            value={registerForm.firstName}
            onChange={(e) => setRegisterForm((prev) => ({ ...prev, firstName: e.target.value }))}
          />

          <label>Last name</label>
          <input
            required
            value={registerForm.lastName}
            onChange={(e) => setRegisterForm((prev) => ({ ...prev, lastName: e.target.value }))}
          />

          <label>Email</label>
          <input
            type="email"
            required
            value={registerForm.email}
            onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
          />

          <label>Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={registerForm.password}
            onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
          />

          <label>Role</label>
          <select
            value={registerForm.role}
            onChange={(e) => setRegisterForm((prev) => ({ ...prev, role: e.target.value }))}
          >
            <option value="Volunteer">Volunteer</option>
            <option value="Organizer">Organizer</option>
            <option value="Sponsor">Sponsor</option>
          </select>

          <button className="button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>
      )}

      {message && <p className="muted">{message}</p>}
    </div>
  );
}
