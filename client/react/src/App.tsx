import "./App.css";
import { NavBar } from "./components/NavBar";
import "./index.css";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import { useState } from "react";

function App() {
  const [currentView, setCurrentView] = useState("home");

  const isHome = currentView === "home";

  return (
    <div
      className={`${isHome ? "bg-cover bg-center min-h-screen" : ""}`}
      style={isHome ? { backgroundImage: `url('/bgimage.jpg')` } : {}}
    >
      <NavBar />
      {isHome ? <Home /> : <Landing />}
    </div>
  );
}

export default App;
