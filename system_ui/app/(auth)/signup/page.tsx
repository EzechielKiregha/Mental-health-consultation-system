"use client";

import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import ErrorMessage from "../../../components/ErrorMessage";
import Button from "../../../components/Button";
import { useRoles } from "@/hooks/useRoles";
import DLoader from "@/components/DataLoader";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
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
      console.log("Form data before signup:", form.roleIds);
      await signup(form);
      router.push("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img src="/mental-health-awareness.jpg" alt="Signup Illustration" className="rounded-lg" />
      </div>
      <div className="bg-white border border-green-600 rounded-lg p-8 shadow-lg">
        <h1 className="text-green-800 text-2xl font-bold mb-4">Sign Up</h1>
        {loading && <DLoader />}
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
              placeholder="phone number"
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
                      disabled={role.name === "ADMIN" || role.name === "MANAGER"}
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
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-green-600 hover:underline">
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
}
