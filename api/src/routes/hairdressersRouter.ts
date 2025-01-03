import { Router } from "express";
import {
  getAllHairdressersController,
  getHairdresserByIdController,
  registerHairdresserController,
} from "../controllers/hairdressersController";
import { registerHairdresserMiddleware } from "../middlewares/hairdressersMiddlewares";

export const hairdressersRouter: Router = Router();

hairdressersRouter.get("/", getAllHairdressersController);

hairdressersRouter.get("/:id", getHairdresserByIdController);

hairdressersRouter.post(
  "/register",
  registerHairdresserMiddleware,
  registerHairdresserController,
);
