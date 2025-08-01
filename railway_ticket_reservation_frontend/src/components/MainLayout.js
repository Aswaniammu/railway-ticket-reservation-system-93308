import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { colors } from "../theme";
import "./MainLayout.css";

// PUBLIC_INTERFACE
export default function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="layout-root" style={{ background: colors.background, minHeight: "100vh" }}>
      <header className="nav-header" style={{ background: colors.headerBg }}>
        <nav>
          <div className="nav-brand">
            <NavLink to="/" className="brand-link">
              <span className="brand-icon">&#128646;</span> RRTS
            </NavLink>
          </div>
          <ul className="nav-links">
            {isAuthenticated ? (
              <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/search">Search</NavLink></li>
                <li><NavLink to="/reservations">My Reservations</NavLink></li>
                <li className="nav-user">Hi, {user?.name || user?.email || "user"}</li>
                <li>
                  <button className="nav-logout-btn" onClick={handleLogout} aria-label="Log out">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="main-section">
        <Outlet />
      </main>
      <footer className="footer" style={{ background: colors.footerBg }}>
        <div className="footer-content">
          <span role="img" aria-label="train">&#128646;</span> Railway Ticket Reservation System &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
