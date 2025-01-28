import { IHairdresser } from "./Hairdresser";
import { ILoginHairdresserResponse } from "./ILoginHairdresser";

export interface IHairdresserAuthContext {
  hairdresser: IHairdresser | null;
  handleLogin: (
    email: string,
    password: string,
  ) => Promise<ILoginHairdresserResponse>;
  handleLogout: () => void;
  isHairdresserAuthenticated: boolean;
}
