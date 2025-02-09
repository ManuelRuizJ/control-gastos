import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // ✅ Asegúrate de importar createRoot correctamente
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* ✅ Asegúrate de envolver la app con BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
