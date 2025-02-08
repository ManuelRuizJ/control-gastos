import React, { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { getExpenses, deleteExpense } from "../services/expenseService";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses(); // Obtiene solo los gastos del usuario logueado
      setExpenses(data);
    };
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <div>
      <h2>Lista de Gastos</h2>
      {expenses.length === 0 ? (
        <p>No tienes gastos registrados.</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;
