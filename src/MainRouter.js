import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import App from "./App";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} /> {/* Default to register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard>
              <App />
            </Dashboard>
          }
        />
      </Routes>
    </Router>
  );
}

export default MainRouter;
