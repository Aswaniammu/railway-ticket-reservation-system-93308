import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{
      textAlign: "center",
      padding: "44px 0",
      color: "#9315c1"
    }}>
      <h1>404</h1>
      <p>Page not found!</p>
      <NavLink to="/" style={{
        color: "#1976d2",
        textDecoration: "underline",
        fontWeight: 500,
      }}>Return Home</NavLink>
    </div>
  );
}
