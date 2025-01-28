import axios from "axios";
import { URL_BACKEND_USERS } from "./LoginUser";

export const getAppointmentsByUser = async (id: number) => {
  try {
    const response = await axios.get(`${URL_BACKEND_USERS}/appointments/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al buscar las citas",
      );
    }
    throw new Error("Error inesperado al buscar las citas");
  }
};
