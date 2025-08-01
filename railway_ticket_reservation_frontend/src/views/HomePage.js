import React from "react";
import { NavLink } from "react-router-dom";
import { colors } from "../theme";

// PUBLIC_INTERFACE
export default function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "40px 0", color: colors.text }}>
      <h1 style={{ fontSize: "2.6em", color: colors.primary, marginBottom: 8 }}>
        Railway Ticket Reservation System
      </h1>
      <p style={{ fontSize: "1.25em", color: "#444", margin: "10px 0 18px" }}>
        Secure your seat. Plan your journey.
      </p>
      <div>
        <NavLink
          to="/login"
          style={{
            textDecoration: "none",
            background: colors.primary,
            color: "#fff",
            padding: "12px 34px",
            borderRadius: "6px",
            margin: "0 18px",
            fontWeight: 600,
            fontSize: "1.1em",
          }}
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          style={{
            textDecoration: "none",
            background: colors.accent,
            color: "#222",
            padding: "12px 34px",
            borderRadius: "6px",
            margin: "0 14px",
            fontWeight: 600,
            fontSize: "1.1em",
          }}
        >
          Register
        </NavLink>
      </div>
      <div
        style={{
          marginTop: "55px",
          color: colors.secondary,
          fontWeight: 600,
          fontSize: "1.5em",
        }}
      >
        <span role="img" aria-label="train">
          🚄
        </span>{" "}
        Book fast, travel faster.
      </div>
    </div>
  );
}
