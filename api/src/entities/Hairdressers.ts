import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";

@Entity({ name: "hairdressers" })
export class Hairdresser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200 })
  img: string;

  @Column()
  price: number;

  @OneToMany(() => Appointment, (appointment) => appointment.hairdresser)
  appointments: Appointment[];
}
