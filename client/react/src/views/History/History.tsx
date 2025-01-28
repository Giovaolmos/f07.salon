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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        HISTORIAL DE CITAS
      </h1>
      {appointments.length === 0 ? (
        <p className="text-center text-white text-lg">
          No tienes citas registradas
        </p>
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
