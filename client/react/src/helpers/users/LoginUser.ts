import axios from "axios";
import { ILoginUser } from "../../interfaces/User/ILoginUser";

export const URL_BACKEND_USERS = "http://192.168.1.41:3000/users";

export const loginUser = async (user: ILoginUser) => {
  try {
    const response = await axios.post(`${URL_BACKEND_USERS}/login`, user);
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
