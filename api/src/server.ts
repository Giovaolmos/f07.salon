import express from "express";
import cors from "cors";
import morgan from "morgan";
import { indexRouter } from "./routes/indexRouter";

export const server = express();

server.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
server.use(express.json());
server.use(morgan("dev"));
server.use(indexRouter);
