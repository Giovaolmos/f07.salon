import { ReactNode, useState, useEffect } from "react";
import { User } from "../../interfaces/User/User";
import { loginUser } from "../users/LoginUser";
import { UserAuthContext } from "./UserContext";
import { IHairdresser } from "../../interfaces/Hairdresser/Hairdresser";
import { HairdresserAuthContext } from "./HairdresserContext";
import { loginHairdresser } from "../hairdressers/LoginHairdresser";

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsUserAuthenticated(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await loginUser({ username, password });
      setUser(response.user);
      setIsUserAuthenticated(true);
      localStorage.setItem("userData", JSON.stringify(response.user));
      return response;
    } catch (error) {
      setUser(null);
      setIsUserAuthenticated(false);
      localStorage.removeItem("userData");
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setIsUserAuthenticated(false);
  };
  return (
    <UserAuthContext.Provider
      value={{ user, handleLogin, handleLogout, isUserAuthenticated }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const HairdresserAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [hairdresser, setHairdresser] = useState<IHairdresser | null>(null);
  const [isHairdresserAuthenticated, setIsHairdresserAuthenticated] =
    useState(false);

  useEffect(() => {
    const storedHairdresser = localStorage.getItem("hairdresserData");
    if (storedHairdresser) {
      const hairdresserData = JSON.parse(storedHairdresser);
      setHairdresser(hairdresserData);
      setIsHairdresserAuthenticated(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await loginHairdresser({ username, password });
      setHairdresser(response.hairdresser);
      setIsHairdresserAuthenticated(true);
      localStorage.setItem(
        "hairdresserData",
        JSON.stringify(response.hairdresser),
      );
      return response;
    } catch (error) {
      setHairdresser(null);
      setIsHairdresserAuthenticated(false);
      localStorage.removeItem("hairdresserData");
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hairdresserData");
    setHairdresser(null);
    setIsHairdresserAuthenticated(false);
  };

  return (
    <HairdresserAuthContext.Provider
      value={{
        hairdresser,
        handleLogin,
        handleLogout,
        isHairdresserAuthenticated,
      }}
    >
      {children}
    </HairdresserAuthContext.Provider>
  );
};
