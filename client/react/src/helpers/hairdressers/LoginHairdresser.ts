import axios from "axios";
import { ILoginHairdresser } from "../../interfaces/Hairdresser/ILoginHairdresser";
import { URL_BACKEND_HAIRDRESSERS } from "./getAllHairdressers";

export const loginHairdresser = async (hairdresser: ILoginHairdresser) => {
  try {
    const response = await axios.post(
      `${URL_BACKEND_HAIRDRESSERS}/login`,
      hairdresser,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data || "Error durante el inicio de sesión",
      );
    }
    throw new Error("Error inesperado durante el inicio de sesión");
  }
};
