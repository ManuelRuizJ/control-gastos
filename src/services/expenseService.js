// services/expenseService.js
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

// Función para agregar un gasto
export const addExpense = async (amount, category, description) => {
  try {
    const docRef = await addDoc(collection(db, "expenses"), {
      amount,
      category,
      description,
      timestamp: new Date(),
    });
    console.log("Transacción agregada con ID: ", docRef.id);
  } catch (error) {
    console.error("Error al agregar transacción: ", error);
  }
};

// Función para eliminar un gasto
export const deleteExpense = async (expenseId) => {
  try {
    const expenseRef = doc(db, "expenses", expenseId);
    await deleteDoc(expenseRef);
    console.log("Transacción eliminada con ID: ", expenseId);
  } catch (error) {
    console.error("Error al eliminar transacción: ", error);
  }
};

// Función para obtener los gastos
export const getExpenses = async () => {
  const querySnapshot = await getDocs(collection(db, "expenses"));
  const expenses = [];
  querySnapshot.forEach((doc) => {
    expenses.push({ id: doc.id, ...doc.data() });
  });
  return expenses;
};
