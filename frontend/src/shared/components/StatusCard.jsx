export function StatusCard({ title, value, hint }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p className="status-value">{value}</p>
      <p className="muted">{hint}</p>
    </article>
  );
}
