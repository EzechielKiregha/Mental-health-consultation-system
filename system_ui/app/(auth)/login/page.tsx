"use client";

import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import ErrorMessage from "../../../components/ErrorMessage";
import Button from "../../../components/Button";
import BasePopover from "../../../components/BasePopover";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import api from "@/lib/api";
import DLoader from "@/components/DataLoader";

export default function LoginPage() {
  const { user, login, verifyOtp } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpPopoverOpen, setOtpPopoverOpen] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Trigger login and send OTP
      await login(form.email.trim(), form.password.trim());
      if (user) setPhone(user.phoneNumber)
      setOtpPopoverOpen(true);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (phone === "") {
        setError("Phone number is not available. Please try login again.");
      }
      else {
        await verifyOtp(phone, otp);
        // Close OTP popover on success
        setOtpPopoverOpen(false)
        router.push("/dashboard")
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src="/mental-health-awareness.jpg"
          alt="Login Illustration"
          className="rounded-lg"
        />
      </div>
      <div className="bg-white border border-green-600 rounded-lg p-8 shadow-lg">
        <h1 className="text-green-800 text-2xl font-bold mb-4">Log In</h1>
        {loading && <DLoader />}
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleLogin} className="space-y-4">
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
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
        <div className="mt-4 text-center">
          <a href="/signup" className="text-green-600 hover:underline">
            Don’t have an account? Sign up
          </a>
          <br />
          <a href="/reset-password" className="text-green-600 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>

      {/* OTP Popover */}
      <BasePopover
        title="Two-Factor Authentication"
        buttonLabel=""
        isOpen={otpPopoverOpen}
        onClose={() => setOtpPopoverOpen(false)}
      >
        <div className="text-center">
          <p className="text-gray-800 mb-4">
            Enter the 6-digit code sent to your email.
          </p>
          {loading && <DLoader />}
          {error && <ErrorMessage message={error} />}
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            className="flex justify-center gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            onClick={handleVerifyOtp}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Verify OTP
          </Button>
        </div>
      </BasePopover>
    </div>
  );
}
