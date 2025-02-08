// services/expenseService.js
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { app, auth } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);

// Función para agregar un gasto
export const addExpense = async (amount, category, description) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No hay usuario autenticado.");

    const docRef = await addDoc(collection(db, "expenses"), {
      amount,
      category,
      description,
      timestamp: new Date(),
      userId: user.uid,
    });
    console.log("Gasto agregado con ID: ", docRef.id);
  } catch (error) {
    console.error("Error al agregar transacción: ", error);
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No hay usuario autenticado.");

    // Obtener el gasto antes de eliminarlo para verificar si pertenece al usuario
    const expenseRef = doc(db, "expenses", expenseId);
    const expenseSnap = await getDoc(expenseRef);

    if (!expenseSnap.exists() || expenseSnap.data().userId !== user.uid) {
      throw new Error("No tienes permiso para eliminar este gasto.");
    }

    await deleteDoc(expenseRef);
    console.log("Gasto eliminado con ID: ", expenseId);
  } catch (error) {
    console.error("Error al eliminar gasto: ", error);
  }
};

// Función para obtener los gastos
export const getExpenses = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "expenses"), where("userId", "==", user.uid));
  const querySnapshot = await getDocs(q);

  const expenses = [];
  querySnapshot.forEach((doc) => {
    expenses.push({ id: doc.id, ...doc.data() });
  });
  return expenses;
};
