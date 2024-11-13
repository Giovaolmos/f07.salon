import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";
import "./index.css";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
