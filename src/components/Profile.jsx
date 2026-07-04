import { useNavigate } from "react-router-dom";
import "../style/Profile.css";

export default function Profile({ close }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === "admin";

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    close?.();
    navigate("/login");
  }

  return (
    <div className="profile-dropdown">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar-large">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="profile-info">
          <h3>{user?.name || "User"}</h3>
          <p>{user?.email || "No Email"}</p>
        </div>
      </div>

      <div className="profile-divider"></div>

      {/* Menu */}
      <button className="profile-item">
        <span>👤 Profile</span>
      </button>

      <button className="profile-item">
        <span>⚙️ Account Settings</span>
      </button>

      <button className="profile-item profile-item-space">
        <span>🎨 Theme</span>
        <span>›</span>
      </button>

      {isAdmin && (
        <button className="profile-item">
          <span>👥 Users</span>
        </button>
      )}

      <div className="profile-divider"></div>

      <button className="profile-item profile-logout" onClick={logout}>
        <span>🚪 Logout</span>
      </button>
    </div>
  );
}
