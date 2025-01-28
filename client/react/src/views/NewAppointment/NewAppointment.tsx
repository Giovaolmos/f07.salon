import React, { useState, useEffect } from "react";
import { createAppointment } from "../../helpers/appointments/createAppointment";
import { ICreateAppointment } from "../../interfaces/Appointment/createAppointment";
import { User } from "../../interfaces/User/User";
import { IHairdresser } from "../../interfaces/Hairdresser/Hairdresser";
import axios from "axios";
import { URL_BACKEND_HAIRDRESSERS } from "../../helpers/hairdressers/getAllHairdressers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const NewAppointment = () => {
  const navigate = useNavigate();

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14);

  const [appointmentData, setAppointmentData] = useState<ICreateAppointment>(
    () => {
      const userFromStorage = JSON.parse(
        localStorage.getItem("user") || "{}",
      ) as User;

      return {
        date: today.toISOString().split("T")[0],
        time: "",
        description: "",
        userId: Number(userFromStorage.id),
        hairdresserId: 0,
      };
    },
  );

  const [hairdressers, setHairdressers] = useState<IHairdresser[]>([]);

  useEffect(() => {
    const fetchHairdressers = async () => {
      try {
        const response = await axios.get(`${URL_BACKEND_HAIRDRESSERS}`);
        setHairdressers(response.data);
      } catch (error) {
        console.error("Error al cargar peluqueros:", error);
      }
    };
    fetchHairdressers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createAppointment(appointmentData);
      Swal.fire({
        icon: "success",
        title: "¡Turno creado!",
        text: "Tu turno ha sido reservado exitosamente",
        confirmButtonColor: "#d97706",
      }).then(() => {
        navigate("/historial");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "Hubo un problema al crear el turno. Por favor, intenta nuevamente.",
        confirmButtonColor: "#d97706",
      });
      console.error("Error al crear el turno:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === "hairdresser") {
      setAppointmentData({
        ...appointmentData,
        hairdresserId: parseInt(e.target.value),
      });
    } else {
      setAppointmentData({
        ...appointmentData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const horasDisponibles = [];
  for (let hora = 9; hora <= 20; hora++) {
    horasDisponibles.push(`${hora.toString().padStart(2, "0")}:00`);
    horasDisponibles.push(`${hora.toString().padStart(2, "0")}:30`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-yellow-800/90 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          NUEVO TURNO
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="hairdresser"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Peluquero
            </label>
            <select
              id="hairdresser"
              name="hairdresser"
              onChange={handleInputChange}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              required
            >
              <option value="">Selecciona un peluquero</option>
              {hairdressers.map((hairdresser) => (
                <option key={hairdresser.id} value={hairdresser.id}>
                  {hairdresser.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointmentData.date}
              onChange={handleInputChange}
              min={today.toISOString().split("T")[0]}
              max={maxDate.toISOString().split("T")[0]}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Hora
            </label>
            <select
              id="time"
              name="time"
              value={appointmentData.time}
              onChange={handleInputChange}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none max-h-32 overflow-y-auto"
              size={5}
              required
            >
              <option value="">Selecciona una hora</option>
              {horasDisponibles.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-500 dark:text-gray-100 mb-2"
            >
              Servicio
            </label>
            <select
              id="description"
              name="description"
              value={appointmentData.description}
              onChange={handleInputChange}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-100 focus:outline-none"
              required
            >
              <option value="">Selecciona un servicio</option>
              <option value="Corte de Cabello">Corte de Cabello</option>
              <option value="Arreglo de Barba">Arreglo de Barba</option>
              <option value="Servicio Completo">Servicio Completo</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reservar Turno
          </button>
        </form>
      </div>
    </div>
  );
};
