import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { apiPost } from "../api";
import { colors } from "../theme";

// PUBLIC_INTERFACE
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // /auth/login API must return {user, token}
      const data = await apiPost("/auth/login", form);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={style.form}>
      <h2 style={style.heading}>Login</h2>
      <label>
        Email
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          value={form.email}
          onChange={onChange}
          style={style.input}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
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
          background: colors.primary,
          color: "#fff",
        }}
        disabled={loading}
        type="submit"
        aria-busy={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div style={{ marginTop: 10 }}>
        <span style={{ fontSize: 14 }}>
          No account? <Link to="/register">Register here</Link>
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
    color: colors.primary,
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
