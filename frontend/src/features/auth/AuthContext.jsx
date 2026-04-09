import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContextValue";
import * as authApi from "../../shared/api/authApi";
import { pickPrimaryRole } from "../../shared/utils/role";

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);

  async function refreshMe() {
    try {
      const me = await authApi.me();
      const primaryRole = pickPrimaryRole(me.roles ?? []);
      setUser({
        id: me.userId,
        email: me.email,
        roles: (me.roles ?? []).map((r) => String(r).toLowerCase()),
        primaryRole,
      });
      setStatus("authenticated");
      return me;
    } catch {
      setUser(null);
      setStatus("anonymous");
      return null;
    }
  }

  useEffect(() => {
    refreshMe();

    function onUnauthorized() {
      setUser(null);
      setStatus("anonymous");
    }

    window.addEventListener("vh:unauthorized", onUnauthorized);
    return () => window.removeEventListener("vh:unauthorized", onUnauthorized);
  }, []);

  const value = useMemo(
    () => ({
      status,
      user,
      isAuthenticated: status === "authenticated",
      userRole: user?.primaryRole ?? "",
      roles: user?.roles ?? [],
      refreshMe,
      register: (payload) => authApi.register(payload),
      login: async (payload) => {
        await authApi.login(payload);
        await refreshMe();
      },
      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          setUser(null);
          setStatus("anonymous");
        }
      },
    }),
    [status, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
