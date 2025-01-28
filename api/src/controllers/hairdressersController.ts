import { Credential } from "../entities/Credential";
import { Hairdresser } from "../entities/Hairdressers";
import { validateCredential } from "../services/credentialsServices/credentials";
import {
  getAllHairdressersService,
  getAppointmentsByHairdresserIdService,
  getHairdresserByIdService,
  loginHairdresserService,
  registerHairdresserService,
} from "../services/hairdressersServices/hairdressers";
import { Request, Response } from "express";

export const getAllHairdressersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const hairdressers = await getAllHairdressersService();
    res.status(200).json(hairdressers);
  } catch (error) {
    res.status(400).json(`Error getting hairdressers ${error}`);
  }
};

export const getHairdresserByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const hairdresser = await getHairdresserByIdService(Number(id));
    res.status(200).json(hairdresser);
  } catch (error) {
    res.status(400).json(`Error getting hairdresser ${error}`);
  }
};

export const getAppointmentsByHairdresserIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const appointments = await getAppointmentsByHairdresserIdService(
      Number(id),
    );
    res.status(200).json(appointments);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export const registerHairdresserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, price, img, username, password } = req.body;
    const newHairdresser = await registerHairdresserService({
      name,
      price,
      img,
      username,
      password,
    });
    res.status(201).json(newHairdresser);
  } catch (error) {
    res.status(400).json(`Error creating hairdresser ${error}`);
  }
};

export const loginHairdresserController = async (
  req: Request,
  res: Response,
) => {
  const { username, password } = req.body;
  try {
    const hairdresserLogin: Credential = await validateCredential({
      username,
      password,
      role: "hairdresser",
    });
    const hairdresser: Hairdresser | null = await loginHairdresserService(
      hairdresserLogin.id,
    );
    res.status(200).json({ login: true, hairdresser });
  } catch (error) {
    res.status(400).json(`${error}`);
  }
};
