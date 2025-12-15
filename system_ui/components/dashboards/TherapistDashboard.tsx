"use client";

import React, { useState } from "react";
import { BarChart, CartesianGrid, XAxis, Bar, Tooltip } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import DynamicTable from '@/components/tables/DynamicTable';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/ReusableCard";
import BasePopover from "@/components/BasePopover";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ErrorMessage";

const COLORS = ['#4CAF50', '#81C784', '#C8E6C9', '#2E7D32', '#A5D6A7'];

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone Number' },
];

export default function TherapistDashboard() {
  const { stats, chartData, patientData, resourceData, tableData, therapistProfile, loading, error } = useDashboardStats();
  const { user } = useAuth();
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [form, setForm] = useState({
    bio: therapistProfile?.bio || "",
    specialty: therapistProfile?.specialty || "",
    availableSlots: therapistProfile?.availableSlots || "",
  });
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    setErrorUpdate(null);
    try {
      await api.put(`/therapists-profiles/${user?.userId}`, form);
      // alert("Profile updated successfully!");
      router.refresh();
      setIsPopoverOpen(false);
    } catch (err) {
      setErrorUpdate("Failed to update profile. Please try again.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleDelete = (selected: string[]) => {
    console.log("Deleted rows:", selected);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Therapist Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Profile Section */}
        <Card className="bg-green-50 border border-green-600 rounded-lg shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <img
                src={therapistProfile?.photoUrl || "/images/eze.jpg"}
                alt="User Avatar"
                className="w-16 h-16 rounded-full border border-green-600"
              />
              <div>
                <h2 className="text-lg font-bold text-green-800">Your Profile</h2>
                <p className="text-gray-600">{patientData?.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-gray-800">
              <span className="font-semibold">Name:</span> {patientData?.firstName} {patientData?.lastName}
            </p>
            {user?.role.includes("THERAPIST") && therapistProfile ? (
              <>
                <p className="text-gray-800">
                  <span className="font-semibold">Bio:</span> {therapistProfile.bio}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Specialty:</span> {therapistProfile.specialty}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Available Slots:</span> {therapistProfile.availableSlots}
                </p>
              </>
            ) : (
              <p className="text-gray-800">No profile data available.</p>
            )}
          </CardBody>
          <CardFooter>
            {user?.role.includes("THERAPIST") && (
              <BasePopover
                title="Update Profile"
                isOpen={isPopoverOpen}
                onClose={() => setIsPopoverOpen(false)}
                buttonLabel="Update Your Bio and Specialty"
              >
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                  {errorUpdate && <ErrorMessage message={errorUpdate} />}
                  <textarea
                    name="bio"
                    placeholder="Bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    rows={4}
                    required
                  />
                  <input
                    type="text"
                    name="specialty"
                    placeholder="Specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    required
                  />
                  <input
                    type="text"
                    name="availableSlots"
                    placeholder="Available Slots (e.g., JSON format or plain text)"
                    value={form.availableSlots}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loadingUpdate}
                    className={`w-full px-4 py-2 ${loadingUpdate
                      ? "bg-green-200 hover:bg-green-300 text-green-900"
                      : "bg-green-600 hover:bg-green-700 text-white"
                      } rounded disabled:opacity-50`}
                  >
                    {loadingUpdate ? "Updating..." : "Update"}
                  </button>
                </form>
              </BasePopover>
            )}
          </CardFooter>
        </Card>
        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/self-check/results" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
            <h2 className="text-lg font-bold text-green-800">Self-Check Results</h2>
          </a>
          <a href="/resources/upload" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
            <h2 className="text-lg font-bold text-green-800">Add Resource</h2>
          </a>
          <a href="/appointment/mine" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
            <h2 className="text-lg font-bold text-green-800">My Appointments with patients</h2>
          </a>
          <a href="/therapists/register" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
            <h2 className="text-lg font-bold text-green-800">Register A Patient</h2>
          </a>
        </div>
      </div>
      {loading ? (
        <p className="text-green-800">Loading dashboard data...</p>
      ) : error ? (
        <p className="text-red-600">Failed to load dashboard data: {error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-bold text-green-800 mb-4">Appointment Trends</h2>
              <BarChart width={500} height={300} data={chartData}>
                <XAxis dataKey="month" />
                <CartesianGrid vertical={false} />
                <Tooltip />
                <Bar dataKey="scheduled" fill="#4CAF50" />
                <Bar dataKey="completed" fill="#81C784" />
                <Bar dataKey="cancelled" fill="#C8E6C9" />
              </BarChart>
            </div>

            <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-bold text-green-800 mb-4">Resources by Category</h2>
              <PieChart width={300} height={250}>
                <Pie
                  data={resourceData}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {resourceData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
          <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-green-800 mb-4">Statistics</h2>
            <ul className="grid grid-cols-2 gap-4">
              {stats && Object.entries(stats).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-bold">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <DynamicTable
        columns={columns}
        data={tableData}
        title="Patient List"
        onDelete={handleDelete}
      />
    </div>
  );
}
