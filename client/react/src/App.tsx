import "./App.css";
import { NavBar } from "./components/NavBar";
import "./index.css";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/bgimage.jpg')` }}
      >
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
