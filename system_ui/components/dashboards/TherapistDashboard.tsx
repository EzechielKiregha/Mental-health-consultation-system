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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Therapist Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your overview</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 text-white">
              <div className="flex items-center gap-4">
                <img
                  src={therapistProfile?.photoUrl || "/images/eze.jpg"}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full border-4 border-white"
                />
                <div>
                  <h2 className="text-2xl font-bold">{patientData?.firstName} {patientData?.lastName}</h2>
                  <p className="text-green-100">{patientData?.email}</p>
                  {therapistProfile?.specialty && (
                    <p className="text-green-100 mt-1">Specialist in <span className="font-semibold">{therapistProfile.specialty}</span></p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {user?.role.includes("THERAPIST") && therapistProfile ? (
                <>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">About</p>
                    <p className="text-gray-800">{therapistProfile.bio || "No bio added yet"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Available Slots</p>
                      <p className="text-gray-800 font-semibold">{therapistProfile.availableSlots || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Status</p>
                      <p className="text-green-600 font-semibold">Available</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPopoverOpen(true)}
                    className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Update Profile
                  </button>
                </>
              ) : (
                <p className="text-gray-600 italic">No profile data available.</p>
              )}
            </div>
          </div>

          {/* Update Profile Popover */}
          {user?.role.includes("THERAPIST") && (
            <BasePopover
              title="Update Profile"
              isOpen={isPopoverOpen}
              onClose={() => setIsPopoverOpen(false)}
              buttonLabel=""
            >
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                {errorUpdate && <ErrorMessage message={errorUpdate} />}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    placeholder="Tell patients about yourself..."
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <input
                    type="text"
                    name="specialty"
                    placeholder="e.g., Depression, Anxiety"
                    value={form.specialty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Slots</label>
                  <input
                    type="text"
                    name="availableSlots"
                    placeholder="e.g., Mon-Fri 9AM-5PM"
                    value={form.availableSlots}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingUpdate}
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                    loadingUpdate
                      ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {loadingUpdate ? "Updating..." : "Save Changes"}
                </button>
              </form>
            </BasePopover>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-green-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{stats?.totalPatients || 0}</p>
                <p className="text-sm text-gray-600">Total Patients</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{stats?.totalAppointments || 0}</p>
                <p className="text-sm text-gray-600">Appointments</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{stats?.totalResources || 0}</p>
                <p className="text-sm text-gray-600">Resources Added</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <h3 className="text-xl font-bold text-green-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <a href="/self-check/results" className="group bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Self-Check Results</h2>
            <p className="text-sm text-gray-600">Review patient assessments</p>
          </a>
          <a href="/resources/upload" className="group bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">➕</span>
            </div>
            <h2 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Add Resource</h2>
            <p className="text-sm text-gray-600">Share helpful content</p>
          </a>
          <a href="/appointment/mine" className="group bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📅</span>
            </div>
            <h2 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">My Appointments</h2>
            <p className="text-sm text-gray-600">View patient sessions</p>
          </a>
          <a href="/therapists/register" className="group bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Register Patient</h2>
            <p className="text-sm text-gray-600">Add new patient</p>
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">Failed to load dashboard data: {error}</p>
          </div>
        ) : (
          <>
            {/* Charts Section */}
            <h3 className="text-xl font-bold text-green-800 mb-4">Analytics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Appointment Trends</h2>
                <div className="overflow-x-auto">
                  <BarChart width={400} height={300} data={chartData}>
                    <XAxis dataKey="month" />
                    <CartesianGrid vertical={false} stroke="#e5e7eb" />
                    <Tooltip />
                    <Bar dataKey="scheduled" fill="#4CAF50" />
                    <Bar dataKey="completed" fill="#81C784" />
                    <Bar dataKey="cancelled" fill="#C8E6C9" />
                  </BarChart>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Resources by Category</h2>
                <div className="flex justify-center">
                  <PieChart width={300} height={300}>
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
            </div>

            {/* Statistics */}
            <h3 className="text-xl font-bold text-green-800 mb-4">Key Statistics</h3>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stats && Object.entries(stats).map(([k, v]) => (
                  <div key={k} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{v}</p>
                    <p className="text-sm text-gray-600 capitalize mt-1">{k.replace(/([A-Z])/g, ' $1')}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Patient List Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <DynamicTable
            columns={columns}
            data={tableData}
            title="Patient List"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
