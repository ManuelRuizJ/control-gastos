import { deleteExpense } from "../services/expenseService";
import React from "react";
import { useNavigate } from "react-router-dom";

function ExpenseItem({ expense, onEdit, onDelete }) {
  let navigate = null;
  try {
    navigate = useNavigate();
  } catch (error) {
    console.warn("useNavigate solo funciona dentro de un Router");
  }

  const handleDelete = async () => {
    await deleteExpense(expense.id);
    onDelete(expense.id);
    if (navigate) navigate("/");
  };

  return (
    <div className="p-4 border rounded-lg mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-bold">{expense.name}</h3>
        <p>Cantidad: ${expense.amount}</p>
        <p>Categoría: {expense.category}</p>
        <p>Fecha: {expense.date}</p>
      </div>
      <div>
        <button
          onClick={() => onEdit(expense)}
          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
