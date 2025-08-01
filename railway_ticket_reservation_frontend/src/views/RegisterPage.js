import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { apiPost } from "../api";
import { colors } from "../theme";

// PUBLIC_INTERFACE
export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // /auth/register should return {user, token}
      const data = await apiPost("/auth/register", form);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={style.form}>
      <h2 style={style.heading}>Register</h2>
      <label>
        Name
        <input
          name="name"
          type="text"
          required
          minLength={2}
          value={form.name}
          onChange={onChange}
          style={style.input}
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={onChange}
          style={style.input}
          autoComplete="username"
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          value={form.password}
          onChange={onChange}
          style={style.input}
        />
      </label>
      {error && (
        <div style={style.error}>{error}</div>
      )}
      <button
        style={{
          ...style.btn,
          background: colors.accent,
          color: "#222",
        }}
        disabled={loading}
        type="submit"
        aria-busy={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <div style={{ marginTop: 10 }}>
        <span style={{ fontSize: 14 }}>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </form>
  );
}

const style = {
  form: {
    background: "#fff",
    borderRadius: 10,
    maxWidth: 340,
    margin: "60px auto",
    padding: "36px 26px",
    boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  heading: {
    textAlign: "center",
    color: colors.secondary,
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    fontSize: "1em",
    marginTop: 6,
    marginBottom: 2,
    padding: "8px 10px",
    border: "1px solid #ccc",
    borderRadius: 4,
    outline: "none",
  },
  btn: {
    marginTop: 10,
    padding: "10px 0",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "1.09em",
    cursor: "pointer",
  },
  error: {
    color: "#d32f2f",
    background: "#ffebee",
    borderRadius: 5,
    padding: "7px",
    fontSize: "0.97em",
    textAlign: "center",
  },
};

