import axios from "axios";
import { URL_BACKEND_APPOINTMENTS } from "./createAppointment";

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const response = await axios.put(
      `${URL_BACKEND_APPOINTMENTS}/cancel/${appointmentId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Error al cancelar el turno");
    }
    throw new Error("Error inesperado al cancelar el turno");
  }
};
