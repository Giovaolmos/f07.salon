import React, { useState } from "react";
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderNavItems = () => {
    return (
      <>
        <li>
          <Link to="/home" className="text-white hover:text-slate-300">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/historial" className="text-white hover:text-slate-300">
            Historial
          </Link>
        </li>
        <li>
          <Link to="/nuevo-turno" className="text-white hover:text-slate-300">
            Nuevo Turno
          </Link>
        </li>
        <li className="lg:mb-0 mb-2">
          <Link
            to="/iniciar-sesion"
            className="rounded-md bg-teal-600 px-4 py-2 text-white transition hover:bg-teal-500 inline-block"
          >
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link
            to="/registrar"
            className="rounded-md px-4 py-2 text-white bg-sky-500/80 hover:bg-sky-400/80 inline-block"
          >
            Registrar
          </Link>
        </li>
      </>
    );
  };

  return (
    <div>
      <header>
        <nav className="flex items-center p-4 bg-slate-800">
          <img className="rounded-full size-12" src="logo.jpeg" alt="logo" />
          <div className="hidden lg:flex ml-auto">
            <ul className="flex gap-4 items-center cursor-pointer">
              {renderNavItems()}
            </ul>
          </div>
          <button
            className="lg:hidden ml-auto focus:outline-none text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "Cerrar" : "Menú"}
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="lg:hidden bg-slate-800 text-white p-4">
          <ul className="flex flex-col gap-2">{renderNavItems()}</ul>
        </div>
      )}
    </div>
  );
};
