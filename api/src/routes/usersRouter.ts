import { Router } from "express";
import {
  getAllUsersController,
  getAppointmentsByUserIdController,
  getUserByIdController,
  loginUserController,
  registerUserController,
} from "../controllers/usersController";
import { registerUserMiddleware } from "../middlewares/registerUser";
import { loginMiddleware } from "../middlewares/loginUser";

export const usersRouter: Router = Router();

usersRouter.get("/", getAllUsersController);

usersRouter.get("/:id", getUserByIdController);

usersRouter.get("/appointments/:id", getAppointmentsByUserIdController);

usersRouter.post("/register", registerUserMiddleware, registerUserController);

usersRouter.post("/login", loginMiddleware, loginUserController);
