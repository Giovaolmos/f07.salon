import { IHairdresser } from "../Hairdresser/Hairdresser";
import { User } from "../User/User";

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  description: string;
  status: string;
  user: User;
  credentials: number;
  hairdresser: IHairdresser;
}
