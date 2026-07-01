import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <strong className="navbar__brand">MiniDesk</strong>
        <Link className="navbar__link" to="/dashboard">
          Home
        </Link>
        <Link className="navbar__link" to="/tickets">
          View Tickets
        </Link>
        <Link className="navbar__link" to="/tickets/new">
          Create Ticket
        </Link>
        {isAdmin && (
          <Link className="navbar__link" to="/users">
            Users
          </Link>
        )}
      </div>

      <div className="navbar__right">
        <span className="navbar__user">
          {user?.name ? `${user.name} (${user.role || "user"})` : "User"}
        </span>
        <button className="navbar__logout" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
