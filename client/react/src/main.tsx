import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {
  HairdresserAuthProvider,
  UserAuthProvider,
} from "./helpers/Context/authContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserAuthProvider>
      <HairdresserAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HairdresserAuthProvider>
    </UserAuthProvider>
  </StrictMode>,
);
