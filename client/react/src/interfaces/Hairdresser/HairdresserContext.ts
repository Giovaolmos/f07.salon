import { IHairdresser } from "./Hairdresser";

export interface IHairdresserAuthContext {
  hairdresser: IHairdresser | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  isHairdresserAuthenticated: boolean;
}
