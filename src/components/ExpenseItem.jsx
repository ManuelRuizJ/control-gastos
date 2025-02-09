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

  // Función para formatear la fecha
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "Fecha inválida";
    const date = new Date(timestamp.seconds * 1000); // Convierte a milisegundos

    // Opciones para formatear la fecha y la hora
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Usar formato de 12 horas (AM/PM)
    };

    return date.toLocaleString("es-ES", options); // Formatea la fecha y la hora
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
          {formatDate(expense.timestamp)} {/* Usa la función formatDate */}
        </p>
      </div>

      {/* Botones */}
      <div className="flex space-x-3">
        <button
          onClick={() => onEdit(expense)} // Llama a onEdit con el gasto
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
