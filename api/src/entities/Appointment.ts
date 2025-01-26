import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Hairdresser } from "./Hairdressers";

@Entity({ name: "appointments" })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  time: string;

  @Column({ default: "Activo" })
  status: string;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Hairdresser, (hairdresser) => hairdresser.appointments)
  @JoinColumn()
  hairdresser: Hairdresser;
}
