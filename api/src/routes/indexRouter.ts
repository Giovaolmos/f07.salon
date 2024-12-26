import { Router } from "express";
import { usersRouter } from "./usersRouter";
import { appointmentsRouter } from "./appointmentsRouter";
import { hairdressersRouter } from "./hairdressersRouter";

export const indexRouter: Router = Router();
indexRouter.use("/users", usersRouter);
indexRouter.use("/hairdressers", hairdressersRouter);
indexRouter.use("/appointments", appointmentsRouter);
