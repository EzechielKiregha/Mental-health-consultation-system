// src/context/AuthContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { send } from 'process';

interface DecodedToken {
  userId: string;
  email: string;
  role: string[];
  phoneNumber: string;
}

interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  loading: boolean;
  otpRequired: boolean;
  login: (email: string, password: string) => Promise<void>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<void>;
  logout: () => void;
  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    roleIds: number[];
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [otpRequired, setOtpRequired] = useState(false);
  const router = useRouter();
  const [otpReceiver, setOtpReceiver] = useState<{
    sendTo: string;
    code: string;
  }>();

  useEffect(() => {
    const stored = localStorage.getItem('jwtToken');
    if (stored) {
      try {
        const decoded = jwtDecode<DecodedToken>(stored);
        setUser(decoded);
        setToken(stored);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('jwtToken'); // Remove invalid token
        setUser(null);
        setToken(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {

      const res = await api.post('/auth/signin', null, {
        params: { email, password },
      });
      if (res.status === 200) {
        const newToken = res.data.token;
        localStorage.setItem('jwtToken', newToken);
        const decoded = jwtDecode<DecodedToken>(newToken);
        setUser(decoded);
        setToken(newToken);
        setUser(decoded);
        if (decoded !== null && decoded.phoneNumber) {
          const response = await sendOtp("+250" + decoded.phoneNumber.substring(1))
          setOtpReceiver(response); // Send OTP to the user's phone number
          console.log('OTP sent to:', response.sendTo);
          console.log('OTP code:', response.code);
          setOtpRequired(true);
          console.log('Login successful:', user);
        }
        // console.log('Decoded token:', decoded);
        // OTP required, show OTP input
      }
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleIds: number[];
  }) => {
    try {
      const response = await api.post("/auth/signup", data);
      const { token: newToken } = response.data;
      localStorage.setItem("jwtToken", newToken);
      const decoded = jwtDecode<DecodedToken>(newToken);
      if (
        typeof decoded === "object" &&
        decoded !== null &&
        Array.isArray((decoded as any).roles)
      ) {
        setUser(decoded as DecodedToken);
        setToken(newToken);
        setUser(decoded);
      }
      setOtpRequired(true)
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const verifyOtp = async (phoneNumber: string, otp: string) => {
    setLoading(true);
    try {

      const phone = "+250" + phoneNumber.substring(1);

      console.log("Verify otp : number :" + phone + "code :" + otp)
      const res = await api.post('/auth/verify-otp', null, {
        params: { phoneNumber: phone, inputedOTP: otp },
      });
      if (res.status === 200) {
        console.log("message: ", res.data.message);
        setOtpRequired(false); // OTP verified, proceed
      } else {
        throw new Error('OTP verification failed');
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (phoneNumber: string): Promise<{
    sendTo: string;
    code: string;
  }> => {
    setLoading(true);
    try {
      const res = await api.post('/auth/send-otp', null, {
        params: { phoneNumber },
      });
      return {
        sendTo: phoneNumber,
        code: res.data.code || 'No Code Sent',
      };
    } catch (err) {
      console.error('Failed to send OTP:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    setToken(null);
    setOtpRequired(false);
    router.push('/login');
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, otpRequired, login, verifyOtp, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
