import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import { NewAppointment } from "./views/NewAppointment/NewAppointment";
import {
  ProtectedUserRoute,
  ProtectedHairdresserRoute,
} from "./components/ProtectedRoutes/ProtectedRoutes";
import { NavBar } from "./components/NavBar";
import LandingPage from "./views/Landing/Landing";
import Login from "./views/Login/Login";
import LoginHairdresser from "./views/LoginHairdresser/LoginHairdressers";
import RegisterUser from "./views/ResgisterUser/RegisterUser";
import Home from "./views/Home/Home";
import History from "./views/History/History";
import HomeHairdresser from "./views/HomeHairdresser/HomeHairdresser";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/iniciar-sesion-barbero" element={<LoginHairdresser />} />
        <Route path="/registrar" element={<RegisterUser />} />

        {/* Rutas protegidas para usuarios */}
        <Route element={<ProtectedUserRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/historial" element={<History />} />
          <Route path="/reservar-turno" element={<NewAppointment />} />
        </Route>

        {/* Rutas protegidas para barberos */}
        <Route element={<ProtectedHairdresserRoute />}>
          <Route path="/home-barbero" element={<HomeHairdresser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
