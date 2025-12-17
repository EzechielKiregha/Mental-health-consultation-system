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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Welcome! Here's your mental health journey overview</p>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 text-white">
              <div className="flex items-center gap-4">
                <img
                  src="/images/eze.jpg"
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full border-4 border-white"
                />
                <div>
                  <h2 className="text-2xl font-bold">{patientData?.firstName} {patientData?.lastName}</h2>
                  <p className="text-green-100">{patientData?.email}</p>
                  <p className="text-green-100 text-sm mt-1">Member since joining our platform</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">-</p>
                  <p className="text-sm text-gray-600">Assessments</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">-</p>
                  <p className="text-sm text-gray-600">Appointments</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">-</p>
                  <p className="text-sm text-gray-600">Resources Saved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-green-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                ✏️ Update Profile
              </Button>
              <Button variant="outline" className="w-full justify-start border-green-200">
                🔔 Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start border-green-200">
                ⚙️ Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Main Action Links */}
        <h3 className="text-xl font-bold text-green-800 mb-4">Main Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <a href="/self-check" className="group bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📋</div>
            <h2 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Take Assessment</h2>
            <p className="text-sm text-gray-600">Mental health self-check</p>
          </a>
          <a href="/resources" className="group bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📚</div>
            <h2 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Resources</h2>
            <p className="text-sm text-gray-600">Recommended for you</p>
          </a>
          <a href="/chat" className="group bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">💬</div>
            <h2 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Chat</h2>
            <p className="text-sm text-gray-600">Your recent conversations</p>
          </a>
          <a href="/therapists" className="group bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">👨‍⚕️</div>
            <h2 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Find Therapist</h2>
            <p className="text-sm text-gray-600">Connect with professionals</p>
          </a>
        </div>

        {/* Upcoming Appointments */}
        {appointments?.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-gray-700 text-lg font-medium">No upcoming appointments</p>
            <p className="text-gray-500 mt-2">Book an appointment with a therapist to get started</p>
            <a href="/therapists">
              <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                Find a Therapist
              </Button>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments?.map((appointment) => (
              <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Status Badge */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold">Appointment</h2>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${appointment.status === "CONFIRMED" ? "bg-green-200 text-green-800" :
                        appointment.status === "SCHEDULED" ? "bg-yellow-200 text-yellow-800" :
                          "bg-red-200 text-red-800"
                      }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Date & Time</p>
                    <p className="text-gray-800 font-semibold">{appointment?.appointmentTime}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Therapist</p>
                    <p className="text-gray-800 font-semibold">{appointment?.therapist?.firstName} {appointment.therapist?.lastName}</p>
                  </div>

                  {/* Actions */}
                  {appointment.status === "SCHEDULED" && (
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm">
                            Confirm
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Appointment</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to confirm this appointment with {appointment?.therapist?.firstName} {appointment.therapist?.lastName}?
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
                          <Button variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50 text-sm">
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
                            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleCancelAppointment(appointment.id)} className="bg-red-600 hover:bg-red-700">
                              Cancel Appointment
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
