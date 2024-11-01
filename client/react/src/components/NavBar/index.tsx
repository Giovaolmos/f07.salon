import { useState } from "react";

export const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header>
        <nav className="flex items-center justify-between p-4 text-white">
          <img className="rounded-full h-12 w-12" src="logo.jpeg" alt="logo" />
          <div className="hidden lg:flex ml-auto">
            <ul className="flex gap-4 items-center cursor-pointer">
              <li>Inicio</li>
              <li>Historial</li>
              <li>Nuevo Turno</li>
              <li>Home</li>
              <li className="rounded-md bg-[#b37d44] py-1 px-2 text-white hover:bg-[#dc9c57]">
                Iniciar Sesión
              </li>
              <li className="rounded-md bg-[#b56d24] py-1 px-2 text-white hover:bg-[#d68432]">
                Registrar
              </li>
            </ul>
          </div>
          <button
            className="lg:hidden ml-auto focus:outline-none text-[#FFD700]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "Cerrar" : "Menú"}
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="lg:hidden bg-[#BC8F5A] text-white p-4">
          <ul className="flex flex-col gap-2">
            <li>Inicio</li>
            <li>Historial</li>
            <li>Nuevo Turno</li>
            <li>Home</li>
            <li className="rounded-md bg-[#FFD700] py-1 px-2 text-white hover:bg-[#FFDA77]">
              Iniciar Sesión
            </li>
            <li className="rounded-md bg-[#FFD700] py-1 px-2 text-white hover:bg-[#FFDA77]">
              Registrar
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
