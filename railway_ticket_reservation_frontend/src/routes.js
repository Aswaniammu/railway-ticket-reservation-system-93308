import React from "react";
import { Navigate } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import DashboardPage from "./views/DashboardPage";
import SearchPage from "./views/SearchPage";
import ReservationPage from "./views/ReservationPage";
import ReservationHistoryPage from "./views/ReservationHistoryPage";
import NotFoundPage from "./views/NotFoundPage";
import { useAuth } from "./AuthContext";

/**
 * PUBLIC_INTERFACE
 * Returns the core route list for the application, choosing content based on authentication state.
 * This function safely handles the case where useAuth() is unavailable (e.g., during tests).
 */
export function AppRoutes() {
  let isAuthenticated = false;
  try {
    // Prefer correct context usage
    const auth = useAuth();
    isAuthenticated = auth ? !!auth.isAuthenticated : false;
  } catch (e) {
    // Fallback for test or edge usage
    isAuthenticated = false;
  }

  return [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage /> },
    { path: "/register", element: isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage /> },
    { path: "/dashboard", element: isAuthenticated ? <DashboardPage /> : <Navigate to="/login" /> },
    { path: "/search", element: isAuthenticated ? <SearchPage /> : <Navigate to="/login" /> },
    { path: "/reservation/:id", element: isAuthenticated ? <ReservationPage /> : <Navigate to="/login" /> },
    { path: "/reservations", element: isAuthenticated ? <ReservationHistoryPage /> : <Navigate to="/login" /> },
    { path: "*", element: <NotFoundPage /> }
  ];
}
