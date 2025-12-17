"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-gray-200 text-gray-900 flex flex-col min-h-screen">
      <Navbar />
      {/* Main content area */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
