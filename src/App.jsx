import { useState, useEffect } from "react";
import { auth } from "./services/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

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

  // Logout automático cada 10 segundos
  useEffect(() => {
    if (user) {
      const logoutTimer = setTimeout(() => {
        signOut(auth);
        console.log("Se cerró sesión automáticamente.");
      }, 1000000); // 10 segundos

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

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Control de Gastos</h1>
      <button
        onClick={() => signOut(auth)}
        className="bg-red-500 text-white p-2 rounded"
      >
        Cerrar Sesión
      </button>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} />
      <Summary expenses={expenses} />
    </div>
  );
}

export default App;
