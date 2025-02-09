import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// Registro con correo/contraseña
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "Users", user.uid), {
      email: user.email,
      role: "user",
      createdAt: new Date(),
    });

    console.log("User registered and saved to Firestore: ", user.uid);
    return { user, error: null };
  } catch (error) {
    console.log("Error registrando usuario: ", error.message);
    return { user: null, error: error.message };
  }
};

// Login con correo/contraseña
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userDocRef = doc(db, "Users", user.uid);
    const userDoc = await getDoc(userDocRef);
    const role = userDoc.exists() ? userDoc.data().role : null;

    return { user, role, error: null };
  } catch (error) {
    console.error("Error logging in user: ", error.message);
    return { user: null, role: null, error: error.message };
  }
};

// Login con Google
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Verificar si el usuario ya existe en Firestore
    const userDocRef = doc(db, "Users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Si el usuario no existe, guardarlo en Firestore
      await setDoc(userDocRef, {
        email: user.email,
        role: "user",
        createdAt: new Date(),
      });
    }

    return { user, error: null };
  } catch (error) {
    console.error("Error logging in with Google: ", error.message);
    return { user: null, error: error.message };
  }
};

// Logout
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
    return { user: null, error: null };
  } catch (error) {
    console.error("Error logging out user: ", error.message);
    return { error: error.message };
  }
};

export { registerUser, loginUser, loginWithGoogle, logoutUser };
