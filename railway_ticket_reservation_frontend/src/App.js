import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import MainLayout from "./components/MainLayout";
import { AppRoutes } from "./routes";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  // Place all routing logic here. Pages render as outlets in MainLayout.
  const routes = AppRoutes();
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((r, i) => (
              <Route key={r.path || i} path={r.path} element={r.element} />
            ))}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
