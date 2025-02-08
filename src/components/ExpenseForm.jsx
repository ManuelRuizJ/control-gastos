// components/ExpenseForm.jsx
import React, { useState } from "react";
import { addExpense } from "../services/expenseService";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      await addExpense(amount, category, description);
      setAmount("");
      setCategory("");
      setDescription("");
      setError("");
    } catch (error) {
      setError("Hubo un error al agregar la transacción");
    }
  };

  return (
    <div>
      <h2>Agregar Transacción</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ExpenseForm;
