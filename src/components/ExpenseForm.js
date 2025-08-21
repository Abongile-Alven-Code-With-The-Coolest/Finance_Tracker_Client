import React, { useState } from "react";

const SERVER_URL = "https://redesigned-umbrella-pw5xp5669w5c9p9w-5000.app.github.dev";

export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const categories = [
    "Food & Groceries",
    "Transport",
    "Housing & Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Shopping",
    "Savings",
    "Other"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await fetch(`${SERVER_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount,
          category,
          date,
          userId: "current-user-id" 
        }),
      });

      // Refresh expenses in parent
      onAddExpense();

      // Clear form
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}
