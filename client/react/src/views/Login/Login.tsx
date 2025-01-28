import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { useUserAuth } from "../../helpers/Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, isUserAuthenticated } = useUserAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/home");
    }
  }, [isUserAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "Iniciando sesión...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await handleLogin(username, password);
      if (response.login && response.login === true) {
        await Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Hola ${response.user.name}`,
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/home");
      }
      Swal.close();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error ? error.message : "Error al iniciar sesión",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center w-full">
      <div className="bg-gradient-to-br from-yellow-900/80 to-yellow-800/60 rounded-xl p-6 max-w-lg w-full shadow-xl backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          INICIO DE SESIÓN CLIENTES
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <a
              href="/registrar"
              className="text-xs text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Crear cuenta
            </a>
          </div>
          <div className="flex items-center justify-between mb-4">
            <a
              href="/iniciar-sesion-barbero"
              className="text-xs text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar como barbero
            </a>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
