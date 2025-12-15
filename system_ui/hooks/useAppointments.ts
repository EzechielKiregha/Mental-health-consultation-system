"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
import useSWR from "swr";
import api from "../lib/api";
import { useAuth } from "@/context/AuthContext";
import { Patient } from "./useDashboardStats";


interface Appointment {
  id: number;
  user: Patient;
  therapist: Patient;
  appointmentTime: string;
  status: string;
}

export const useAppointments = () => {

  const { user } = useAuth();

  const { data, error, mutate } = useSWR("/appointment", async () => {
    const response = await api.get<Appointment[]>("/appointments", {
      params:{
        userId: user?.userId,
      }
    });
    return response.data;
  });

  const bookAppointment = async (details: object) => {
    await api.post("/appointments/book", details, {
      params:{
        userId: user?.userId
      }
    });
    mutate();
  };

  const updateAppointmentStatus = async (id: number, status: string) => {
    await api.post(`/appointments/update-status`, null, {
      params:{ appointmentId : id, status, userId: user?.userId }
    });
    mutate();
  };

  return { appointments: data, error, bookAppointment, updateAppointmentStatus };
};
