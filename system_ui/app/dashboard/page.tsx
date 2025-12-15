"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import PatientDashboard from "../../components/dashboards/PatientDashboard";
import TherapistDashboard from "../../components/dashboards/TherapistDashboard";
// import AdminDashboard from "../../components/dashboards/AdminDashboard";
// import ManagerDashboard from "../../components/dashboards/ManagerDashboard";
import DLoader from "@/components/DataLoader";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return <DLoader message="User data is loading..." />;

  if (user.role.includes("THERAPIST")) {
    return <TherapistDashboard />;
    // } else if (user.role.includes("MANAGER")) {
    //   return <ManagerDashboard />;
    // } else if (user.role.includes("ADMIN")) {
    //   return <AdminDashboard />;
  } else if (user.role.includes("PATIENT")) {
    return <PatientDashboard />;
  } else {
    return <div>Unauthorized</div>;
  }
}
