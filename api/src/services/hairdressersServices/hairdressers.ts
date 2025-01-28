import { FindOneOptions } from "typeorm";
import {
  appointmentModel,
  hairdresserModel,
  userModel,
} from "../../config/typeorm";
import { Hairdresser } from "../../entities/Hairdressers";
import { hairdresserDto } from "../../dtos/hairdressers.Dto";
import { Credential } from "../../entities/Credential";
import { createCredentialService } from "../credentialsServices/credentials";
import { Appointment } from "../../entities/Appointment";

export const getAllHairdressersService = async (): Promise<Hairdresser[]> => {
  const hairdressers: Hairdresser[] = await hairdresserModel.find({
    relations: { appointments: true },
  });
  if (hairdressers.length === 0)
    throw new Error("No hairdressers found in the database");
  else return hairdressers;
};

export const getHairdresserByIdService = async (
  id: number,
): Promise<Hairdresser | null> => {
  const options: FindOneOptions<Hairdresser> = {
    where: { id },
    relations: ["appointments"],
  };
  const hairdresser = await hairdresserModel.findOne(options);
  if (hairdresser) return hairdresser;
  else {
    throw new Error("This ID doesn't belong to a hairdresser");
  }
};

export const getAppointmentsByHairdresserIdService = async (
  id: number,
): Promise<Appointment[]> => {
  const appointments: Appointment[] = await appointmentModel.find({
    where: { hairdresser: { id } },
    relations: ["hairdresser", "user"],
  });
  if (appointments.length === 0)
    throw new Error("No tienes citas hasta el momento");
  return appointments;
};

export const registerHairdresserService = async (
  hairdresserData: hairdresserDto,
) => {
  const newHairdresser: Hairdresser = hairdresserModel.create(hairdresserData);

  const newCredential: Credential = await createCredentialService({
    username: hairdresserData.username,
    password: hairdresserData.password,
    role: "hairdresser",
  });

  newHairdresser.credentials = newCredential;
  const result = await hairdresserModel.save(newHairdresser);
  return result;
};

export const loginHairdresserService = async (
  credentials: number,
): Promise<Hairdresser | null> => {
  const hairdresser = await hairdresserModel.findOneBy({
    credentials: { id: credentials },
  });
  return hairdresser;
};
