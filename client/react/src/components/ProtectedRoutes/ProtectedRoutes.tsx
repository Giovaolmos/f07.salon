import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../../helpers/Context/UserContext";
import { useHairdresserAuth } from "../../helpers/Context/HairdresserContext";

export const ProtectedUserRoute = () => {
  const { isUserAuthenticated } = useUserAuth();

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/iniciar-sesion" />;
};

export const ProtectedHairdresserRoute = () => {
  const { isHairdresserAuthenticated } = useHairdresserAuth();

  return isHairdresserAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/iniciar-sesion-barbero" />
  );
};
