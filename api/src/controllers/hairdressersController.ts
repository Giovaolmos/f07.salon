import {
  getAllHairdressersService,
  getHairdresserByIdService,
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
