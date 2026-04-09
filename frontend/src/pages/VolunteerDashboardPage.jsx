import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "../shared/api/volunteerApi";

export function VolunteerDashboardPage() {
  const applicationsQuery = useQuery({
    queryKey: ["volunteer", "applications"],
    queryFn: getMyApplications,
  });

  const items = applicationsQuery.data ?? [];

  return (
    <div className="card-stack">
      <section className="card">
        <h2>Volunteer Dashboard</h2>
        <p className="muted">Tong quan don ung tuyen cua ban.</p>
      </section>

      <section className="card">
        <h3>My Applications</h3>
        {applicationsQuery.isLoading && <p className="muted">Loading applications...</p>}
        {applicationsQuery.isError && <p className="muted">Cannot load applications.</p>}
        {!applicationsQuery.isLoading && !applicationsQuery.isError && items.length === 0 && (
          <p className="muted">No applications yet.</p>
        )}
        <div className="list-grid">
          {items.map((item) => (
            <article key={item.id} className="card-subtle">
              <p><strong>Status:</strong> {item.status}</p>
              <p><strong>Event:</strong> {item.eventId}</p>
              <p><strong>Applied:</strong> {new Date(item.appliedAt).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
