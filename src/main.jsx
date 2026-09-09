import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Security from "./pages/Security/Acesso.jsx";
import Home from "./pages/home/Home.jsx"; 
import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Security />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<Security/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);