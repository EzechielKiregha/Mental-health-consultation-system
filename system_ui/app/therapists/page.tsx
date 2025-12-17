"use client";

import React, { useState } from "react";
import { useTherapistProfiles } from "../../hooks/useTherapistProfiles";
import { useAuth } from "../../context/AuthContext";
import ErrorMessage from "../../components/ErrorMessage";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/ReusableCard";
import { Button } from "@/components/ui/button";
import BasePopover from "@/components/BasePopover";
import { DatePickerWithPresets } from "@/components/ui/DatePickerWithPresets";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import Hero from "@/components/Hero";
import DLoader from "@/components/DataLoader";

export default function TherapistsPage() {
  const { therapistsData, loading, error } = useDashboardStats();

  const { user } = useAuth();
  const router = useRouter();
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [errorBooking, setErrorBooking] = useState<string | null>(null);
  const [PopoverOpen, setPopoverOpen] = useState(false);


  const handleStartChat = async (therapistId: number) => {
    try {
      const response = await api.post(`/chat/start?userId=${user?.userId}&therapistId=${therapistId}`);
      const chatSession = response.data;
      router.push(`/chat/${chatSession.id}`);
    } catch (err) {
      console.error("Failed to start chat session:", err);
    }
  };

  console.log("User ID:", user?.userId);
  const userID = Number(user?.userId);
  console.log("user ID from therapist data:", therapistsData?.map(t => t.id));

  const handleBookAppointment = async () => {
    if (!selectedTherapist || !appointmentDate) {
      setErrorBooking("Please select a therapist and a date.");
      return;
    }
    setLoadingBooking(true);
    setErrorBooking(null);
    try {
      await api.post(`/appointments/book`, null, {
        params: {
          userId: user?.userId,
          therapistId: selectedTherapist,
          appointmentTime: appointmentDate.toISOString(),
        }

      });
      alert("Appointment booked successfully!");
      setPopoverOpen(false);
      setSelectedTherapist(null);
      setAppointmentDate(null);
    } catch (err) {
      setErrorBooking("Failed to book appointment. Please try again.");
    } finally {
      setLoadingBooking(false);

    }
  };

  if (loading) return <DLoader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Hero
        title="Mental Health Therapist & Appointments"
        subtitle="Book and manage your mental health appointments easily."
        imageSrc="/images/Mental-Health-consultation.jpg"
        reverse={false}
        ctaText="Start Chat 0r Book Appointment"
        ctaLink="/therapists/#thera" />
      <div id="thera" className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Therapists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {therapistsData?.map((therapist) => {
            return (
              <Card key={therapist.id} className="bg-green-50 border border-green-600 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={therapist?.therapistProfile?.photoUrl || "/images/eze.jpg"}
                      alt={`${therapist?.firstName} ${therapist?.lastName}`}
                      className="w-16 h-16 rounded-full border border-green-600" />
                    <div>
                      <h2 className="text-lg font-bold text-green-800">{therapist?.firstName} {therapist?.lastName}</h2>
                      <p className="text-sm text-gray-600">{therapist?.therapistProfile?.specialty || "Specialty not available"}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-800">{therapist?.therapistProfile?.bio || "No bio available"}</p>
                </CardBody>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      handleStartChat(therapist.id)
                    }}
                    disabled={!therapist?.therapistProfile ? true : (therapist?.therapistProfile && userID === therapist?.id) ? true : false}
                  >
                    Chat
                  </Button>
                  {(therapist?.therapistProfile && userID !== therapist?.id) && <BasePopover
                    title="Book Appointment"
                    buttonLabel={"Book Appointment"}
                    isOpen={PopoverOpen}
                  >
                    <form className="space-y-4">
                      {errorBooking && <p className="text-red-600">{errorBooking}</p>}
                      <DatePickerWithPresets
                        onDateChange={(date) => {
                          setSelectedTherapist(therapist?.id)
                          setAppointmentDate(date)
                        }} />
                      <div className="flex items-center space-x-4">
                        <img
                          src={therapist?.therapistProfile?.photoUrl || "/images/eze.jpg"}
                          alt={`${therapist?.firstName} ${therapist?.lastName}`}
                          className="w-16 h-16 rounded-full border border-green-600" />
                        <div>
                          <h2 className="text-lg font-bold text-green-800">{therapist?.firstName} {therapist?.lastName}</h2>
                          <p className="text-sm text-gray-600">Select a date and book now ...</p>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          handleBookAppointment();
                        }}
                        disabled={loadingBooking}
                      >
                        {loadingBooking ? "Booking..." : "Confirm"}
                      </Button>
                    </form>
                  </BasePopover>}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div></>
  );
}
