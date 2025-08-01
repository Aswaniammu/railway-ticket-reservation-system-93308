import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { apiGet } from "../api";
import { colors } from "../theme";

// PUBLIC_INTERFACE
export default function SearchPage() {
  const { token } = useAuth();
  const [query, setQuery] = useState({ from: "", to: "", date: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setQuery({ ...query, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    setSearched(false);
    try {
      // API: /routes/search?from=...&to=...&date=...
      const params = new URLSearchParams(query);
      const data = await apiGet(`/routes/search?${params.toString()}`, token);
      setResults(data.routes || []);
      setSearched(true);
    } catch (err) {
      setError("No trains found or network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ color: colors.primary, marginBottom: 12 }}>Search Trains</h2>
      <form onSubmit={handleSearch} style={style.form}>
        <label>
          From
          <input
            required
            name="from"
            value={query.from}
            onChange={handleChange}
            style={style.input}
            placeholder="Start Station"
            autoFocus
          />
        </label>
        <label>
          To
          <input
            required
            name="to"
            value={query.to}
            onChange={handleChange}
            style={style.input}
            placeholder="Destination"
          />
        </label>
        <label>
          Date
          <input
            required
            name="date"
            value={query.date}
            onChange={handleChange}
            style={style.input}
            type="date"
            min={new Date().toISOString().slice(0, 10)}
          />
        </label>
        <button
          style={{
            ...style.btn,
            background: colors.secondary,
            color: "#fff",
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <div style={style.error}>{error}</div>}
      {searched && (
        <div>
          {results.length === 0 ? (
            <p>No trains found.</p>
          ) : (
            <TrainList trains={results} onReserve={(id) => navigate(`/reservation/${id}`)} />
          )}
        </div>
      )}
    </div>
  );
}

function TrainList({ trains, onReserve }) {
  return (
    <div style={{ marginTop: 22 }}>
      <table style={style.table}>
        <thead>
          <tr>
            <th>Train</th>
            <th>From</th>
            <th>To</th>
            <th>Dep.</th>
            <th>Arr.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trains.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.from}</td>
              <td>{t.to}</td>
              <td>{t.departure}</td>
              <td>{t.arrival}</td>
              <td>
                <button style={style.btnTable} onClick={() => onReserve(t.id)}>
                  Reserve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const style = {
  form: {
    background: "#fff",
    borderRadius: 8,
    padding: "18px 18px",
    boxShadow: "0 1px 10px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 13,
    marginBottom: 14,
  },
  input: {
    marginTop: 5,
    marginBottom: 2,
    padding: "8px 11px",
    width: "100%",
    fontSize: "1em",
    border: "1px solid #bbb",
    borderRadius: 5,
    outline: "none",
  },
  btn: {
    marginTop: 12,
    padding: "11px 0",
    border: "none",
    borderRadius: "5px",
    fontWeight: 600,
    fontSize: "1.09em",
    cursor: "pointer",
    letterSpacing: 0.8,
  },
  error: {
    marginTop: 5,
    color: "#d32f2f",
    background: "#ffebee",
    borderRadius: 4,
    padding: "8px 3px",
    fontSize: "1em",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 6,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 0 7px #eee",
    overflow: "hidden",
  },
  btnTable: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 18px",
    fontWeight: 500,
    fontSize: "1.01em",
    cursor: "pointer",
  },
};
