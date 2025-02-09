import React, { useState, useEffect } from "react";
import { getIncomes } from "../services/expenseService";

function Summary({ expenses }) {
  const [incomes, setIncomes] = useState([]); // Estado para los ingresos

  // Obtener los ingresos desde Firebase
  useEffect(() => {
    const fetchIncomes = async () => {
      const data = await getIncomes();
      setIncomes(data);
    };
    fetchIncomes();
  }, []);

  // Calcular el total de ingresos
  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);

  // Calcular el total por categoría
  const totalByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += parseFloat(expense.amount);
    return acc;
  }, {});

  // Calcular el total general de gastos
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount),
    0
  );

  // Calcular el dinero de sobra
  const remainingMoney = totalIncome - totalExpenses;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Resumen
      </h2>

      {/* Total de ingresos */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Total de ingresos
        </h3>
        <p className="text-gray-800 font-medium text-xl">
          ${totalIncome.toFixed(2)}
        </p>
      </div>

      {/* Total por categoría */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Total por categoría
        </h3>
        <ul className="space-y-2">
          {Object.keys(totalByCategory).map((category) => (
            <li key={category} className="flex justify-between">
              <span className="text-gray-600">{category}</span>
              <span className="text-gray-800 font-medium">
                ${totalByCategory[category].toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total general de gastos */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Total gastado
        </h3>
        <p className="text-gray-800 font-medium text-xl">
          ${totalExpenses.toFixed(2)}
        </p>
      </div>

      {/* Dinero de sobra */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Dinero de sobra
        </h3>
        <p
          className={`text-xl font-medium ${
            remainingMoney >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${remainingMoney.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default Summary;
