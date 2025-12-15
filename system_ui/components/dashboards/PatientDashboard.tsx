"use client";

import React from "react";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { useAppointments } from "@/hooks/useAppointments";
import ErrorMessage from "../ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/ReusableCard";
import DLoader from "../DataLoader";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function PatientDashboard() {
  const { patientData, loading: statsLoading, error: statsError } = useDashboardStats();
  const { appointments, error: appointmentsError, updateAppointmentStatus } = useAppointments();
  const router = useRouter()

  if (statsLoading) return <DLoader />;
  if (statsError) return <ErrorMessage message={statsError} />;
  if (appointmentsError) return <ErrorMessage message={appointmentsError} />;

  const handleConfirmAppointment = async (id: number) => {
    try {
      await updateAppointmentStatus(id, "CONFIRMED");
      alert("Appointment confirmed!");
      router.refresh()
    } catch (err) {
      alert("Failed to confirm appointment. Please try again.");
    }
  };

  const handleCancelAppointment = async (id: number) => {
    try {
      await updateAppointmentStatus(id, "CANCELLED");
      alert("Appointment canceled!");
      router.refresh()
    } catch (err) {
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Patient Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Profile Section */}
        <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-bold text-green-800">Your Profile</h2>
          <img
            src="/images/eze.jpg"
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-gray-800">Name: {patientData?.firstName} {patientData?.lastName}</p>
          <p className="text-gray-800">Email: {patientData?.email}</p>
          <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
            Update Profile
          </Button>
        </div>
        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/self-check" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
            <h2 className="text-lg font-bold text-green-800">Self-Check</h2>
          </a>
          <a href="/resources" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
            <h2 className="text-lg font-bold text-green-800">Recommended Resources</h2>
          </a>
          <a href="/chat" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
            <h2 className="text-lg font-bold text-green-800">Your Recent Chats</h2>
          </a>
          <a href="/therapists" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
            <h2 className="text-lg font-bold text-green-800">Therapists</h2>
          </a>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <h2 className="text-lg font-bold text-green-800 mb-4">Upcoming Appointments</h2>
      {appointments?.length === 0 ? (
        <p className="text-gray-800">You have no upcoming appointments.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments?.map((appointment) => (
            <Card key={appointment.id} className="bg-green-50 border border-green-600 shadow-lg">
              <CardHeader>
                <h2 className="text-lg font-bold text-green-800">Appointment Details</h2>
              </CardHeader>
              <CardBody>
                <p className="text-gray-800">
                  <span className="font-semibold">Date:</span> {appointment?.appointmentTime}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Therapist:</span> {appointment?.therapist?.firstName} {appointment.therapist?.lastName}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Status:</span> {appointment.status}
                </p>
              </CardBody>
              <CardFooter className="flex gap-4">
                {appointment.status === "SCHEDULED" && (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          Confirm
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Appointment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to confirm this appointment?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleConfirmAppointment(appointment.id)}>
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="text-red-600 border-red-600">
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleCancelAppointment(appointment.id)}>
                            Cancel
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
