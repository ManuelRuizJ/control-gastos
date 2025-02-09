import React, { useState, useEffect } from "react";
import {
  addExpense,
  updateExpense,
  getExpenses,
} from "../services/expenseService";

const ExpenseForm = ({ onExpenseAdded, expense, onCancel }) => {
  const [amount, setAmount] = useState(expense ? expense.amount : "");
  const [category, setCategory] = useState(expense ? expense.category : "");
  const [description, setDescription] = useState(
    expense ? expense.description : ""
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const categories = [
    "Alimentación",
    "Transporte",
    "Entretenimiento",
    "Salud",
    "Educación",
    "Otros",
  ];

  // Efecto para actualizar el estado cuando el gasto cambia
  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setCategory(expense.category);
      setDescription(expense.description);
    } else {
      setAmount("");
      setCategory("");
      setDescription("");
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category || !description) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (expense) {
        // Modo edición: Actualizar el gasto existente
        await updateExpense(expense.id, { amount, category, description });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        // Modo creación: Agregar un nuevo gasto
        await addExpense(amount, category, description);
        setAmount("");
        setCategory("");
        setDescription("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }

      // Recargar la lista de gastos
      const updatedExpenses = await getExpenses();
      onExpenseAdded(updatedExpenses);
    } catch (err) {
      console.error("Error al guardar el gasto:", err);
      setError("Hubo un error al guardar el gasto. Inténtalo de nuevo.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {expense ? "Editar Gasto" : "Agregar Gasto"}
      </h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm mb-2">
          {expense
            ? "¡Gasto actualizado correctamente!"
            : "¡Gasto agregado correctamente!"}
        </p>
      )}

      <div>
        <label className="block text-gray-600 font-medium mb-1">Monto</label>
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-600 font-medium mb-1">
          Categoría
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Seleccione una categoría
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-gray-600 font-medium mb-1">
          Descripción
        </label>
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex space-x-3 mt-6">
        <button
          type="submit"
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            amount && category && description
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!amount || !category || !description}
        >
          {expense ? "Actualizar" : "Agregar"}
        </button>
        {expense && ( // Mostrar botón de cancelar solo en modo edición
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cerrar
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
