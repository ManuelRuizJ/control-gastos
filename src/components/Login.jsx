import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";

function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      console.error("Error en inicio de sesión:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onLogin();
    } catch (error) {
      console.error("Error en inicio con Google:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleEmailLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 mb-4"
        >
          Iniciar sesión con Correo
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-200 mb-4"
        >
          Iniciar sesión con Google
        </button>

        <div className="flex justify-center items-center mt-4">
          <p className="text-sm text-gray-600">¿No tienes cuenta?</p>
          <button
            onClick={onShowRegister}
            className="ml-2 text-sm text-orange-500 font-semibold hover:text-orange-600"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
