import { Link, useNavigate } from "react-router-dom";
import "../style/Sidebar.css";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__links">
        <Link className="sidebar__link" to="/dashboard">
          Home
        </Link>

        <Link className="sidebar__link" to="/tickets">
          View Tickets
        </Link>

        <Link className="sidebar__link" to="/tickets/new">
          Create Ticket
        </Link>

        {isAdmin && (
          <Link className="sidebar__link" to="/users">
            Users
          </Link>
        )}
      </div>

      <div className="sidebar__bottom">
        <span className="sidebar__user">
          {user?.name ? `${user.name} (${user.role})` : "User"}
        </span>
      </div>
    </aside>
  );
}
