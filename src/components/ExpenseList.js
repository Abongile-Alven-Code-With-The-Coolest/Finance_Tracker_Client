import React from 'react';
import { deleteExpense } from '../api';

export default function ExpenseList({ expenses = [], onDelete }) {
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      onDelete(id);
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  if (expenses.length === 0) return <p>No expenses to show.</p>;

  return (
    <ul>
      {expenses.map((e) => (
        <li key={e.id}>
          {e.title} - ${e.amount} on {e.date}
          <button onClick={() => handleDelete(e.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}
