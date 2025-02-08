import React, { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { getExpenses } from "../services/expenseService";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses();
      setExpenses(data);
    };
    fetchExpenses();
  }, []);

  const handleDelete = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <div>
      <h2>Lista de Gastos</h2>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={handleDelete} // Pasar la función onDelete aquí
        />
      ))}
    </div>
  );
}

export default ExpenseList;
