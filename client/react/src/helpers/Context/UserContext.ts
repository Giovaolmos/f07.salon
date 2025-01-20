import { createContext, useContext } from "react";
import { IUserAuthContext } from "../../interfaces/User/UserContext";

export const UserAuthContext = createContext<IUserAuthContext | undefined>(
  undefined,
);
export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth debe ser usado dentro de un UserAuthProvider");
  }
  return context;
};
