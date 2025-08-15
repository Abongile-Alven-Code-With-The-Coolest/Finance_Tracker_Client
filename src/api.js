const API_URL = 'https://redesigned-umbrella-pw5xp5669w5c9p9w-5000.app.github.dev';

export const fetchExpenses = async () => {
    const response = await fetch(`${API_URL}/expenses`);
    return response.json();
};

export const addExpense = async (expense) => {
    const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
    });
    return response.json();
};

export const deleteExpense = async (id) => {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
    });
    return response.json();
};
