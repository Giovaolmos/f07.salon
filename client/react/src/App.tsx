import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";
import "./index.css";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Login from "./views/Login/Login";
import LoginHairdresser from "./views/LoginHairdresser/LoginHairdressers";
import History from "./views/History/History";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="iniciar-sesion" element={<Login />} />
        <Route path="iniciar-sesion-barbero" element={<LoginHairdresser />} />
        <Route path="/historial" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
