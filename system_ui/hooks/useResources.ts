"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
import { useState, useEffect } from "react";
import api from "../lib/api";

export interface Resource {
  id: string;
  title: string;
  content: string;
  resourceType: string;
}

export const useResources = () => {
  const [data, setData] = useState<Resource[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get("/resources");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch resources.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return { data, loading, error };
};
