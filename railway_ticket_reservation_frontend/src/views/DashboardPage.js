import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { colors } from "../theme";

// PUBLIC_INTERFACE
export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div style={style.root}>
      <h1 style={style.heading}>Welcome, {user?.name || user?.email || "User"}!</h1>
      <p>Your railway travel simplified.</p>
      <div style={style.actions}>
        <NavLink to="/search" style={style.btnPrimary}>Search Trains</NavLink>
        <NavLink to="/reservations" style={style.btnSecondary}>My Reservations</NavLink>
      </div>
    </div>
  );
}

const style = {
  root: {
    maxWidth: 420,
    margin: "30px auto",
    padding: "40px 24px",
    boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
    borderRadius: 15,
    background: "#fff",
    textAlign: "center",
  },
  heading: {
    fontWeight: 800,
    color: colors.primary,
    fontSize: "2.1em",
    marginBottom: "10px",
    letterSpacing: 0.5,
  },
  actions: {
    marginTop: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  btnPrimary: {
    background: colors.primary,
    color: "#fff",
    borderRadius: 7,
    padding: "14px 0",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1.11em",
    letterSpacing: ".5px",
  },
  btnSecondary: {
    background: colors.accent,
    color: "#181818",
    borderRadius: 7,
    padding: "14px 0",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1.11em",
    letterSpacing: ".5px",
  },
};
