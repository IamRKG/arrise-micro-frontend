  import React from "react";
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import App from "./App.jsx";

  const root = createRoot(document.getElementById("root"));
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/product/*" element={<App />} />
        <Route path="/" element={<Navigate to="/product" replace />} />  
      </Routes>
    </BrowserRouter>
  );