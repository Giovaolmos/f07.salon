import axios, { AxiosError } from "axios";

export const URL_BACKEND_HAIRDRESSERS = "http://localhost:3000/hairdressers";

export const getAllHairdressers = async () => {
  try {
    const response = await axios.get(URL_BACKEND_HAIRDRESSERS);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.message;
    }
    return "Unknown error";
  }
};
