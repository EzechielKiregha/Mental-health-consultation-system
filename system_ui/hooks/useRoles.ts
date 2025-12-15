"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
import { useState, useEffect } from "react";
import api from "../lib/api";

interface Roles {
  id: number;
  name: string;
}

export const useRoles = () => {
  const [data, setData] = useState<Roles[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/admin/roles");
        console.log({"Roles" : response.data})
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch available Roles");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { data, loading, error };
};