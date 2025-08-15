// ExpenseChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getLastSixMonths } from '../utils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ExpenseChart({ expenses = [] }) {
  const lastSixMonths = getLastSixMonths();

  const monthlyTotals = lastSixMonths.map(({ monthNum, year }) => {
    return expenses
      .filter(e => {
        const date = new Date(e.date);
        return date.getMonth() + 1 === monthNum && date.getFullYear() === year;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  });

  const data = {
    labels: lastSixMonths.map(m => m.label),
    datasets: [
      {
        label: 'Spending (Last 6 months)',
        data: monthlyTotals,
        borderColor: 'rgba(75,192,192,.5)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return <Line data={data} />;
}
