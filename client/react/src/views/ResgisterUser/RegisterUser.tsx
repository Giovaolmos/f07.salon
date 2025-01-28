import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IRegisterUser } from "../../interfaces/User/IRegisterUser";
import { registerUser } from "../../helpers/users/RegisterUser";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegisterUser>({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "Registrando usuario...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await registerUser(formData);
      if (response) {
        await Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Tu cuenta ha sido creada correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/iniciar-sesion");
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error ? error.message : "Error al registrar usuario",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full pt-10">
      <div className="bg-yellow-800/90 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          REGISTRO DE USUARIO
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="birthdate"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="birthdate"
              value={formData.birthdate}
              onChange={(e) =>
                setFormData({ ...formData, birthdate: e.target.value })
              }
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nDni"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              DNI
            </label>
            <input
              type="text"
              id="nDni"
              value={formData.nDni}
              onChange={(e) =>
                setFormData({ ...formData, nDni: e.target.value })
              }
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              placeholder="Ingresa tu número de DNI"
              required
            />
          </div>

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
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              placeholder="Confirma tu contraseña"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <a
              href="/iniciar-sesion"
              className="text-xs text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
