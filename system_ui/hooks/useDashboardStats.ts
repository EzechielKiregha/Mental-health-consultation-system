"use client";

import { useState, useEffect } from "react";
import api from "../lib/api";
import { useAuth } from "@/context/AuthContext";

export interface DashboardStats {
  totalAppointments: number;
  completedAppointments: number;
  upcomingAppointments: number;
  messages: number;
}

export interface Role {
  id: number;
  name: string;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  therapistProfile: TherapistProfile
  phoneNumber: string;
  roles: string[] | Role[]; // Handle both string arrays and object arrays
}

export interface TherapistProfile {
  id: string;
  userId: string;
  bio: string;
  photoUrl: string;
  specialty: string;
  availableSlots: string; // Stored as JSON string
}

export interface ResourceBreakdownItem {
  category: string;
  count: number;
}

export interface AppointmentTrend {
  month: string;
  total: number;
  upcomingAppointments: number;
  completedAppointments: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<AppointmentTrend[]>([]);
  const [resourceData, setResourceData] = useState<ResourceBreakdownItem[]>([]);
  const [tableData, setTableData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [therapistsData, setTherapistsData ] = useState<Patient []>([]);
  
  const [therapistProfile, setTherapistProfile] = useState<TherapistProfile | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        if (user) {
          await getPatientData(user.userId);
        }
        const [statsRes, trendsRes, userRes] = await Promise.all([
          api.get<DashboardStats>("/dashboard/stats"),
          api.get<AppointmentTrend[]>("/dashboard/trends/appointments"),
          api.get<Patient[]>("/users"),
        ]);

        const resourcesRes = await api.get<Record<string, number>>(
          "/dashboard/resources-breakdown"
        );

        if(user?.role.includes("THERAPIST")){
          const profile = await api.get(`/therapists-profiles/${user?.userId}`);
          if (profile.data.message === "NO FOUND") {
            setTherapistProfile(null);
            console.log("[ERROR]: Therapist profile not found");
          } else {
            setTherapistProfile(profile.data);
          }
        }

        // Convert { articles: 5, guides: 4, exercises: 2 } →
        // [ { category: 'articles', count: 5 }, … ]
        const resourceArray = Object.entries(resourcesRes.data).map(
          ([category, count]) => ({ category, count })
        );
        setResourceData(resourceArray);

        setStats(statsRes.data);
        setChartData(trendsRes.data);

        // Filter and map patients to ensure valid data for rendering
        const filteredPatients = userRes.data.filter((patient) => {
          if (Array.isArray(patient.roles)) {
            // Handle roles as an array of strings
            if (typeof patient.roles[0] === "string") {
              return (patient.roles as string[]).includes("PATIENT");
            }
            // Handle roles as an array of objects
            if (typeof patient.roles[0] === "object" && "name" in patient.roles[0]) {
              return (patient.roles as Role[]).some((role) => role.name === "PATIENT");
            }
          }
          return false;
        });

        setTableData(filteredPatients);

        const filteredTherapists = userRes.data.filter((therapist) => {
          if (Array.isArray(therapist.roles)) {
            // Handle roles as an array of strings
            if (typeof therapist.roles[0] === "string") {
              return (therapist.roles as string[]).includes("PATIENT");
            }
            // Handle roles as an array of objects
            if (typeof therapist.roles[0] === "object" && "name" in therapist.roles[0]) {
              return (therapist.roles as Role[]).some((role) => role.name === "THERAPIST");
            }
          }
          return false;
        });

        setTherapistsData(filteredTherapists);

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [user]);

  const getPatientData = async (id: string) => {
    const res = await api.post(`/users/me?id=${id}`);
    if (res.status === 200) {
      setPatientData(res.data);
    }
  };

  return { therapistProfile, therapistsData, patientData, stats, chartData, resourceData, tableData, loading, error };
};

