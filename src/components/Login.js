import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Use environment variable or fallback to Codespaces URL
  const SERVER_URL =
    process.env.REACT_APP_SERVER_URL ||
    "https://redesigned-umbrella-pw5xp5669w5c9p9w-5000.app.github.dev";

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("https://redesigned-umbrella-pw5xp5669w5c9p9w-5000.app.github.dev/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      //  Store JWT token locally
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
