import { FindOneOptions } from "typeorm";
import { appointmentModel, userModel } from "../../config/typeorm";
import { User } from "../../entities/User";
import { createCredentialService } from "../credentialsServices/credentials";
import { userDto } from "../../dtos/userDto";
import { Credential } from "../../entities/Credential";
import { Appointment } from "../../entities/Appointment";

export const getAllUsersService = async (): Promise<User[]> => {
  const users: User[] = await userModel.find({
    relations: { appointments: true },
  });
  if (users.length === 0) throw new Error("No users found in the database");
  else return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const options: FindOneOptions<User> = {
    where: { id },
    relations: ["appointments"],
  };

  const user = await userModel.findOne(options);
  if (user) return user;
  else {
    throw new Error("This ID doesn't belong to a user");
  }
};

export const getAppointmentsByUserIdService = async (
  id: number,
): Promise<Appointment[]> => {
  const appointments: Appointment[] = await appointmentModel.find({
    where: { user: { id } },
    relations: ["hairdresser", "user"],
  });
  if (appointments.length === 0)
    throw new Error("No posees citas hasta el momento");
  return appointments;
};

export const registerUserService = async (userData: userDto) => {
  const existingUser = await userModel.findOne({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new Error("This email is already registered to an existing account");
  }

  const newUser: User = await userModel.create(userData);

  const newCredential: Credential = await createCredentialService({
    username: userData.username,
    password: userData.password,
    role: "user",
  });

  newUser.credentials = newCredential;
  const result = await userModel.save(newUser);
  return result;
};

export const loginUserService = async (
  credentials: number,
): Promise<User | null> => {
  const findUser: User | null = await userModel.findOneBy({
    credentials: { id: credentials },
  });
  return findUser;
};
