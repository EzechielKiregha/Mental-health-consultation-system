"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-green-800 font-bold">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
