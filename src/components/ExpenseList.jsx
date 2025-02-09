import React, { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseForm from "./ExpenseForm";
import { getExpenses, deleteExpense } from "../services/expenseService";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null); // Estado para el gasto en edición

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses(); // Obtiene los gastos desde Firebase
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

  const handleEdit = (expense) => {
    setEditingExpense(expense); // Establece el gasto en edición
  };

  const handleUpdate = async (updatedExpense) => {
    await updateExpense(updatedExpense.id, updatedExpense); // Actualiza el gasto en Firebase
    setEditingExpense(null); // Cierra el formulario de edición
    setExpenses(await getExpenses()); // Recarga la lista de gastos
  };

  return (
    <div className="w-full max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Lista de Gastos</h2>
      {editingExpense ? ( // Muestra el formulario de edición si hay un gasto en edición
        <ExpenseForm
          expense={editingExpense}
          onExpenseAdded={handleUpdate}
          onCancel={() => setEditingExpense(null)}
        />
      ) : (
        <>
          {expenses.length === 0 ? (
            <p className="text-gray-600">No tienes gastos registrados.</p>
          ) : (
            expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}

export default ExpenseList;
