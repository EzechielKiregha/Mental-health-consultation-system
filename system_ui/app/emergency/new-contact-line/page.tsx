"use client";

import DLoader from "@/components/DataLoader";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";


export default function NewContactLine() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/emergency/new-contact-line", form, {
        params: {
          userId: user?.userId
        }
      });
      alert("Emergency contact line added successfully!");
      setForm({ name: "", phoneNumber: "", description: "" });
    } catch (err) {
      setError("Failed to add contact line. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img src="/images/ba-crisis-assistance.png" alt="Emergency Contact" className="rounded-lg" />
      </div>
      <div className="bg-white border border-green-600 rounded-lg p-8 shadow-lg">
        <span className="text-gray-600 mb-4">
          <ArrowLeft className="inline mr-2" />
          <a href="/dashboard" className="text-green-600 hover:underline">
            Back to dashboard
          </a>
        </span>
        <h1 className="text-green-800 text-2xl font-bold mb-4">Add Emergency Contact Line</h1>
        {loading && <DLoader />}
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Contact Name"
            value={form.name}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
            rows={4}
          />
          <Button type="submit" className="w-full">
            Add Contact Line
          </Button>
        </form>
      </div>
    </div>
  );
}
