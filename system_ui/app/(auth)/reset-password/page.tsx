"use client";

import React, { useState } from "react";
import api from "../../../lib/api";
import { useRouter } from "next/navigation";
import ErrorMessage from "../../../components/ErrorMessage";
import Button from "../../../components/Button";
import DLoader from "@/components/DataLoader";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/reset-password", null, {
        params: {
          email: form.email,
          newPassword: form.newPassword
        }
      });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img src="/mental-health-awareness.jpg" alt="Reset Password Illustration" className="rounded-lg" />
      </div>
      <div className="bg-white border border-green-600 rounded-lg p-8 shadow-lg">
        <h1 className="text-green-800 text-2xl font-bold mb-4">Reset Password</h1>
        {loading && <DLoader />}
        {error && <ErrorMessage message={error} />}
        {success && (
          <p className="text-green-600 mb-4">
            Password reset successfully! Redirecting...
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
