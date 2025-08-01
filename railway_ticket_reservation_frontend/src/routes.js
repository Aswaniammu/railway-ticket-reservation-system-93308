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

// PUBLIC_INTERFACE
export function AppRoutes() {
  const { isAuthenticated } = useAuth();

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
