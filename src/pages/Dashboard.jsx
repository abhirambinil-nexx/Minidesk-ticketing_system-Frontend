import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const response = await getDashboard();

      console.log("Response:", response);
      console.log("Response.data:", response.data);

      if (response.success) {
        console.log("Total:", response.data.total);
        console.log("Open:", response.data.open);
        console.log("Dashboard Object:", response.data);

        setDashboard(response.data);
      } else {
        handleUnauthorized();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleUnauthorized() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  if (error) {
    return <h2 className="dashboard__error">{error}</h2>;
  }

  if (!dashboard) {
    return <h2 className="dashboard__loading">Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard__welcome">Welcome, {user?.name || "User"}</h1>

      <h3 className="dashboard__role">Role: {user?.role || "N/A"}</h3>

      <hr className="dashboard__divider" />

      <div className="dashboard-grid">
        <DashboardCard title="Total Tickets" value={dashboard.total} />
        <DashboardCard title="Open" value={dashboard.open} />
        <DashboardCard title="In Progress" value={dashboard.inProgress} />
        <DashboardCard title="Resolved" value={dashboard.resolved} />
        <DashboardCard title="Closed" value={dashboard.closed} />
        <DashboardCard title="Urgent" value={dashboard.urgent} />
      </div>

      <h2 className="dashboard__section-title">Recent Tickets</h2>

      {dashboard.recentTickets?.length === 0 ? (
        <p className="dashboard__empty-state">No tickets available.</p>
      ) : (
        <table className="dashboard__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.recentTickets?.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.category}</td>
                <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
