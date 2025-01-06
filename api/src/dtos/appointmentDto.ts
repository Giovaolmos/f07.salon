import { Hairdresser } from "../entities/Hairdressers";
import { User } from "../entities/User";

export interface appointmentDto {
  date: Date;
  time: string;
  description: string;
  userId: User["id"];
  hairdresserId: Hairdresser["id"];
}
