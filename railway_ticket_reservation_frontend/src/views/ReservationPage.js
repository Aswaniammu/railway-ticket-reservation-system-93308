import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { apiGet, apiPost } from "../api";
import { colors } from "../theme";

// PUBLIC_INTERFACE
export default function ReservationPage() {
  const { id } = useParams(); // train/route id
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      try {
        // API: /routes/:id
        const d = await apiGet(`/routes/${id}`, token);
        setDetails(d.route);
      } catch {
        setError("Unable to load train info.");
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (error || !details) return <div style={s.error}>{error || "No train found."}</div>;

  const seatsAvailable = details.seatsAvailable ?? 0;

  // Simulate a row of seats for booking UI
  const maxSeats = details.maxSeats ?? 8; // default carriage length for demo
  const seatArray = Array(maxSeats)
    .fill(0)
    .map((_, i) => i + 1);

  const handleSeatSelect = (num) => {
    if (selectedSeats.includes(num)) {
      setSelectedSeats(selectedSeats.filter((n) => n !== num));
    } else {
      setSelectedSeats([...selectedSeats, num]);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) return setError("Please select at least one seat.");
    setBooking(true);
    setError(null);
    try {
      // API: POST /reservations
      await apiPost(
        "/reservations",
        {
          routeId: id,
          seatNumbers: selectedSeats,
        },
        token
      );
      setSuccess("Reservation successful!");
      setTimeout(() => navigate("/reservations"), 1200);
    } catch (err) {
      setError(
        err.message || "Failed to reserve. Some seats may no longer be available."
      );
    } finally {
      setBooking(false);
    }
  };

  return (
    <div style={{ ...s.box, maxWidth: 430 }}>
      <h2 style={s.heading}>
        Reserve Seat(s) on <span style={{ color: colors.accent }}>{details.name}</span>
      </h2>
      <div style={s.meta}>
        <div>
          <b>From:</b> {details.from}
        </div>
        <div>
          <b>To:</b> {details.to}
        </div>
        <div>
          <b>Date:</b> {details.date}
        </div>
        <div>
          <b>Departure:</b> {details.departure} &nbsp;&nbsp;
          <b>Arrival:</b> {details.arrival}
        </div>
        <div>
          <b>Seats Available:</b> {seatsAvailable}
        </div>
      </div>
      <form onSubmit={handleBook} style={{ marginTop: 18 }}>
        <div style={s.seatRow}>
          {seatArray.map((num) => (
            <button
              key={num}
              type="button"
              disabled={details.bookedSeats?.includes(num)}
              onClick={() => handleSeatSelect(num)}
              style={{
                ...s.seatBtn,
                background: selectedSeats.includes(num)
                  ? colors.secondary
                  : details.bookedSeats?.includes(num)
                  ? "#ccc"
                  : "#fff",
                color: selectedSeats.includes(num)
                  ? "#fff"
                  : details.bookedSeats?.includes(num)
                  ? "#aaa"
                  : "#444",
                border:
                  selectedSeats.includes(num) ||
                  details.bookedSeats?.includes(num)
                    ? "2.3px solid " + colors.secondary
                    : "2px solid #ccc",
                cursor: details.bookedSeats?.includes(num)
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {num}
            </button>
          ))}
        </div>
        <div style={{ margin: "12px 0 9px", fontSize: 15 }}>
          <b>
            Selected Seat(s):{" "}
            {selectedSeats.length === 0
              ? "-"
              : selectedSeats.join(", ")}
          </b>
        </div>
        {error && <div style={s.error}>{error}</div>}
        {success && <div style={s.success}>{success}</div>}
        <button
          style={{
            ...s.bookBtn,
            background: colors.accent,
            color: "#222",
          }}
          type="submit"
          disabled={booking}
        >
          {booking ? "Booking..." : "Book"}
        </button>
      </form>
    </div>
  );
}

const s = {
  box: {
    background: "#fff",
    borderRadius: 12,
    margin: "25px auto",
    padding: "32px 22px",
    boxShadow: "0 1px 9px #ececec",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: "285px",
  },
  heading: {
    color: colors.primary,
    textAlign: "center",
    marginBottom: 14,
    fontWeight: 700,
    fontSize: "1.3em",
    letterSpacing: 0.4,
  },
  meta: {
    color: "#444",
    fontSize: 16.5,
    marginBottom: 7,
    marginTop: 3,
    lineHeight: 1.4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  seatRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "12px",
  },
  seatBtn: {
    width: 38,
    height: 38,
    fontSize: 16.5,
    borderRadius: 7,
    padding: 0,
    fontWeight: 600,
    outline: "none",
    margin: 0,
    transition: "all 0.17s",
    border: "2px solid #ccc",
  },
  bookBtn: {
    marginTop: 15,
    padding: "11px 0",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "1.09em",
    cursor: "pointer",
  },
  error: {
    color: "#c00",
    background: "#ffebee",
    borderRadius: 4,
    padding: "7px 5px",
    fontSize: "1em",
    textAlign: "center",
    marginBottom: 5,
  },
  success: {
    color: "#388e3c",
    background: "#e9fbe8",
    borderRadius: 4,
    padding: "7px 5px",
    fontSize: "1em",
    textAlign: "center",
    marginBottom: 5,
  },
};
