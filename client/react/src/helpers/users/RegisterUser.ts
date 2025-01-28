import axios from "axios";
import { IRegisterUser } from "../../interfaces/User/IRegisterUser";
import { URL_BACKEND_USERS } from "./LoginUser";

export const registerUser = async (user: IRegisterUser) => {
  try {
    const response = await axios.post(`${URL_BACKEND_USERS}/register`, user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
    throw new Error("Error inesperado al crear el usuario");
  }
};
