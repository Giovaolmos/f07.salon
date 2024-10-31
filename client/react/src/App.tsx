import "./App.css";
import { NavBar } from "./components/NavBar";
import "./index.css";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
function App() {
  return (
    <div>
      <NavBar />
      <Landing />
      <Home />
    </div>
  );
}

export default App;
