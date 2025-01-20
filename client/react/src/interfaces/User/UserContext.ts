import { ILoginUserResponse } from "./ILoginUser";
import { User } from "./User";

export interface IUserAuthContext {
  user: User | null;
  handleLogin: (
    username: string,
    password: string,
  ) => Promise<ILoginUserResponse>;
  handleLogout: () => void;
  isUserAuthenticated: boolean;
}
