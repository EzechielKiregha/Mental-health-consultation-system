"use client";

import React, { useState } from "react";
import api from "../../../lib/api";
import ErrorMessage from "../../../components/ErrorMessage";
import Button from "../../../components/Button";
import { useRoles } from "@/hooks/useRoles";
import { ArrowLeft } from "lucide-react";
import DLoader from "@/components/DataLoader";

export default function RegisterPatient() {
  const { data: roles, loading: rolesLoading, error: rolesError } = useRoles();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    roleIds: [] as number[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (roleId: number) => {
    setForm((prevForm) => {
      const roleIds = prevForm.roleIds.includes(roleId)
        ? prevForm.roleIds.filter((id) => id !== roleId)
        : [...prevForm.roleIds, roleId];
      return { ...prevForm, roleIds };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/users/register", form);
      alert("Patient registered successfully!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        roleIds: [],
      });
    } catch (err) {
      setError("Failed to register patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <span className="text-gray-600 mb-4">
        <ArrowLeft className="inline mr-2" />
        <a href="/dashboard" className="text-green-600 hover:underline">
          Back to dashboard
        </a>
      </span>
      <h1 className="text-green-800 text-2xl font-bold mb-4">Register Patient</h1>
      {loading && <DLoader message="Registering patient..." />}
      {error && <ErrorMessage message={error} />}
      {rolesError && <ErrorMessage message={rolesError} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <input
            type="phone"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />
        <div>
          <h3 className="text-green-800 font-semibold mb-2">Select Roles:</h3>
          {rolesLoading ? (
            <DLoader message="Loading roles..." />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {roles?.map((role) => (
                <div key={role.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`role-${role.id}`}
                    disabled={role.name === "ADMIN"}
                    checked={form.roleIds.includes(role.id)}
                    onChange={() => handleRoleChange(role.id)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor={`role-${role.id}`} className="text-gray-800">
                    {role.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
}
