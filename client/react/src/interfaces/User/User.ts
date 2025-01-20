import { Appointment } from "../Appointment/Appointment";

export interface User {
  id: string;
  email: string;
  name: string;
  birthdate: Date;
  nDni: number;
  appointments: Appointment[];
}
