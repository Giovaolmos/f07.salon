import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../helpers/Context/UserContext";
import { useHairdresserAuth } from "../../helpers/Context/HairdresserContext";
import Swal from "sweetalert2";

export const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleLogout: handleUserLogout, isUserAuthenticated } = useUserAuth();
  const { handleLogout: handleHairdresserLogout, isHairdresserAuthenticated } =
    useHairdresserAuth();
  const navigate = useNavigate();

  const handleLogoutAndRedirect = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar la sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      if (isHairdresserAuthenticated) {
        handleHairdresserLogout();
        navigate("/iniciar-sesion-barbero");
      } else {
        handleUserLogout();
        navigate("/iniciar-sesion");
      }

      Swal.fire({
        title: "¡Sesión cerrada!",
        text: "Has cerrado sesión exitosamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        confirmButtonColor: "#22c55e",
      });
    }
  };

  const renderNavItems = () => {
    if (isHairdresserAuthenticated) {
      return (
        <li>
          <button
            onClick={handleLogoutAndRedirect}
            className="rounded-md px-4 py-2 text-white bg-yellow-900 hover:bg-yellow-800 inline-block"
          >
            Cerrar Sesión
          </button>
        </li>
      );
    }

    return (
      <>
        {isUserAuthenticated && (
          <li>
            <Link to="/home" className="text-white hover:text-slate-300">
              Inicio
            </Link>
          </li>
        )}
        {isUserAuthenticated && (
          <>
            <li>
              <Link to="/historial" className="text-white hover:text-slate-300">
                Historial
              </Link>
            </li>
            <li>
              <Link
                to="/reservar-turno"
                className="text-white hover:text-slate-300"
              >
                Reservar Cita
              </Link>
            </li>
          </>
        )}
        {!isUserAuthenticated ? (
          <>
            <li className="lg:mb-0 mb-2">
              <Link
                to="/iniciar-sesion"
                className="rounded-md bg-yellow-900 px-4 py-2 text-white transition hover:bg-yellow-800 inline-block"
              >
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link
                to="/registrar"
                className="rounded-md px-4 py-2 text-white bg-yellow-900 hover:bg-yellow-800 inline-block"
              >
                Registrar
              </Link>
            </li>
          </>
        ) : (
          <button
            onClick={handleLogoutAndRedirect}
            className="rounded-md px-4 py-2 text-white bg-yellow-900 hover:bg-yellow-800 inline-block"
          >
            Cerrar Sesión
          </button>
        )}
      </>
    );
  };

  return (
    <div>
      <header className="top-0 w-full bg-opacity-90 z-50 h-16">
        <nav className="flex items-center p-4">
          <img className="rounded-full size-12" src="/logo.jpeg" alt="logo" />
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
        <div className="lg:hidden text-white p-4">
          <ul className="flex flex-col gap-2">{renderNavItems()}</ul>
        </div>
      )}
    </div>
  );
};
