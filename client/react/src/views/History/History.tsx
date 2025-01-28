import { useEffect, useState } from "react";
import { getAppointmentsByUser } from "../../helpers/users/getAppointmentsByUser";
import { Appointment } from "../../interfaces/Appointment/Appointment";
import { cancelAppointment } from "../../helpers/appointments/cancelAppointment";
import Swal from "sweetalert2";

const History = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      // Diálogo de confirmación
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cancelar cita",
        cancelButtonText: "No, mantener cita",
      });

      // Solo proceder si el usuario confirmó
      if (result.isConfirmed) {
        await cancelAppointment(appointmentId);
        const userData = localStorage.getItem("userData");
        if (!userData)
          throw new Error("No se encontró información del usuario");
        const { id } = JSON.parse(userData);
        const updatedAppointments = await getAppointmentsByUser(id);
        setAppointments(updatedAppointments);

        // Alerta de éxito
        await Swal.fire({
          icon: "success",
          title: "¡Cita cancelada!",
          text: "La cita ha sido cancelada exitosamente",
          confirmButtonColor: "#22c55e",
        });
      }
    } catch (error) {
      // Alerta de error
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error ? error.message : "Error al cancelar la cita",
        confirmButtonColor: "#d33",
      });
      setError(
        error instanceof Error ? error.message : "Error al cancelar la cita",
      );
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem("userData");
        if (!userData) {
          throw new Error("No se encontró información del usuario");
        }

        const { id } = JSON.parse(userData);
        const data = await getAppointmentsByUser(id);
        setAppointments(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error al cargar las citas",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-gradient-to-br from-yellow-900/80 to-yellow-800/60 rounded-xl p-6 max-w-lg w-full shadow-xl backdrop-blur-sm">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-yellow-800/60 p-3">
              <svg
                className="w-8 h-8 text-yellow-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">{error}</h3>
            <button
              onClick={() => (window.location.href = "/reservar-turno")}
              className="mt-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg transition-colors duration-200 ease-in-out flex items-center gap-2"
            >
              <span>Reservar una cita</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        HISTORIAL DE CITAS
      </h1>
      {appointments.length === 0 ? (
        <div className="text-center bg-yellow-800/60 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-white text-xl mb-2">No tienes citas programadas</p>
          <p className="text-yellow-200 text-md">
            ¡Programa tu primera cita con nosotros y comienza a disfrutar de
            nuestros servicios!
          </p>
        </div>
      ) : (
        <div>
          {/* Vista de escritorio */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-yellow-800/60 rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-yellow-700">
                  <th className="px-6 py-4 text-left text-yellow-200 font-semibold">
                    Barbero
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-200 font-semibold">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-200 font-semibold">
                    Hora
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-200 font-semibold">
                    Servicio
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-200 font-semibold">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-200 font-semibold">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-200 font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-yellow-700/50 hover:bg-yellow-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={appointment.hairdresser.img}
                          alt={appointment.hairdresser.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <span className="text-white font-semibold">
                          {appointment.hairdresser.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-white">{appointment.time}</td>
                    <td className="px-6 py-4 text-white">
                      {appointment.description}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          appointment.status === "Activo"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-semibold">
                        ${appointment.hairdresser.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {appointment.status === "Activo" && (
                        <button
                          onClick={() =>
                            handleCancelAppointment(appointment.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                        >
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista móvil */}
          <div className="md:hidden space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-yellow-800/60 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={appointment.hairdresser.img}
                    alt={appointment.hairdresser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="text-white font-semibold">
                    {appointment.hairdresser.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-yellow-200">Fecha:</p>
                    <p className="text-white">
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-yellow-200">Hora:</p>
                    <p className="text-white">{appointment.time}</p>
                  </div>
                  <div>
                    <p className="text-yellow-200">Servicio:</p>
                    <p className="text-white">{appointment.description}</p>
                  </div>
                  <div>
                    <p className="text-yellow-200">Estado:</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        appointment.status === "Activo"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-yellow-200">Precio:</p>
                    <span className="text-green-400 font-semibold">
                      ${appointment.hairdresser.price}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  {appointment.status === "Activo" && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors w-full"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
