import { useState, useEffect } from "react";
import { auth } from "./services/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import {
  addExpense as saveExpense,
  getExpenses,
} from "./services/expenseService"; // Asegura importar funciones correctas

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [expenses, setExpenses] = useState([]);

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

  const addExpense = async (newExpense) => {
    await saveExpense(
      newExpense.amount,
      newExpense.category,
      newExpense.description
    );
    setExpenses(await getExpenses()); // Recargar lista desde Firebase
  };

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
        <ExpenseForm addExpense={addExpense} />
        <ExpenseList expenses={expenses} />
        <Summary expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
