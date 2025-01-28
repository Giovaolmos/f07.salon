import { Router } from "express";
import {
  getAllHairdressersController,
  getAppointmentsByHairdresserIdController,
  getHairdresserByIdController,
  loginHairdresserController,
  registerHairdresserController,
} from "../controllers/hairdressersController";
import { registerHairdresserMiddleware } from "../middlewares/hairdressersMiddlewares";

export const hairdressersRouter: Router = Router();

hairdressersRouter.get("/", getAllHairdressersController);

hairdressersRouter.get("/:id", getHairdresserByIdController);

hairdressersRouter.get(
  "/appointments/:id",
  getAppointmentsByHairdresserIdController,
);

hairdressersRouter.post(
  "/register",
  registerHairdresserMiddleware,
  registerHairdresserController,
);

hairdressersRouter.post("/login", loginHairdresserController);
