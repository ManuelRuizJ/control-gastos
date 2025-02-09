import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm"; // Asegúrate de importar el componente ExpenseForm
import { getExpenses } from "../services/expenseService"; // Función para obtener los gastos

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);

  // Obtener gastos iniciales
  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses(); // Llamada al servicio para obtener los gastos
      setExpenses(data); // Actualizar el estado con los gastos obtenidos
    };
    fetchExpenses();
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  // Función para actualizar los gastos cuando se agrega un nuevo gasto
  const handleExpenseAdded = (updatedExpenses) => {
    setExpenses(updatedExpenses); // Actualiza la lista de gastos
  };

  return (
    <div>
      <h1>Gestor de Gastos</h1>
      {/* Pasa la función handleExpenseAdded como prop */}
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.category} - ${expense.amount} - {expense.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
