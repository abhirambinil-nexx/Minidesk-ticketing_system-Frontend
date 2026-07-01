export default function DashboardCard({ title, value }) {
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-card__title">{title}</h3>
      <h1 className="dashboard-card__value">{value || 0}</h1>
    </div>
  );
}
