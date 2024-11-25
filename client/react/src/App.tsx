import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";
import "./index.css";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
