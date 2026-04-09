import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { RequireAuth, RequireRole } from "./RouteGuards";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { VolunteerDashboardPage } from "../../pages/VolunteerDashboardPage";
import { OrganizerDashboardPage } from "../../pages/OrganizerDashboardPage";
import { SponsorDashboardPage } from "../../pages/SponsorDashboardPage";
import { AdminDashboardPage } from "../../pages/AdminDashboardPage";
import { NotFoundPage } from "../../pages/NotFoundPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route element={<RequireRole roles={["volunteer"]} />}>
            <Route path="/volunteer/dashboard" element={<VolunteerDashboardPage />} />
          </Route>

          <Route element={<RequireRole roles={["organizer"]} />}>
            <Route path="/organizer/dashboard" element={<OrganizerDashboardPage />} />
          </Route>

          <Route element={<RequireRole roles={["sponsor"]} />}>
            <Route path="/sponsor/dashboard" element={<SponsorDashboardPage />} />
          </Route>

          <Route element={<RequireRole roles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>
        </Route>

        <Route path="/dashboard" element={<Navigate to="/volunteer/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
