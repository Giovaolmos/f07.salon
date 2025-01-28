import {
  appointmentModel,
  hairdresserModel,
  userModel,
} from "../../config/typeorm";
import { appointmentDto } from "../../dtos/appointmentDto";
import { Appointment } from "../../entities/Appointment";
import { Hairdresser } from "../../entities/Hairdressers";
import { User } from "../../entities/User";

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const appointments: Appointment[] = await appointmentModel.find();
  if (appointments.length === 0) throw new Error("There are no appointments");
  else return appointments;
};

export const getAppointmentByIdService = async (
  id: number,
): Promise<Appointment | null> => {
  const appointment = await appointmentModel.findOne({
    where: { id },
    relations: { user: true, hairdresser: true },
  });
  return appointment;
};

export const createAppointmentService = async (
  appointment: appointmentDto,
): Promise<Appointment> => {
  const user: User | null = await userModel.findOneBy({
    id: appointment.userId,
  });
  if (!user) {
    throw new Error("userId not found");
  }

  const hairdresser: Hairdresser | null = await hairdresserModel.findOneBy({
    id: appointment.hairdresserId,
  });
  if (!hairdresser) {
    throw new Error("hairdresserId not found");
  }

  const existingAppointment = await appointmentModel.findOne({
    where: {
      hairdresser: { id: appointment.hairdresserId },
      date: appointment.date,
      time: appointment.time,
      status: "Activo",
    },
  });

  if (existingAppointment) {
    throw new Error(
      "Ya existe una cita activa para este barbero en la fecha y hora seleccionada",
    );
  }

  const newAppointment: Appointment = appointmentModel.create(appointment);
  newAppointment.user = user;
  newAppointment.hairdresser = hairdresser;
  await appointmentModel.save(newAppointment);

  return newAppointment;
};

export const cancelAppointmentsService = async (
  id: number,
): Promise<Appointment> => {
  const appointment: Appointment | null = await appointmentModel.findOne({
    where: { id },
    relations: ["user", "hairdresser"],
  });
  if (!appointment) {
    throw new Error("Appointment not found");
  }
  appointment.status = "Cancelado";
  await appointmentModel.save(appointment);
  return appointment;
};
