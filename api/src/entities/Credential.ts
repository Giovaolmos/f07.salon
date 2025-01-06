import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Hairdresser } from "./Hairdressers";

@Entity({
  name: "credentials",
})
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: ["user", "hairdresser"],
  })
  role: string;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => Hairdresser)
  hairdresser: Hairdresser;
}
