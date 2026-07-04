import { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import "../style/Navbar.css";

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="topbar">
      <div className="topbar__left">
        <Link to="/dashboard" className="navbar__brand">
          MiniDesk
        </Link>
        <div className="topbar__search-container">
          <div className="topbar__search">
            <span className="search-icon">🔍</span>

            <input
              type="text"
              placeholder="Search tickets, users, categories..."
            />
          </div>
          <Link to="/tickets/new">
            <button className="topbar__create">+ Create</button>
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="topbar__right">
        <button className="topbar__icon">🔔</button>

        <button className="topbar__icon">❔</button>

        <div
          className="topbar__profile"
          onClick={() => setOpenProfile(!openProfile)}
        >
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {openProfile && <Profile close={() => setOpenProfile(false)} />}
        </div>
      </div>
    </header>
  );
}
