import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { apiGet } from "../api";
import { colors } from "../theme";

// PUBLIC_INTERFACE
export default function ReservationHistoryPage() {
  const { token } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReservations() {
      setLoading(true);
      setError(null);
      try {
        // /reservations?mine=true returns this user's reservations
        const data = await apiGet("/reservations?mine=true", token);
        setReservations(data.reservations || []);
      } catch (err) {
        setError("Failed to load reservations.");
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, [token]);

  return (
    <div style={s.root}>
      <h2 style={s.heading}>My Reservations</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={s.error}>{error}</div>}
      {!loading && reservations.length === 0 && !error && (
        <div>No reservations found.</div>
      )}
      {!loading && reservations.length > 0 && (
        <table style={s.table}>
          <thead>
            <tr>
              <th>Route</th>
              <th>Date</th>
              <th>Seat(s)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>
                  {r.routeName} <br />
                  <span style={{ fontWeight: 400, color: "#555", fontSize: ".97em" }}>
                    ({r.from} &rarr; {r.to})
                  </span>
                </td>
                <td>{r.date}</td>
                <td>{Array.isArray(r.seatNumbers) ? r.seatNumbers.join(", ") : r.seatNumbers}</td>
                <td>
                  {typeof r.status === "string"
                    ? r.status.charAt(0).toUpperCase() + r.status.slice(1)
                    : "Confirmed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const s = {
  root: {
    maxWidth: 650,
    margin: "40px auto",
    padding: "25px 12px 22px 12px",
    background: "#fff",
    borderRadius: 11,
    boxShadow: "0 1px 10px #ececec",
    fontSize: "1.07em",
  },
  heading: {
    color: colors.primary,
    textAlign: "center",
    marginBottom: 19,
    fontSize: "1.55em",
    fontWeight: 700,
  },
  error: {
    color: "#d32f2f",
    background: "#ffebee",
    borderRadius: 5,
    padding: "7px",
    fontSize: "0.97em",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 0 7px #eee",
    overflow: "hidden",
    fontSize: "0.99em",
  },
};
