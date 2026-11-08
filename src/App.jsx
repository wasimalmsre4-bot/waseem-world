import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import WorldPage from "./pages/WorldPage.jsx";
import ToolsPage from "./pages/ToolsPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

import "./App.css";

function AppContent() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f7f9fc",
          color: "#142b4d",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        WASEEM WORLD
        <br />
        جاري التحميل...
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/worlds" element={<WorldPage />} />

      <Route path="/tools" element={<ToolsPage />} />

      <Route path="/world/:id" element={<WorldPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;