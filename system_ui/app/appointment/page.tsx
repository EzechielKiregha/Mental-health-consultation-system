"use client";

import React, { useState } from "react";
import RequireAuth from "../../components/RequireAuth";
import { useAppointments } from "../../hooks/useAppointments";
import ErrorMessage from "../../components/ErrorMessage";
import Hero from "@/components/Hero";
import AlertDialog from "@/components/ui/AlertDialog";
import DLoader from "@/components/DataLoader";

export default function AppointmentPage() {
  const { appointments, error, bookAppointment, updateAppointmentStatus } = useAppointments();
  const [newAppointment, setNewAppointment] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleBook = async () => {
    if (newAppointment.trim()) {
      await bookAppointment({ details: newAppointment });
      setNewAppointment("");
    }
  };

  if (!appointments) return <DLoader />;
  if (error) return <ErrorMessage message="Failed to load appointments." />;

  return (
    <RequireAuth>
      <Hero
        title="Mental Health Appointments"
        subtitle="Book and manage your mental health appointments easily."
        imageSrc="/images/Mental-Health-consultation.jpg"
        reverse={false}
        ctaText="Get Started"
        ctaLink="/appointment/#appointments"
      />
      <div id="appointments" className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Appointments</h1>
        <ul className="space-y-4">
          {appointments?.map((appointment: any) => (
            <li key={appointment.id} className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
              <p className="text-gray-800">{appointment.details}</p>
              <AlertDialog
                title="Mark Appointment as Completed"
                description="Are you sure you want to mark this appointment as completed?"
                onConfirm={() => updateAppointmentStatus(appointment.id, "completed")}
              >
                <button className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                  Mark as Completed
                </button>
              </AlertDialog>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            value={newAppointment}
            onChange={(e) => setNewAppointment(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full focus:border-green-600 focus:ring-1 focus:ring-green-600"
            placeholder="New appointment details..."
          />
          <button onClick={handleBook} className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
            Book Appointment
          </button>
        </div>
      </div>
    </RequireAuth>
  );
}
