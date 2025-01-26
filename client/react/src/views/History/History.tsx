import { useEffect, useState } from "react";
import { getAppointmentsByUser } from "../../helpers/users/getAppointmentsByUser";
import { Appointment } from "../../interfaces/Appointment/Appointment";

const History = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

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
                    Peluquero
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
                          appointment.status === "Active"
                            ? "bg-green-100 text-green-800"
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
                        appointment.status === "Active"
                          ? "bg-green-100 text-green-800"
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
