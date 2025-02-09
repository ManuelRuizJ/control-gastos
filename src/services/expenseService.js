// services/expenseService.js
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
  updateDoc,
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
      timestamp: Timestamp.fromDate(new Date()), // Guarda la fecha como Timestamp
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

    if (!expenseSnap.exists()) {
      throw new Error("El gasto no existe.");
    }

    const expenseData = expenseSnap.data();
    if (expenseData.userId !== user.uid) {
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

const saveExpense = async (amount, category, description) => {
  const expenseData = {
    amount,
    category,
    description,
    date: Timestamp.fromDate(new Date()), // Guarda la fecha como Timestamp
  };
  await firestore.collection("expenses").add(expenseData);
};

export const updateExpense = async (expenseId, updatedData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No hay usuario autenticado.");

    const expenseRef = doc(db, "expenses", expenseId);
    const expenseSnap = await getDoc(expenseRef);

    if (!expenseSnap.exists() || expenseSnap.data().userId !== user.uid) {
      throw new Error("No tienes permiso para editar este gasto.");
    }

    await updateDoc(expenseRef, updatedData); // Actualiza el gasto
    console.log("Gasto actualizado con ID: ", expenseId);
  } catch (error) {
    console.error("Error al actualizar gasto: ", error);
  }
};

// Función para agregar un ingreso
export const addIncome = async (amount) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No hay usuario autenticado.");

    const docRef = await addDoc(collection(db, "incomes"), {
      amount,
      userId: user.uid,
      timestamp: Timestamp.fromDate(new Date()),
    });
    console.log("Ingreso agregado con ID: ", docRef.id);
  } catch (error) {
    console.error("Error al agregar ingreso: ", error);
  }
};

// Función para obtener los ingresos del usuario
export const getIncomes = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(collection(db, "incomes"), where("userId", "==", user.uid));
  const querySnapshot = await getDocs(q);

  const incomes = [];
  querySnapshot.forEach((doc) => {
    incomes.push({ id: doc.id, ...doc.data() });
  });
  return incomes;
};
