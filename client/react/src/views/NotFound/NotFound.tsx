import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-9xl font-bold text-white">404</h1>
      <h2 className="text-2xl font-semibold text-amber-50 mb-4">
        Página no encontrada
      </h2>
      <p className="text-amber-100 mb-8">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-amber-800 text-white rounded hover:bg-amber-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
