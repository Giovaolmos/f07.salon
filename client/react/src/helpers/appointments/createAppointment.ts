import axios from "axios";
import { ICreateAppointment } from "../../interfaces/Appointment/createAppointment";

export const URL_BACKEND_APPOINTMENTS = "http://localhost:3000/appointments";

export const createAppointment = async (
  appointmentData: ICreateAppointment,
) => {
  try {
    const response = await axios.post(
      `${URL_BACKEND_APPOINTMENTS}/schedule`,
      appointmentData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Error al crear el turno");
    }
    throw new Error("Error inesperado al crear el turno");
  }
};
