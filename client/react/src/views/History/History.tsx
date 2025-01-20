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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-yellow-800/60 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={appointment.hairdresser.img}
                    alt={appointment.hairdresser.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {appointment.hairdresser.name}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-white">
                    <span className="font-medium">Fecha:</span>
                    <span>
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span className="font-medium">Hora:</span>
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span className="font-medium">Servicio:</span>
                    <span>{appointment.description}</span>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span className="font-medium">Estado:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        appointment.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span className="font-medium">Precio:</span>
                    <span className="text-lg font-semibold text-green-400">
                      ${appointment.hairdresser.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
