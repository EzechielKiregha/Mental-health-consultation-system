"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
// It uses the `useState` and `useEffect` hooks to manage the state of the data, loading status, and error messages.
import { useState, useEffect } from "react";
import api from "../lib/api";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export const useEmergencyContacts = () => {
  const [data, setData] = useState<EmergencyContact[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get("/emergency");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch emergency contacts.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { data, loading, error };
};
