import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Dashboard({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token"); // get JWT
        if (!token) throw new Error("No token found");

        const res = await fetch("https://redesigned-umbrella-pw5xp5669w5c9p9w-5000.app.github.dev/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // send JWT in header
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        if (data.id) setAuthenticated(true);
        else setAuthenticated(false);
      } catch (err) {
        console.error("Failed to verify authentication:", err);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return <Navigate to="/login" />;
  return children;
}
