import { useMemo, useState } from "react";
import { clearAccessToken, getAccessToken, setAccessToken } from "../../shared/auth/tokenStore";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAccessToken());
  const [userRole, setUserRole] = useState("volunteer");

  const value = useMemo(
    () => ({
      token,
      userRole,
      isAuthenticated: Boolean(token),
      signIn: (nextToken, nextRole = "volunteer") => {
        setAccessToken(nextToken);
        setToken(nextToken);
        setUserRole(nextRole);
      },
      signOut: () => {
        clearAccessToken();
        setToken("");
        setUserRole("volunteer");
      },
      switchRole: (nextRole) => setUserRole(nextRole),
    }),
    [token, userRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
