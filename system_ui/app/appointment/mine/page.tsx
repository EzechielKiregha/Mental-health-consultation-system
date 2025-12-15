"use client";

import React, { useEffect, useState } from "react";
import ErrorMessage from "../../../components/ErrorMessage";
import api from "../../../lib/api";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/ReusableCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Patient } from "@/hooks/useDashboardStats";
import { useAuth } from "@/context/AuthContext";
import { useAppointments } from "@/hooks/useAppointments";
import DLoader from "@/components/DataLoader";

export default function MyAppointments() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { appointments, bookAppointment, updateAppointmentStatus } = useAppointments();


  const handleCancel = async (id: number) => {
    try {
      await api.delete(`/appointments/${id}`);

      alert("Appointment canceled successfully.");
    } catch {
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <span className="text-gray-600 mb-4">
        <ArrowLeft className="inline mr-2" />
        <a href="/dashboard" className="text-green-600 hover:underline">
          Back to dashboard
        </a>
      </span>
      <h1 className="text-2xl font-bold text-green-800 mb-4">My Appointments</h1>
      {loading ? (
        <DLoader message="Loading appointments..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : appointments?.length === 0 ? (
        <p className="text-gray-800">You have no appointments.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments?.map((appointment) => (
            <Card key={appointment.id} className="bg-green-50 border border-green-600 shadow-lg">
              <CardHeader>
                <h2 className="text-lg font-bold text-green-800">Appointment</h2>
              </CardHeader>
              <CardBody>
                <p className="text-gray-800">
                  <span className="font-semibold">Time:</span> {appointment.appointmentTime}
                </p>
                <p className="text-gray-800">
                  user?.role.includes("PATIENT") ? (
                  <span className="font-semibold">Therapist:</span> {appointment.therapist.firstName} {appointment.therapist.lastName}
                  ):(
                  <span className="font-semibold">Patient:</span> {appointment.user.firstName} {appointment.user.lastName}
                  )
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Status:</span> {appointment.status}
                </p>
              </CardBody>
              <CardFooter>
                {appointment.status === "SCHEDULED" && (
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel Appointment
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
