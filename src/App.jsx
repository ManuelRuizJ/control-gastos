import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-4">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          <img
            src={reactLogo}
            className="w-24 h-24 animate-spin-slow"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold mt-8 text-gray-800">Vite + React</h1>
      <div className="p-6 mt-6 bg-white rounded-lg shadow-lg">
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit <code className="text-blue-600">src/App.jsx</code> and save to
          test HMR
        </p>
      </div>
      <p className="mt-8 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
