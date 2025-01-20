import { Appointment } from "../Appointment/Appointment";

export interface IHairdresser {
  id: number;
  name: string;
  img: string;
  price: number;
  appointments: Appointment[];
}
