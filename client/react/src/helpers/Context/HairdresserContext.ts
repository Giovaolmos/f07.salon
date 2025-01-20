import { createContext, useContext } from "react";
import { IHairdresserAuthContext } from "../../interfaces/Hairdresser/HairdresserContext";

export const HairdresserAuthContext = createContext<
  IHairdresserAuthContext | undefined
>(undefined);
export const useHairdresserAuth = () => {
  const context = useContext(HairdresserAuthContext);
  if (!context) {
    throw new Error(
      "useHairdresserAuth debe ser usado dentro de un HairdresserAuthProvider",
    );
  }
  return context;
};
