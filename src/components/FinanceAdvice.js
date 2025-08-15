import React from "react";

export default function FinanceAdvice({ expenses }) {
  if (!expenses || expenses.length === 0) return <p>No expenses yet. Add some to get advice!</p>;

  // Currency formatter for ZAR
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
    }).format(value);

  // Calculate totals
  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  // Example advice: biggest category
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category || "Other"] = (acc[e.category || "Other"] || 0) + parseFloat(e.amount);
    return acc;
  }, {});

  const maxCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  return (
    <div className="finance-advice">
      <h2>Finance Advice</h2>
      <p>Total spent: {formatCurrency(totalSpent)}</p>
      <p>You're spending the most on: <strong>{maxCategory}</strong></p>
      {totalSpent > 18000 && <p>⚠️ Warning: Your spending is high! Consider saving more.</p>}
      {totalSpent <= 18000 && <p>✅ Good job! Your spending is under control.</p>}
    </div>
  );
}
