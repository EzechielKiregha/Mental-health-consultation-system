"use client";

import { useState, useEffect } from "react";
import api from "../lib/api";

interface TherapistProfile {
  id: number;
  userId: number;
  specialty: string;
  bio: string;
  photoUrl: string;
  availableSlots: string[];
}

interface Therapist {
  id:number
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleIds: number[];
}

export const useTherapistProfiles = () => {
  const [profiles, setProfiles] = useState<TherapistProfile[] | null>(null);
  const [therapists, setTherapists] = useState<Therapist[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const [profilesResponse, therapistsResponse] = await Promise.all([
          api.get("/therapists-profiles"), // Fetch therapist profiles
          api.get("/users?role=THERAPIST"), // Fetch users with the "THERAPIST" role
        ]);

        setProfiles(profilesResponse.data);
        setTherapists(therapistsResponse.data);
      } catch (err) {
        setError("Failed to fetch therapist data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  return { profiles, therapists, loading, error };
};
