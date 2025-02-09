import React, { useState } from "react";
import { addExpense, getExpenses } from "../services/expenseService";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category || !description) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      // Try-catch block for better error handling
      await addExpense(amount, category, description);
      const updatedExpenses = await getExpenses();

      setAmount("");
      setCategory("");
      setDescription("");
      setError("");
      setSuccess(true);

      onExpenseAdded(updatedExpenses);

      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      // Handle errors from the service calls
      console.error("Error adding expense:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Agregar Gasto
      </h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm mb-2">
          ¡Gasto agregado correctamente!
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

      <button
        type="submit"
        className={`w-full mt-6 py-2 rounded-lg font-medium transition ${
          amount && category && description
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!amount || !category || !description}
      >
        Agregar Gasto
      </button>
    </form>
  );
};

export default ExpenseForm;
