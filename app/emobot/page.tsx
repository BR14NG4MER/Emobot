import React from "react";
import Sidebar from "../components/Sidebar";
import Chatbot from "../components/Chatbot";

export default function Emobot() {
  return (
    <div className="flex h-screen">
      {/* Sidebar ocupa un ancho fijo */}
      <div className="w-64 bg-gray-100">
        <Sidebar />
      </div>

      {/* Chatbot ocupa el resto del espacio disponible */}
      <div className="flex-1 bg-sky-500 justify-items-center content-center">
        <Chatbot />
      </div>
    </div>
  );
}
