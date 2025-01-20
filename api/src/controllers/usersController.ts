import { Request, Response } from "express";
import {
  registerUserService,
  getAllUsersService,
  getUserByIdService,
  loginUserService,
  getAppointmentsByUserIdService,
} from "../services/userServices/users";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { validateCredential } from "../services/credentialsServices/credentials";
import { Appointment } from "../entities/Appointment";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users: User[] | null = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(`Error al obtener los usuarios ${error}`);
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: User | null = await getUserByIdService(Number(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(`ID no encontrado ${error}`);
  }
};

export const getAppointmentsByUserIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const appointments: Appointment[] = await getAppointmentsByUserIdService(
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

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, birthdate, nDni, username, password } = req.body;
    const newUser: User = await registerUserService({
      name,
      email,
      birthdate,
      nDni,
      username,
      password,
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    if (
      error.message === "Este email ya está registrado a una cuenta existente"
    ) {
      return res.status(409).json({ error: error.message });
    }
    res.status(400).json(`Error al crear el usuario: ${error.message}`);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userLogin: Credential = await validateCredential({
      username,
      password,
      role: "user",
    });
    const user: User | null = await loginUserService(userLogin.id);
    res.status(200).json({ login: true, user });
  } catch (error) {
    res.status(400).json(`Error al iniciar sesión ${error}`);
  }
};
