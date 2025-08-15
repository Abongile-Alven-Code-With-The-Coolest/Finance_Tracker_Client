import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseChart from "./components/ExpenseChart";
import FinanceAdvice from "./components/FinanceAdvice";

const SERVER_URL = "https://redesigned-umbrella-pw5xp5669w5c9p9w-5000.app.github.dev";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  // Fetch all expenses from the backend
  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/expenses`);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="App">
      <h1>Finance Tracker</h1>
      {/* Pass fetchExpenses as callback to refresh the list */}
      <ExpenseForm onAddExpense={fetchExpenses} />
      <ExpenseChart expenses={expenses} />
      <FinanceAdvice expenses={expenses} />
    </div>
  );
}
