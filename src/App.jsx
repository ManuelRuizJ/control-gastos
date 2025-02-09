import React, { useState, useEffect } from "react";
import { auth } from "./services/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import { addExpense, getExpenses, addIncome } from "./services/expenseService";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [newIncome, setNewIncome] = useState(""); // Estado para el nuevo ingreso

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Logout automático cada 10 minutos
  useEffect(() => {
    if (user) {
      const logoutTimer = setTimeout(() => {
        signOut(auth);
        console.log("Se cerró sesión automáticamente.");
      }, 600000); // 10 minutos

      return () => clearTimeout(logoutTimer);
    }
  }, [user]);

  // Obtener los gastos al cargar el componente
  useEffect(() => {
    if (user) {
      const fetchExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data);
      };
      fetchExpenses();
    }
  }, [user]);

  // Agregar un nuevo gasto
  const addExpenseHandler = async (newExpense) => {
    await addExpense(
      newExpense.amount,
      newExpense.category,
      newExpense.description
    );
    setExpenses(await getExpenses()); // Recargar lista desde Firebase
  };

  // Agregar un nuevo ingreso
  const addIncomeHandler = async () => {
    if (newIncome) {
      await addIncome(parseFloat(newIncome));
      setNewIncome(""); // Limpiar el campo de ingreso
      setExpenses(await getExpenses()); // Recargar lista desde Firebase
    }
  };

  if (!user) {
    return showRegister ? (
      <Register onRegister={() => setShowRegister(false)} />
    ) : (
      <Login
        onLogin={() => setShowRegister(false)}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Cabecera */}
      <header className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          💰 Control de Gastos
        </h1>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Cerrar Sesión
        </button>
      </header>

      {/* Contenido principal */}
      <div className="w-full max-w-3xl space-y-6 mt-6">
        {/* Formulario para agregar ingresos */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Agregar Ingreso
          </h2>
          <div className="flex space-x-3">
            <input
              type="number"
              placeholder="Monto del ingreso"
              value={newIncome}
              onChange={(e) => setNewIncome(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addIncomeHandler}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Agregar
            </button>
          </div>
        </div>

        <ExpenseForm addExpense={addExpenseHandler} />
        <ExpenseList expenses={expenses} />
        <Summary expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
