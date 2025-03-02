import axios from "axios";
import { ICreateAppointment } from "../../interfaces/Appointment/createAppointment";

export const URL_BACKEND_APPOINTMENTS = "http://192.168.1.41:3000/appointments";

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
    throw error;
  }
};
