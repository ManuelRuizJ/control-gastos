import { deleteExpense } from "../services/expenseService";
import React from "react";
import { useNavigate } from "react-router-dom";

function ExpenseItem({ expense, onEdit, onDelete }) {
  let navigate;
  try {
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  const handleDelete = async () => {
    await deleteExpense(expense.id);
    onDelete(expense.id);
    if (navigate) navigate("/");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center">
      {/* Información del gasto */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{expense.name}</h3>
        <p className="text-gray-600">
          <span className="font-medium">Cantidad:</span> ${expense.amount}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Categoría:</span> {expense.category}
        </p>
        <p className="text-gray-500 text-sm">
          <span className="font-medium">Fecha:</span>{" "}
          {new Date(expense.date).toLocaleDateString()}
        </p>
      </div>

      {/* Botones */}
      <div className="flex space-x-3">
        <button
          onClick={() => onEdit(expense)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
